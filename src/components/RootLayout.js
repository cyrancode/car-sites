import { Barlow, Barlow_Condensed } from "next/font/google";
import client from "@/lib/client";
import "@/app/globals.css";

// Font pairs a client can pick with theme.fonts.
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-title", preload: false });
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", preload: false });

const FONTS = {
  sport: [barlowCondensed, barlow],
};

// Palettes from the car design. A client can override any colour with theme.colors.
const PALETTES = {
  graphite: {
    ink: "#15171A", bg: "#F6F5F2", surface: "#FFFFFF", line: "#E5E4DF", "line-strong": "#D9D8D3", muted: "#565C64",
    accent: "#C8470F", "accent-hover": "#A83A0B", "on-dark": "#F0803C",
    dark: "#131518", "dark-muted": "#C4C8CE", "dark-line": "#565C64",
    wa: "#0E7C42", "wa-hover": "#0A6134",
  },
};

// Shared by the FR and EN root layouts; only <html lang> differs.
export default function RootLayout({ lang, children }) {
  const { theme } = client;
  const [title, body] = FONTS[theme.fonts] ?? FONTS.sport;
  const colours = { ...(PALETTES[theme.palette] ?? PALETTES.graphite), ...theme.colors };
  const vars = Object.fromEntries(Object.entries(colours).map(([k, v]) => [`--${k}`, v]));
  return (
    <html lang={lang} className={`${title.variable} ${body.variable}`}>
      <body className="font-sans" style={vars}>
        {children}
      </body>
    </html>
  );
}
