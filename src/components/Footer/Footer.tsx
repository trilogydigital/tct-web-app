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
    <Box
      component="footer"
      sx={{ bgcolor: "#030816", color: "#fff", py: 6, mt: 4 }}
    >
      <Container disableGutters>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 6,
            pb: 4,
            textAlign: { xs: "center", md: "left" },
            maxWidth: { xs: "80%", lg: "1200px" },
            mx: "auto",
          }}
        >
          {/* LEFT: Logo + social */}
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography sx={{ mb: 1, fontWeight: 700, fontSize: 13 }}>
              TCT Ministries
            </Typography>

            <Box
              component="img"
              src="/logo-tct.png"
              alt="TCT Logo"
              sx={{
                height: 36,
                my: 3,
                display: "block",
                mx: { xs: "auto", md: 0 },
              }}
            />

            <Typography sx={{ color: "grey.500", mb: 2, fontSize: 13 }}>
              {
                "Follow us on social media for the latest on what's happening on TCT!"
              }
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <IconButton
                component="a"
                href="https://www.instagram.com/tcttv/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
                aria-label="instagram"
              >
                <Box
                  component="img"
                  src="/instagram.png"
                  alt="Instagram"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.facebook.com/tcttv"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
                aria-label="facebook"
              >
                <Box
                  component="img"
                  src="/facebook.png"
                  alt="Facebook"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>

              <IconButton
                component="a"
                href="https://www.youtube.com/c/TCTTVNet"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
                aria-label="youtube"
              >
                <Box
                  component="img"
                  src="/YouTube.png"
                  alt="YouTube"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Box>
          </Box>

          {/* CENTER: two-block columns */}
          <Box
            sx={{
              flex: 1,
              minWidth: 240,
              display: "flex",
              gap: 6,
              fontSize: "0.75rem",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ color: "#e4981a", fontWeight: 700 }}>
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
                <Typography sx={{ color: "#e4981a", fontWeight: 700 }}>
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
              <Typography sx={{ color: "#e4981a", fontWeight: 700 }}>
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
                <Typography sx={{ color: "#e4981a", fontWeight: 700 }}>
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

          {/* RIGHT: Newsletter */}
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, whiteSpace: "nowrap", mb: 2 }}
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

            {/* Platform Logos */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                mt: 3,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                component="img"
                src="/appletv-logo.png"
                alt="Apple TV"
                sx={{ height: 16 }}
              />
              <Box
                component="img"
                src="/firetv-logo.png"
                alt="Fire TV"
                sx={{ height: 16 }}
              />
              <Box
                component="img"
                src="/roku-logo.png"
                alt="Roku"
                sx={{ height: 16 }}
              />
              <Box
                component="img"
                src="/androidtv-logo.png"
                alt="Android TV"
                sx={{ height: 16 }}
              />
            </Box>
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            pt: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 1, sm: 0 },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "center" },
            color: "#eab308",
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
            textAlign: { xs: "center", sm: "left" },
            maxWidth: { md: "80%", lg: "1200px" },
            mx: "auto",
          }}
        >
          <Typography sx={{ fontSize: "inherit", color: "#eab308" }}>
            © 2025 Trilogy Digital Inc. All rights reserved.
          </Typography>

          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <Link
              href="#"
              sx={{ color: "#eab308", mr: 2, fontSize: "inherit" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              sx={{ color: "#eab308", mr: 2, fontSize: "inherit" }}
            >
              Terms of Service
            </Link>
            <Link href="#" sx={{ color: "#eab308", fontSize: "inherit" }}>
              Cookies Settings
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
