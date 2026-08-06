import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UzNet Graveyard — O'zbekiston internet olami qabristoni",
  description:
    "2000–2020 yillarda faoliyat yuritgan, keyinchalik yopilgan yoki sotib olingan afsonaviy UzNet loyihalarining interaktiv qabristoni.",
  verification: {
    google: "0ZD9S1o2maf53dKdwbYM9EjyBaIzo-aU7GDexaweITk",
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
