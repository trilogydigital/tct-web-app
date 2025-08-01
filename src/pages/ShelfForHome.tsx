"use client";
import Card from "@/lifeUi/components/Card/Card";
import { CardProps } from "@/lifeUi/components/Card/Card.types";
import HorizontalSlider from "@/lifeUi/components/HorizontalSlider/HorizontalSlider";
import { Box } from "@mui/material";
import HeroSlider from "@/lifeUi/components/HeroSlider/HeroSlider";
// import { Card, CardProps } from "@trilogydigital/tdp-life-ui";

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
  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      {sections?.map((section) => (
        <Box key={`${section.presetName}-${section.index}`} mb={4}>
          {section.presetName === "FeaturedHomeRail" ? (
            <HeroSlider entry={section.cards.map((card) => card.entry)} />
          ) : (
            <HorizontalSlider
              items={section.cards}
              getItemKey={(item, index) => item.entry.id ?? index}
              renderItem={(item, index) => <Card key={index} {...item} />}
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
