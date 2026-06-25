import React from 'react';
import Navbar from './../../composants/Navbar';
import Footer from './../../composants/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* TOASTS */}
      <ToastContainer position="top-right" />

    </div>
  );
};

export default UserLayout;