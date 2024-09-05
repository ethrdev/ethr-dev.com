import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { BeamAnalytics } from "./components/analytics"; // Beam Analytics
import { Analytics } from "@vercel/analytics/react"; // Vercel Web Analytics
import { SpeedInsights } from "@vercel/speed-insights/next"; // Vercel Speed Insights

// Define metadata for the website
export const metadata: Metadata = {
  // Set the default title and template for the page titles
  title: {
    default: "ethr-dev.com",
    template: "%s | ethr-dev.com",
  },

  // Set the description for the website
  description: "Co-founder of Poker Scientist and founder of ethr development",
  // Define Open Graph metadata for social sharing
  openGraph: {
    title: "ethr-dev.com",
    description:
      "Co-founder of Poker Scientist and founder of ethr development",
    url: "https://ethr-dev.com",
    siteName: "ethr-dev.com",
    images: [
      {
        url: "https://ethr-dev.com/og.png", // URL to the Open Graph image
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  // Define robots meta tags for search engine indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Define Twitter card metadata for social sharing
  twitter: {
    title: "Ethr",
    card: "summary_large_image",
  },
  // Define the icon for the website
  icons: {
    shortcut: "/favicon.png",
  },
};

// Load the Inter font with specific settings
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Load the local CalSans font with specific settings
const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

// Define the root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head></head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <BeamAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
