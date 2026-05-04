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
import TestPage from '@/pages/TestPage';
import { AdminLayout } from '@/admin/components/AdminLayout';
import { DashboardPage } from '@/admin/pages/DashboardPage';
import { ProductsPage as AdminProductsPage } from '@/admin/pages/ProductsPage';
import { MessagesPage as AdminMessagesPage } from '@/admin/pages/MessagesPage';
import { FavoritesPage as AdminFavoritesPage } from '@/admin/pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <StoreProvider>
          <Routes>
            {/* Frontend Routes */}
            <Route path="/" element={
              <div style={{ minHeight: '100vh', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <ToastContainer />
                <div style={{ flex: 1 }}>
                  <HomePage />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/products" element={
              <div style={{ minHeight: '100vh', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <ToastContainer />
                <div style={{ flex: 1 }}>
                  <ProductsPage />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/product/:id" element={
              <div style={{ minHeight: '100vh', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <ToastContainer />
                <div style={{ flex: 1 }}>
                  <ProductDetailPage />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/favorites" element={
              <div style={{ minHeight: '100vh', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <ToastContainer />
                <div style={{ flex: 1 }}>
                  <FavoritesPage />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/feedback" element={
              <div style={{ minHeight: '100vh', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <ToastContainer />
                <div style={{ flex: 1 }}>
                  <FeedbackPage />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div style={{ minHeight: '100vh', backgroundColor: '#faf8f5', display: 'flex', flexDirection: 'column' }}>
                <Header />
                <ToastContainer />
                <div style={{ flex: 1 }}>
                  <ContactPage />
                </div>
                <Footer />
              </div>
            } />
            <Route path="/test" element={
              <TestPage />
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <AdminLayout currentPage="dashboard">
                <DashboardPage />
              </AdminLayout>
            } />
            <Route path="/admin/products" element={
              <AdminLayout currentPage="products">
                <AdminProductsPage />
              </AdminLayout>
            } />
            <Route path="/admin/messages" element={
              <AdminLayout currentPage="messages">
                <AdminMessagesPage />
              </AdminLayout>
            } />
            <Route path="/admin/favorites" element={
              <AdminLayout currentPage="favorites">
                <AdminFavoritesPage />
              </AdminLayout>
            } />
            <Route path="/admin" element={
              <AdminLayout currentPage="dashboard">
                <DashboardPage />
              </AdminLayout>
            } />
          </Routes>
        </StoreProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}

export default App;
