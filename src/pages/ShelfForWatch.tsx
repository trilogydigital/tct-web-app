"use client";

import Card from "@/lifeUi/components/Card/Card";
import { CardEntry } from "@/lifeUi/components/Card/Card.types";
import Grid from "@/lifeUi/components/Grid/Grid";
import VerticalList from "@/lifeUi/components/VerticalList/VerticalList";

interface ShelfForWatchProps {
  items: CardEntry[];
}

export default function ShelfForWatch({ items = [] }: ShelfForWatchProps) {
  return (
    <div
      style={{
        padding: "50px",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "80px" }}>
        <h1 style={{ color: "#fff" }}>Featured Grid</h1>
        <Grid container>
          {items?.map((item, index) => (
            <Grid key={index} item>
              <Card entry={item} ImageKey="720" />
            </Grid>
          ))}
        </Grid>
      </div>
      <h1 style={{ color: "#fff" }}>Featured List</h1>
      <div>
        <VerticalList
          items={items}
          renderItem={(item, index) => (
            <Card
              key={index}
              isEnhanced={false}
              isEpisode
              ImageKey="720"
              maxWidth={320}
              entry={item}
            />
          )}
        />
      </div>
    </div>
  );
}
