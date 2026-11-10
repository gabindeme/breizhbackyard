import { pageMeta } from "@/lib/meta";
import { sportsEventSchema } from "@/lib/seoSchemas";
export { Inscriptions as default } from "@/pages/Inscriptions";

export const meta = () => pageMeta({ page: "inscriptions", path: "/inscriptions", jsonLd: [sportsEventSchema] });
