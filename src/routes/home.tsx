import { pageMeta } from "@/lib/meta";
import { organizationSchema, sportsEventSchema } from "@/lib/seoSchemas";
export { Home as default } from "@/pages/Home";

export const meta = () => pageMeta({ page: "home", path: "/", jsonLd: [sportsEventSchema, organizationSchema] });
