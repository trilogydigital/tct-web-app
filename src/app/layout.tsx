import "./globals.css";
import type { Metadata } from "next";
import CacheProvider from "./CacheProvider";
import Header from "@/components/Header/Header";
import { getHeaderData } from "@/lib/services/api.service";

export const metadata: Metadata = {
  title: "TCT",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await getHeaderData();
  console.log("Header data:", headerData);
  return (
    <html lang="en">
      <body>
        <CacheProvider>
          <Header data={headerData.data} />
          <main style={{ paddingTop: "64px" }}>{children}</main>
        </CacheProvider>
      </body>
    </html>
  );
}
