import "./globals.css";
import type { Metadata } from "next";
import CacheProvider from "./CacheProvider";
import Header from "@/components/Header/Header";
import { getHeaderData } from "@/lib/services/api.service";
import Footer from "@/components/Footer/Footer";
import { Inter } from "next/font/google";
import SubscribeToNewsletter from "@/components/SubscribeToNewsletter/SubscribeToNewsletter";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
    <html lang="en" className={inter.className}>
      <body>
        <CacheProvider>
          <Header data={headerData.data} />
          <main>{children}</main>
          <SubscribeToNewsletter />
          <Footer />
        </CacheProvider>
      </body>
    </html>
  );
}
