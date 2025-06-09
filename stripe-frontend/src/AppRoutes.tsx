import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Checkout } from "./pages/Checkout.tsx";
import { Success } from "./pages/Success.tsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default AppRoutes;
