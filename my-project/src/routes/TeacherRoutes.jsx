import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import RouteProtect from "./protectRoute/ProtectedRoutes";
import PublicRoutes from "./publicRoutes/PublicRoutes";

function TeacherRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteProtect>
            {" "}
            <Home />
          </RouteProtect>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />{" "}
          </PublicRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        }
      />
    </Routes>
  );
}

export default TeacherRoutes;
