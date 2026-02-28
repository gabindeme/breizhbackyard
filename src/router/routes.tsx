import { Home } from "@/pages/Home";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const LayoutWrapper = lazy(() =>
  import("./layout-wrapper").then((m) => ({ default: m.LayoutWrapper })),
);

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          element={
            <Suspense>
              <LayoutWrapper />
            </Suspense>
          }
        >
        </Route>
      </Routes>
    </>
  );
};
