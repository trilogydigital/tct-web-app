"use client";

import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function SubscribeToNewsletter() {
  return (
    <Box
      sx={{
        backgroundColor: "#0052cc",
        borderRadius: "8px",
        p: { xs: 3, sm: 5 },
        mt: 6,
        mx: 6,
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Subscribe To Our Newsletter
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
        Stay connected with daily encouragement , latest and new releases
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <TextField
          placeholder="Enter Full Name"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              opacity: 0.8,
            },
          }}
        />
        <TextField
          placeholder="Enter Email"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              opacity: 0.8,
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f5b400",
            color: "black",
            fontWeight: 600,
            px: 6,
            py: 1.5,
            whiteSpace: "nowrap",
            "&:hover": { backgroundColor: "#d49d00" },
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
}
