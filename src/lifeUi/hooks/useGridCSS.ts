import { useEffect } from "react";
import { BREAKPOINTS } from "../components/Grid/Grid.constants";
import type { Breakpoint } from "../components/Grid/Grid.types";

export const useGridCSS = (
  customBreakpoints?: Partial<Record<Breakpoint, number>>
) => {
  useEffect(() => {
    // Create a unique style ID based on breakpoints to avoid conflicts
    const breakpointsKey = customBreakpoints
      ? JSON.stringify(customBreakpoints)
      : "default";
    const styleId = `dynamic-grid-css-${btoa(breakpointsKey).replace(
      /[^a-zA-Z0-9]/g,
      ""
    )}`;

    if (document.getElementById(styleId)) return;

    // Merge custom breakpoints with defaults
    const effectiveBreakpoints = { ...BREAKPOINTS, ...customBreakpoints };
    const breakpointOrder = ["xs", "sm", "md", "lg", "xl"];

    const getFallbackChain = (key: string) => {
      const index = breakpointOrder.indexOf(key);
      const fallbacks = breakpointOrder.slice(0, index).reverse(); // earlier breakpoints
      const fallbackVars = fallbacks.map((bp) => `var(--grid-${bp})`);
      return `var(--grid-${key}, ${fallbackVars.join(", ")}, auto)`;
    };

    const css = `
      .custom-grid-container {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
      }

      .custom-grid-item {
        box-sizing: border-box;
        flex-grow: 0;
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
      }

      ${Object.entries(effectiveBreakpoints)
        .map(([key, value]) => {
          const fallbackValue = getFallbackChain(key);
          return `
            @media (min-width: ${value}px) {
              .custom-grid-item-${key} {
                flex-basis: ${fallbackValue} !important;
                max-width: ${fallbackValue} !important;
              }
            }
          `;
        })
        .join("\n")}
    `;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = css;
    document.head.appendChild(style);

    // Cleanup function to remove the style when component unmounts
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [customBreakpoints]);
};
