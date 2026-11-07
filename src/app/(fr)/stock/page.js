import Shell from "@/components/Shell";
import StockPage from "@/components/StockPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("fr", "stock");

export default function Page() {
  return (
    <Shell lang="fr" page="stock">
      <StockPage lang="fr" />
    </Shell>
  );
}
