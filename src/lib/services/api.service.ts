import type {
  CardProps,
  SecondaryImage,
  CardEntry,
} from "@/lifeUi/components/Card/Card.types";
import type { CardSection } from "@/pages/ShelfForHome";

// Define types for preset and hpcEntry based on usage and API structure
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

export interface HPCEntry {
  preset_name: string;
  feed_url: string;
  title?: string;
  index?: number;
}

async function fetchHPCFeedURL(): Promise<string> {
  const res = await fetch("https://strapi-dev.trilogyapps.com/api/home-page", {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  if (!res.ok) throw new Error("Failed to fetch HPC feed URL");
  const json = await res.json();
  return json.data.dataFeed;
}

export async function fetchHPC(feedUrl: string) {
  const res = await fetch(feedUrl, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch hpc data");
  return res.json();
}

export async function fetchPresetData() {
  const res = await fetch(
    "https://strapi-dev.trilogyapps.com/api/card-settings?populate=all",
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch preset data");
  return res.json();
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
      title: data.title ?? "", // get feed title
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
  const attributes = preset ?? {};

  const secondaryImage: SecondaryImage | undefined =
    attributes.useSecondaryAsBackground ? attributes.secondaryImage : undefined;

  return {
    entry,
    isEnhanced: attributes.isEnhanced ?? false,
    isEpisode: attributes.isEpisode ?? false,
    showTitle: attributes.showTitle ?? false,
    ImageKey: attributes.imageKey ?? undefined,
    useSecondaryAsBackground: attributes.useSecondaryAsBackground ?? false,
    tags: attributes.badges ?? [],
    secondaryImage,
    aspectRatio: attributes.aspectRatio ?? "16:9",
    positionOffsets: attributes.positionOffsets ?? undefined,
    styles: {
      hoverScale: attributes.styles?.hoverScale ?? undefined,
    },
  };
}

export async function getCardProps(): Promise<CardSection[]> {
  const [presetData, hpcFeedUrl] = await Promise.all([
    fetchPresetData(),
    fetchHPCFeedURL(),
  ]);

  if (!hpcFeedUrl) {
    throw new Error("HPC feed URL is missing");
  }

  const hpc = await fetchHPC(hpcFeedUrl);

  const cardSections = await Promise.all(
    hpc.entry.map(async (hpcEntry: HPCEntry) => {
      const matchingPreset = presetData.data.find(
        (preset: Preset) => preset.presetName === hpcEntry.preset_name
      );

      if (!matchingPreset) {
        console.warn("No matching preset for:", hpcEntry.preset_name);
        return null;
      }

      const { title: feedTitle, entries: feedEntries } = await fetchFeedEntries(
        hpcEntry.feed_url,
        hpcEntry.preset_name
      );

      const cards = feedEntries.map((entry: CardEntry) =>
        mapFeedEntryToCardProps(entry, matchingPreset)
      );
      return {
        presetName: hpcEntry.preset_name,
        title: feedTitle || hpcEntry.title || hpcEntry.preset_name,
        index: hpcEntry.index,
        cards,
      };
    })
  );

  return cardSections.filter(Boolean);
}
