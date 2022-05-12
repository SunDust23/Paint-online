import React from "react";
import Paint from "./pages/Paint";
import "./styles/app.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Paint />}/>
        <Route path="*" element={<Navigate to={`f${(+new Date).toString(16)}`} />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
