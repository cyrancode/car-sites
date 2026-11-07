import Shell from "@/components/Shell";
import StockPage from "@/components/StockPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("en", "stock");

export default function Page() {
  return (
    <Shell lang="en" page="stock">
      <StockPage lang="en" />
    </Shell>
  );
}
