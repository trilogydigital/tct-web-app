"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import { ArrowBack, Fullscreen, FullscreenExit } from "@mui/icons-material";
import JWPlayerComponent from "@/components/JWPlayer/JWPlayer";

interface VideoData {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export default function PlayerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get video ID from search params
  const videoId = searchParams?.get("id");

  useEffect(() => {
    // Set fullscreen by default
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // Fullscreen request failed, continue anyway
      });
    }

    // Handle fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);

      // Exit fullscreen when component unmounts
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {
          // Ignore errors when exiting fullscreen
        });
      }
    };
  }, []);

  useEffect(() => {
    if (!videoId) {
      setError("No video ID provided");
      setIsLoading(false);
      return;
    }

    // Mock function to fetch video data
    // Replace this with your actual API call
    const fetchVideoData = async () => {
      try {
        setIsLoading(true);

        // Replace with your actual API endpoint
        // const response = await fetch(`/api/videos/${videoId}`);
        // const data = await response.json();

        // Mock data for demonstration
        const mockData: VideoData = {
          id: videoId,
          title: "Sample Video Title",
          description: "This is a sample video description",
          videoUrl:
            "https://cdn.jwplayer.com/manifests/YnanjE1e.m3u8?exp=2669&sig=25aa8e106b79cf058bec917666e45181&user_id=00uu2vn8g1SgObXw8697",
          thumbnailUrl: "https://example.com/thumbnail.jpg",
        };

        setVideoData(mockData);
        setError(null);
      } catch (err) {
        console.error("Error fetching video data:", err);
        setError("Failed to load video data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  const handleBack = () => {
    router.back();
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  const handlePlayerError = (error: unknown) => {
    console.error("JW Player error:", error);
    setError("Video playback error occurred");
  };

  if (isLoading) {
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
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "white", mb: 2 }} />
          <Typography>Loading video...</Typography>
        </Box>
      </Box>
    );
  }

  if (error || !videoData) {
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
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {error || "Video not found"}
        </Typography>
        <IconButton onClick={handleBack} sx={{ color: "white" }}>
          <ArrowBack />
        </IconButton>
      </Box>
    );
  }

  const playerConfig = {
    file: videoData.videoUrl,
    image: videoData.thumbnailUrl,
    title: videoData.title,
    description: videoData.description,
    autostart: true,
    controls: true,
    stretching: "uniform" as const,
    displaytitle: true,
    displaydescription: false,
    mute: false,
    repeat: false,
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      {/* Controls overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          opacity: 0,
          transition: "opacity 0.3s ease",
          "&:hover": {
            opacity: 1,
          },
        }}
        className="player-controls"
      >
        <IconButton
          onClick={handleBack}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={toggleFullscreen}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Box>
      </Box>

      {/* JW Player */}
      <JWPlayerComponent
        config={playerConfig}
        libraryUrl="https://cdn.jwplayer.com/libraries/M4qoGvUk.js"
        onReady={() => {
          console.log("Player ready");
          setIsLoading(false);
        }}
        onPlay={() => console.log("Video playing")}
        onPause={() => console.log("Video paused")}
        onComplete={() => console.log("Video completed")}
        onError={handlePlayerError}
        style={{ width: "100%", height: "100%" }}
      />

      {/* CSS to show controls on hover */}
      <style jsx>{`
        .player-controls {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .player-controls:hover,
        *:hover > .player-controls {
          opacity: 1;
        }
      `}</style>
    </Box>
  );
}
