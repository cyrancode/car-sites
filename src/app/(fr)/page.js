import Shell from "@/components/Shell";
import Home from "@/components/Home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("fr", "home");

export default function Page() {
  return (
    <Shell lang="fr" page="home">
      <Home lang="fr" />
    </Shell>
  );
}
