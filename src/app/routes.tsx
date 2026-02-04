import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HowToBuyPage } from "./pages/HowToBuyPage";
import { ShippingPage } from "./pages/ShippingPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "produtos", Component: ProductsPage },
      { path: "produto/:slug", Component: ProductDetailPage },
      { path: "sobre", Component: AboutPage },
      { path: "contato", Component: ContactPage },
      { path: "como-comprar", Component: HowToBuyPage },
      { path: "entrega", Component: ShippingPage },
      { path: "termos", Component: TermsPage },
      { path: "privacidade", Component: PrivacyPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
