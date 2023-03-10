import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GeneralLayout from "./layout/GeneralLayout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Footer from "./components/Footer";
import BuyPage from './pages/BuyPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="general-container">
          <Routes>
            <Route path="/" element={<GeneralLayout />}>
              <Route path="" element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="buys" element={<BuyPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
