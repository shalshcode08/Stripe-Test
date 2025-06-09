import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Checkout } from "./pages/Checkout.tsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default AppRoutes;
