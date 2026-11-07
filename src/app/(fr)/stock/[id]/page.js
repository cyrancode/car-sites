import Shell from "@/components/Shell";
import CarPage, { carWaLink } from "@/components/CarPage";
import client, { carById } from "@/lib/client";
import { t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => client.cars.map((c) => ({ id: c.id }));

export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata("fr", "car", carById(id));
}

export default async function Page({ params }) {
  const { id } = await params;
  const car = carById(id);
  return (
    <Shell lang="fr" page="car" pageId={id} barHref={carWaLink(car, "fr")} barLabel={t("fr").interested}>
      <CarPage lang="fr" car={car} />
    </Shell>
  );
}
