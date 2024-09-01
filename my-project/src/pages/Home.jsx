import React from "react";
import NavBar from "../components/Layout/NavBar";
import Sidebar from "../components/Layout/SideBar";
import StudentList from "../components/Body/List";
import { Box } from "@mui/material";

function Home() {
  return (
    <div>
      <Box sx={{ backgroundColor: "#E5E7EB", height: "100vh", width: "100%" }}>
        <NavBar />
        <Sidebar />
        <StudentList />
      </Box>
    </div>
  );
}

export default Home;
