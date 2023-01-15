import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import About from "./pages/About";
import Avatar from "./pages/Avatar";
import "./style/index.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign" element={<Register props={true} />} />
          <Route path="/register" element={<Register props={false} />} />
          <Route path="/avatar/:id" element={<Avatar props={true} />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
