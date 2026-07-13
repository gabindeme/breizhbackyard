import { Footer } from "@/components/customs/footer";
import { Navbar } from "@/components/customs/navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const LayoutWrapper = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
