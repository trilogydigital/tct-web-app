"use client";

import React from "react";
import { Skeleton, Box } from "@mui/material";
import Grid from "@/lifeUi/components/Grid/Grid";

export default function SkeletonGrid() {
  const skeletonCount = 15;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <Grid key={index} item xs={2} sm={3} md={4} lg={5} xl={5}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%" /* 16:9 ratio */,
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: 2,
                bgcolor: "grey.800",
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
