import { Footer } from "@/components/customs/footer";
import { Navbar } from "@/components/customs/navbar";
import { Outlet } from "react-router-dom";

export const LayoutWrapper = () => {
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
