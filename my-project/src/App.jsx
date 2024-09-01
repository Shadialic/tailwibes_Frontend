import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeacherRoutes from "./routes/TeacherRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<TeacherRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
