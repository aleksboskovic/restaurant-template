import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from './contexts/CartContext';
import { OrderTypeProvider } from './contexts/OrderTypeContext';
import Home from "./pages/Home";
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import LiveOrders from './pages/LiveOrders';
import NotFound from './pages/NotFound';
import EventDetail from './pages/EventDetail';
import Legal from './pages/Legal';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CookieBanner from './components/CookieBanner';
import FAQ from './pages/FAQ';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  useGoogleAnalytics();
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/reservierung" component={ContactPage} />
        <Route path="/kontakt" component={ContactPage} />
        <Route path="/bestellen" component={OrderPage} />
        <Route path="/live-orders" component={LiveOrders} />
        <Route path="/events/:id" component={EventDetail} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/blog" component={Blog} />
        <Route path="/impressum" component={Legal} />
        <Route path="/datenschutz" component={Legal} />
        <Route path="/agb" component={Legal} />
        <Route path="/faq" component={FAQ} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <CartProvider>
            <OrderTypeProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <CookieBanner />
            </TooltipProvider>
            </OrderTypeProvider>
          </CartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
