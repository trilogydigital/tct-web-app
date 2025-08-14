"use client";
import Card from "@/lifeUi/components/Card/Card";
import { CardEntry } from "@/lifeUi/components/Card/Card.types";
import HeroSection from "@/lifeUi/components/HeroSection/HeroSection";
import VerticalList from "@/lifeUi/components/VerticalList/VerticalList";
import { Box, Typography } from "@mui/material";

interface PlaylistData {
  entry: CardEntry[];
}

interface SeriesLandingProps {
  playlistData: PlaylistData;
}

export default function SeriesLanding({ playlistData }: SeriesLandingProps) {
  console.log("Playlist Data:", playlistData);
  const items = playlistData?.entry ?? [];

  return (
    <>
      <Box mb={6}>
        <HeroSection
          aspectRatio="16:6"
          entry={items[0]}
          styles={{
            showTitle: false,
          }}
          secondaryImage={{
            show: true,
            keyText: "1920",
            width: "200px",
            height: "80px",
          }}
        />
      </Box>
      <Box mx={{ xs: 6, sm: 8, md: 10, xl: 12 }}>
        <Typography variant="h5" color="common.white" gutterBottom>
          Playlist Episodes
        </Typography>

        <VerticalList
          items={items}
          getKey={(item, index) => item.id ?? index}
          renderItem={(item) => (
            <Card
              key={item.id}
              isEnhanced={false}
              isEpisode
              ImageKey="720"
              maxWidth={320}
              entry={item}
            />
          )}
        />
      </Box>
    </>
  );
}
