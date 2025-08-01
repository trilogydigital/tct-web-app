import React from "react";
import { Box } from "@mui/material";
import type { VerticalListProps } from "./VerticalList.types";

function VerticalList<T>({ items, renderItem, gap = 3 }: VerticalListProps<T>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </Box>
  );
}

export default VerticalList;
