import { Navigate } from "react-router-dom";
import React from "react";

function RouteProtect(props) {
  console.log(localStorage.getItem("token"),'30303030303030303');
  
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default RouteProtect;
