import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { POS } from './pages/POS';
import { Cart } from './pages/Cart';
import { Products } from './pages/Products';
import { AddProduct } from './pages/AddProduct';
import { Categories } from './pages/Categories';
import { Stock } from './pages/Stock';
import { Reports } from './pages/Reports';
import { AdminUsers } from './pages/AdminUsers';
import { AdminRoles } from './pages/AdminRoles';
import { AddRole } from './pages/AddRole';
export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                <ProtectedRoute permission="view:dashboard">
                    <Dashboard />
                  </ProtectedRoute>
                } />
              
              <Route
                path="pos"
                element={
                <ProtectedRoute permission="view:pos">
                    <POS />
                  </ProtectedRoute>
                } />
              
              <Route
                path="cart"
                element={
                <ProtectedRoute permission="view:cart">
                    <Cart />
                  </ProtectedRoute>
                } />
              
              <Route
                path="products"
                element={
                <ProtectedRoute permission="view:products">
                    <Products />
                  </ProtectedRoute>
                } />
              
              <Route
                path="products/new"
                element={
                <ProtectedRoute permission="manage:products">
                    <AddProduct />
                  </ProtectedRoute>
                } />
              
              <Route
                path="categories"
                element={
                <ProtectedRoute permission="view:categories">
                    <Categories />
                  </ProtectedRoute>
                } />
              
              <Route
                path="stock"
                element={
                <ProtectedRoute permission="view:stock">
                    <Stock />
                  </ProtectedRoute>
                } />
              
              <Route
                path="reports"
                element={
                <ProtectedRoute permission="view:reports">
                    <Reports />
                  </ProtectedRoute>
                } />
              
              <Route
                path="admin/users"
                element={
                <ProtectedRoute permission="manage:users">
                    <AdminUsers />
                  </ProtectedRoute>
                } />
              
              <Route
                path="admin/roles"
                element={
                <ProtectedRoute permission="manage:roles">
                    <AdminRoles />
                  </ProtectedRoute>
                } />
              
              <Route
                path="admin/roles/new"
                element={
                <ProtectedRoute permission="manage:roles">
                    <AddRole />
                  </ProtectedRoute>
                } />
              
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>);

}