import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar แสดงทุกหน้า */}
      <Navbar />

      {/* เนื้อหาเปลี่ยนตาม URL */}
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/products"          element={<Products />} />
        <Route path="/products/:id"      element={<ProductDetail />} />
        <Route path="/cart"              element={<Cart />} />
        <Route path="/checkout"          element={<Checkout />} />
        <Route path="/checkout/success"  element={<CheckoutSuccess />} />
        <Route path="/portfolio"         element={<Portfolio />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/about"             element={<About />} />
      </Routes>

      {/* Footer แสดงทุกหน้า */}
      <Footer />
    </BrowserRouter>
  );
}