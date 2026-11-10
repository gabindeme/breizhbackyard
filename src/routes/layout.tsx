import { Outlet } from "react-router";
import { Footer } from "@/components/customs/footer";
import { Navbar } from "@/components/customs/navbar";

export default function PageLayout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
