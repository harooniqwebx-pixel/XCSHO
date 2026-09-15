import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Properties,
  Walkthrough,
  Toronto,
  Journal,
  About,
  Contact,
  Map,
  Experience,
} from "./pages/Pages";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/walkthrough" element={<Walkthrough />} />
        <Route path="/toronto" element={<Toronto />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<Map />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  );
}
