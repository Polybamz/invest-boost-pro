import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Investment from "./pages/Investment";
import Shop from "./pages/Shop";
import Referring from "./pages/Referring";
import BuyCrypto from "./pages/BuyCrypto";
import Feedback from "./pages/Feedback";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import Employment from "./pages/Employment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/referring" element={<Referring />} />
          <Route path="/buy-crypto" element={<BuyCrypto />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/support" element={<Support />} />
          <Route path="/employment" element={<Employment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
