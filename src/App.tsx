import { Router } from "./router/routes";
import { ScrollToTop } from "./router/scroll-to-top";

export const App = () => {
  return (
    <>
      <ScrollToTop />
      <Router />
    </>
  );
};
