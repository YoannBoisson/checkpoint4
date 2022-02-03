import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import ContactPage from "../pages/ContactPage";
import Homepage from "../pages/HomePage";
import IngestaPage from "../pages/IngestaPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Homepage />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/ingesta" element={<IngestaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;