export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {children}
    </div>
  );
}
