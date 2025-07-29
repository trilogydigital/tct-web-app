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
};

interface ShelfForHomeProps {
  sections: CardSection[];
}

export default function ShelfForHome({ sections }: ShelfForHomeProps) {
  return (
    <Box sx={{ minHeight: "100vh", pb: 4 }}>
      {sections?.map((section) => (
        <Box key={`${section.presetName}-${section.index}`} mx={2} mb={4}>
          {section.presetName === "FeaturedHomeRail" ? (
            <HeroSlider
              aspectRatio="16:6"
              autoPlay
              interval={5000}
              imageKeySelect="imgFeaturedCarousel16x6"
              entry={section.cards.map((card) => card.entry)}
              styles={{
                titleColor: "#fff",
              }}
            />
          ) : (
            <HorizontalSlider
              items={section.cards}
              renderItem={(item, index) => <Card key={index} {...item} />}
              visibleSlides={5}
              spacing={16}
              slideBy={5}
              title={section.title}
              styles={{
                scrollContainerStyle: {
                  paddingX: 0,
                  scrollbarHidden: true,
                },
                titleStyle: {
                  color: "#fff",
                },
                containerStyle: {
                  backgroundColor: "transparent",
                },
              }}
              hideArrowsBreakpoint={{ xs: true }}
              presetName={section.presetName}
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
