import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

const Landing = React.lazy(() => import("../pages/Landing"));
const Login = React.lazy(() => import("../pages/Login"));
const Register = React.lazy(() => import("../pages/Register"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/*" element={<Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
