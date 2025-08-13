import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import PlayerPage from "@/components/Player/Player";

function PlayerPageLoader() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PlayerPageLoader />}>
      <PlayerPage />
    </Suspense>
  );
}
