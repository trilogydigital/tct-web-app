import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
}
