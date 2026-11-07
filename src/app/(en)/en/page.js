import Shell from "@/components/Shell";
import Home from "@/components/Home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("en", "home");

export default function Page() {
  return (
    <Shell lang="en" page="home">
      <Home lang="en" />
    </Shell>
  );
}
