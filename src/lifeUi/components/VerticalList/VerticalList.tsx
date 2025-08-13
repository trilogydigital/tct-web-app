import React from "react";
import { Box } from "@mui/material";
import type { VerticalListProps } from "./VerticalList.types";

function VerticalList<T>({
  items,
  renderItem,
  gap = 3,
  getKey,
}: VerticalListProps<T>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap }}>
      {items.map((item, index) => (
        <React.Fragment key={getKey(item, index)}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </Box>
  );
}

export default VerticalList;
