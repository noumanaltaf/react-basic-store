import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('./views/Login'));
const Home = lazy(() => import('./views/Home'));
const AdminHome = lazy(() => import('./views/AdminHome'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        } />
        <Route path="/admin" element={
          <Suspense fallback={<div>Loading...</div>}>
            <AdminHome />
          </Suspense>
        } />
        <Route path="/admin-login" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login isAdmin={true} />
          </Suspense>
        } />
        <Route path="/user-login" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login isAdmin={false} />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
