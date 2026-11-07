import RootLayout from "@/components/RootLayout";
import client from "@/lib/client";

export const metadata = { metadataBase: new URL(client.domain) };

export default function Layout({ children }) {
  return <RootLayout lang="en">{children}</RootLayout>;
}
