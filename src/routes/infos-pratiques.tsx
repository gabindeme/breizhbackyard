import { pageMeta } from "@/lib/meta";
import { sportsEventSchema } from "@/lib/seoSchemas";
export { InfosPratiques as default } from "@/pages/InfosPratiques";

export const meta = () => pageMeta({ page: "infos", path: "/infos-pratiques", jsonLd: [sportsEventSchema] });
