"use client";

import { useEffect, useRef } from "react";

// JW Player types

declare global {
  interface Window {
    jwplayer: (container: HTMLElement) => JWPlayerApi;
  }
}

interface JWPlayerApi {
  setup: (config: JWPlayerConfig) => void;
  on: (event: string, callback: (error?: unknown) => void) => void;
  remove: () => void;
  // Add more methods as needed from JW Player API
}

interface JWPlayerConfig {
  file?: string;
  playlist?: string;
  autostart?: boolean;
  controls?: boolean;
  mute?: boolean;
  repeat?: boolean;
  displaytitle?: boolean;
  displaydescription?: boolean;
  stretching?: "uniform" | "exactfit" | "fill" | "none";
  aspectratio?: string;
  width?: string | number;
  height?: string | number;
  image?: string;
  title?: string;
  description?: string;
  captions?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    backgroundColor?: string;
  };
  advertising?: {
    client?: string;
    tag?: string;
  };
}

interface JWPlayerComponentProps {
  config: JWPlayerConfig;
  libraryUrl?: string;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
  onError?: (error: unknown) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function JWPlayerComponent({
  config,
  libraryUrl = "https://cdn.jwplayer.com/libraries/D0vJErtt.js",
  onReady,
  onPlay,
  onPause,
  onComplete,
  onError,
  className,
  style = { width: "100%", height: "100vh" },
}: JWPlayerComponentProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<JWPlayerApi | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializePlayer = () => {
      if (!playerRef.current || !window.jwplayer || !isMounted) return;

      try {
        // Create player instance
        const player = window.jwplayer(playerRef.current);

        // Setup player with config
        player.setup({
          ...config,
          width: "100%",
          height: "100%",
        });

        // Event listeners
        player.on("ready", () => {
          if (isMounted) {
            console.log("JW Player is ready");
            onReady?.();
          }
        });

        player.on("play", () => {
          if (isMounted) {
            console.log("Video started playing");
            onPlay?.();
          }
        });

        player.on("pause", () => {
          if (isMounted) {
            console.log("Video paused");
            onPause?.();
          }
        });

        player.on("complete", () => {
          if (isMounted) {
            console.log("Video completed");
            onComplete?.();
          }
        });

        player.on("error", (error: unknown) => {
          if (isMounted) {
            console.error("JW Player error:", error);
            onError?.(error);
          }
        });

        playerInstanceRef.current = player;
      } catch (error) {
        console.error("Error initializing JW Player:", error);
        onError?.(error);
      }
    };

    const loadJWPlayer = () => {
      // Check if JW Player is already loaded (script injected and jwplayer is a function)
      if (typeof window.jwplayer === "function" && window.jwplayer.length > 0) {
        initializePlayer();
        return;
      }

      // Load JW Player script
      const script = document.createElement("script");
      script.src = libraryUrl;
      script.async = true;

      script.onload = () => {
        if (isMounted) {
          initializePlayer();
        }
      };

      script.onerror = () => {
        console.error("Failed to load JW Player library");
        onError?.(new Error("Failed to load JW Player library"));
      };

      document.head.appendChild(script);

      // Cleanup function to remove script if component unmounts during loading
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    const cleanup = loadJWPlayer();

    return () => {
      isMounted = false;

      // Remove player instance
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.remove();
          playerInstanceRef.current = null;
        } catch (error) {
          console.error("Error removing JW Player:", error);
        }
      }

      // Run script cleanup if it exists
      cleanup?.();
    };
  }, [config, libraryUrl, onReady, onPlay, onPause, onComplete, onError]);

  return (
    <div className={className} style={style}>
      <div
        ref={playerRef}
        id={`jwplayer-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
