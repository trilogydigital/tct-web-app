// components/Footer.tsx
"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const textfieldSx = {
  "& .MuiInputBase-input": { color: "rgba(255,255,255,0.9)" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.14)" },
  },
  "& input::placeholder": { color: "rgba(255,255,255,0.45)" },
} as const;

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "#050a18", color: "#fff", py: 6 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 6,
            pb: 4,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* LEFT: Logo + social */}
          <Box sx={{ flex: "0 0 300px" }}>
            <Typography sx={{ mb: 1, fontWeight: 700, fontSize: 13 }}>
              TCT Ministries
            </Typography>

            <Box
              component="img"
              src="/tct-logo.png"
              alt="TCT Logo"
              sx={{ height: 36, mb: 2, display: "block" }}
            />

            <Typography sx={{ color: "grey.500", mb: 2, fontSize: 13 }}>
              Follow us on social media for the latest on what's happening on
              TCT!
            </Typography>

            <Box>
              <IconButton color="inherit" size="small" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" size="small" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" size="small" aria-label="youtube">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>

          {/* CENTER: two-block columns (Watch/Resources & Quick Links/Legal) */}
          <Box
            sx={{
              flex: "0 0 300px",
              display: "flex",
              gap: 6,
              fontSize: "0.75rem",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ color: "#facc15", fontWeight: 700 }}>
                Watch
              </Typography>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Live Stream
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                On Demand
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Schedule
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Shows
              </Link>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: "#facc15", fontWeight: 700 }}>
                  Resources
                </Typography>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "grey.400", display: "block" }}
                >
                  Place Holder
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "grey.400", display: "block" }}
                >
                  Place Holder
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ color: "#facc15", fontWeight: 700 }}>
                Quick Links
              </Typography>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Contact us
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Give
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Prayer
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ color: "grey.400", display: "block" }}
              >
                Get Involved
              </Link>

              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: "#facc15", fontWeight: 700 }}>
                  Legal
                </Typography>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "grey.400", display: "block" }}
                >
                  Place Holder
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "grey.400", display: "block" }}
                >
                  Place Holder
                </Link>
              </Box>
            </Box>
          </Box>

          {/* RIGHT: Newsletter (will NOT wrap heading) */}
          <Box sx={{ flex: "0 0 300px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, whiteSpace: "nowrap", mb: 2 }} // <- prevent wrapping
            >
              Subscribe To Our Newsletter
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                placeholder="First name"
                size="small"
                fullWidth
                sx={textfieldSx}
              />
              <TextField
                placeholder="Last name"
                size="small"
                fullWidth
                sx={textfieldSx}
              />
            </Box>

            <TextField
              placeholder="Enter your email"
              size="small"
              fullWidth
              sx={textfieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" edge="end">
                      <NotificationsNoneIcon sx={{ color: "grey.400" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: "#facc15",
                color: "black",
                fontWeight: 700,
                "&:hover": { bgcolor: "#eab308" },
                textTransform: "none",
                px: 2,
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "grey.500",
          }}
        >
          <Typography variant="caption">
            © 2025 Trilogy Digital Inc. All rights reserved.
          </Typography>

          <Box>
            <Link href="#" sx={{ color: "grey.400", mr: 2 }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: "grey.400", mr: 2 }}>
              Terms of Service
            </Link>
            <Link href="#" sx={{ color: "grey.400" }}>
              Cookies Settings
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
