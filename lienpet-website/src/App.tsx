import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from '@/store/useStore';
import { I18nProvider } from '@/i18n/I18nContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import FeedbackPage from '@/pages/FeedbackPage';
import ContactPage from '@/pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
      <StoreProvider>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Header />
          <ToastContainer />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </StoreProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}

export default App;