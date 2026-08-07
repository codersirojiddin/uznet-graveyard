import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.SITE_URL || "https://uznetmuzeyi.uz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "UzNet Muzeyi — O'zbekiston internet olami arxivi",
    template: "%s",
  },
  description:
    "2000–2020 yillarda faoliyat yuritgan, keyinchalik yopilgan yoki sotib olingan afsonaviy UzNet loyihalarining raqamli muzeyi.",
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    siteName: "UzNet Muzeyi",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
