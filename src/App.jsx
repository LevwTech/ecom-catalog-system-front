import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductScreen from "./pages/ProductScreen";
import CreateProducts from "./pages/CreateProduct";
import Search from "./pages/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductScreen />} />
      <Route path="/create" element={<CreateProducts />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
