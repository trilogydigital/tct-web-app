// import type { CardProps } from "../components/Card/Card.types";

// export const generateMockCardsByStyle = (
//   style: "default" | "enhanced" | "top-ten" | "episode" | "custom",
//   count = 8
// ): CardProps[] => {
//   const imageUrl = "https://cdn.jwplayer.com/v2/media/ZpT3jloU/poster.jpg"; // Example image URL

//   return Array.from({ length: count }, (_, i) => {
//     const base: CardProps = {
//       entry: {
//         title: `${style} Card ${i + 1}`,
//         link: { href: "#", rel: "self" },
//         media_group: [
//           {
//             type: "image",
//             media_item: [{ key: "image_base", src: imageUrl }],
//           },
//         ],
//       },
//       aspectRatio: "16:9",
//     };

//     switch (style) {
//       case "enhanced":
//         return {
//           ...base,
//           enhanced: true,
//           tags: [{ label: "Tag 1" }, { label: "Tag 2" }],
//           icons: [{ name: "PlayArrow" }],
//         };
//       case "top-ten":
//         return {
//           ...base,
//           isTopTenCard: true,
//           secondaryImage: { src: "/number-1.png" },
//         };
//       case "episode":
//         return {
//           ...base,
//           episode: { label: "S1:E1", description: "Pilot episode" },
//         };
//       case "custom":
//         return {
//           ...base,
//           borderRadius: {
//             topLeft: "16px",
//             topRight: "0",
//             bottomLeft: "0",
//             bottomRight: "16px",
//           },
//           hoverEffect: true,
//         };
//       default:
//         return base;
//     }
//   });
// };
