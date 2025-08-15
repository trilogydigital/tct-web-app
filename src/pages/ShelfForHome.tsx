"use client";
import { useEffect, useState } from "react";
import Card from "@/lifeUi/components/Card/Card";
import { CardProps } from "@/lifeUi/components/Card/Card.types";
import HorizontalSlider from "@/lifeUi/components/HorizontalSlider/HorizontalSlider";
import { Box } from "@mui/material";
import HeroSlider from "@/lifeUi/components/HeroSlider/HeroSlider";
import HeroSliderSkeleton from "../components/Skeletons/HeroSliderSkeleton";
import { useRouter } from "next/navigation";

export type CardSection = {
  presetName: string;
  index: number;
  title?: string;
  cards: CardProps[];
  tilesToShow?: number;
  showTitle?: boolean;
};

interface ShelfForHomeProps {
  sections: CardSection[];
}

export default function ShelfForHome({ sections }: ShelfForHomeProps) {
  const [heroVisible, setHeroVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroSlideClick = (slideIndex: number, section: CardSection) => {
    const clickedCard = section.cards[slideIndex];
    if (!clickedCard) return;

    const videoId = clickedCard.entry?.id || "default";

    // router.push(`/player`);
    router.push(`/m?id=${encodeURIComponent(videoId)}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      {sections?.map((section) => (
        <Box key={`${section.presetName}-${section.index}`} mb={4}>
          {section.presetName === "FeaturedHomeRail" ? (
            heroVisible ? (
              <HeroSlider
                entry={section.cards.map((card) => card.entry)}
                onSlideClick={(slideIndex) =>
                  handleHeroSlideClick(slideIndex, section)
                }
              />
            ) : (
              <HeroSliderSkeleton />
            )
          ) : (
            <HorizontalSlider
              items={section.cards}
              getItemKey={(item, index) => item.entry.id ?? index}
              renderItem={(item) => <Card {...item} />}
              visibleSlides={section.tilesToShow}
              slideBy={section.tilesToShow}
              title={section.showTitle !== false ? section.title : undefined}
              presetName={section.presetName}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
