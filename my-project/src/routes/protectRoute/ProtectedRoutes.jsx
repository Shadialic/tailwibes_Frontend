import { Navigate } from "react-router-dom";
import React from "react";

function RouteProtect(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default RouteProtect;
