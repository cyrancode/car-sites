import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import client from "./client";
import { tr } from "./i18n";

export const ogSize = { width: 1200, height: 630 };

// Share card for WhatsApp / Facebook, generated at build time: the client's name beside a real photo.
export const renderOgImage = async (lang) => {
  const file = path.join(process.cwd(), "public", "clients", client.slug, client.ogImage ?? client.hero);
  const jpeg = await sharp(readFileSync(file)).resize(640, 630, { fit: "cover" }).jpeg({ quality: 80 }).toBuffer();
  const photo = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  const [first, second] = client.wordmark;
  const highlight = client.theme.colors?.["on-dark"] ?? "#F0803C";
  const background = client.theme.colors?.dark ?? "#131518";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background, color: "#FFFFFF" }}>
        <div style={{ width: 560, display: "flex", flexDirection: "column", justifyContent: "center", padding: 56 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.02 }}>{first}</div>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.02, color: highlight }}>{second}</div>
          <div style={{ fontSize: 30, marginTop: 28, opacity: 0.88 }}>{tr(client.tagline, lang)}</div>
          <div style={{ fontSize: 26, marginTop: 24, opacity: 0.7 }}>{`${client.address.district}, ${client.address.city}`}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={640} height={630} alt="" />
      </div>
    ),
    ogSize,
  );
};
