import type {
  CardProps,
  SecondaryImage,
  CardEntry,
} from "@/lifeUi/components/Card/Card.types";
import type { CardSection } from "@/pages/ShelfForHome";

// ListSetting type which contains layout + styling
export interface Preset {
  presetName: string;
  isEnhanced?: boolean;
  isEpisode?: boolean;
  showTitle?: boolean;
  imageKey?: string;
  useSecondaryAsBackground?: boolean;
  badges?: CardProps["tags"];
  secondaryImage?: SecondaryImage;
  aspectRatio?: CardProps["aspectRatio"];
  positionOffsets?: CardProps["positionOffsets"];
  styles?: CardProps["styles"];
}

export interface ListSetting {
  label: string;
  titleKey?: string;
  tilesToShow?: number;
  showTitle?: boolean;
  cardStyle: Preset;
}

export interface HPCEntry {
  preset_name: string;
  feed_url: string;
  title?: string;
  index?: number;
}

async function fetchHPCFeedURL(): Promise<string> {
  const res = await fetch("https://strapi-dev.trilogyapps.com/api/home-page", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch HPC feed URL");
  const json = await res.json();
  return json.data.dataFeed;
}

export async function fetchHPC(feedUrl: string) {
  const res = await fetch(feedUrl, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch HPC data");
  return res.json();
}

export async function fetchListSettings(): Promise<ListSetting[]> {
  const res = await fetch(
    "https://strapi-dev.trilogyapps.com/api/list-settings?populate=all",
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch list settings");
  const json = await res.json();
  return json.data;
}

async function fetchFeedEntries(
  feedUrl: string,
  presetName: string
): Promise<{ title: string; entries: CardEntry[] }> {
  try {
    const res = await fetch(feedUrl, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const data = await res.json();
    return {
      title: data.title ?? "",
      entries: data.entry ?? [],
    };
  } catch (err) {
    console.warn(`Skipping '${presetName}' due to feed error:`, err);
    return {
      title: "",
      entries: [],
    };
  }
}

export async function getHeaderData() {
  const res = await fetch(
    "https://strapi-dev.trilogyapps.com/api/header?populate=all",
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch header data");
  return res.json();
}

function mapFeedEntryToCardProps(entry: CardEntry, preset: Preset): CardProps {
  const secondaryImage: SecondaryImage | undefined =
    preset.useSecondaryAsBackground ? preset.secondaryImage : undefined;

  return {
    entry,
    isEnhanced: preset.isEnhanced ?? false,
    isEpisode: preset.isEpisode ?? false,
    showTitle: preset.showTitle ?? false,
    ImageKey: preset.imageKey ?? undefined,
    useSecondaryAsBackground: preset.useSecondaryAsBackground ?? false,
    tags: preset.badges ?? [],
    secondaryImage,
    aspectRatio: preset.aspectRatio ?? "16:9",
    positionOffsets: preset.positionOffsets ?? undefined,
    styles: {
      hoverScale: preset.styles?.hoverScale ?? undefined,
      border: preset.styles?.border,
      hoverBorder: preset.styles?.hoverBorder,
    },
  };
}

export async function getCardProps(): Promise<CardSection[]> {
  const [listSettings, hpcFeedUrl] = await Promise.all([
    fetchListSettings(),
    fetchHPCFeedURL(),
  ]);

  if (!hpcFeedUrl) {
    throw new Error("HPC feed URL is missing");
  }

  const hpc = await fetchHPC(hpcFeedUrl);

  const cardSections = await Promise.all(
    hpc?.entry?.map(async (hpcEntry: HPCEntry) => {
      const matchedSetting = listSettings.find(
        (setting: ListSetting) =>
          setting.label === hpcEntry.preset_name ||
          setting.cardStyle?.presetName === hpcEntry.preset_name
      );

      if (!matchedSetting?.cardStyle) {
        console.warn("No matching setting for:", hpcEntry.preset_name);
        return null;
      }

      const { title: feedTitle, entries: feedEntries } = await fetchFeedEntries(
        hpcEntry.feed_url,
        hpcEntry.preset_name
      );

      const cards = feedEntries?.map((entry: CardEntry) =>
        mapFeedEntryToCardProps(entry, matchedSetting.cardStyle)
      );

      return {
        presetName: hpcEntry.preset_name,
        title: feedTitle,
        index: hpcEntry.index ?? 0,
        cards,
        tilesToShow: matchedSetting.tilesToShow,
        showTitle: matchedSetting.showTitle,
      };
    })
  );

  return cardSections.filter(Boolean);
}
