import { Box, Skeleton } from "@mui/material";

export default function HeroSliderSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#121212",
      }}
    >
      {/* Big hero skeleton */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={500}
        sx={{
          bgcolor: "grey.800",
        }}
      />
      <Box sx={{ p: 2 }}>
        <Skeleton
          variant="text"
          width="30%"
          height={40}
          sx={{
            bgcolor: "grey.800",
          }}
        />
        <Skeleton
          variant="text"
          width="20%"
          height={30}
          sx={{
            bgcolor: "grey.800",
          }}
        />
      </Box>
    </Box>
  );
}
