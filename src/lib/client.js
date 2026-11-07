import clients from "@clients/index";

const slug = process.env.CLIENT || "reduction-automobile";
const client = clients[slug];

if (!client) throw new Error(`Unknown client "${slug}"`);

export default client;

// Path of a file in public/clients/<slug>/.
export const asset = (file) => (file ? `/clients/${client.slug}/${file}` : null);

export const carById = (id) => client.cars.find((c) => c.id === id);
export const carName = (car) => `${car.brand} ${car.model}`;
