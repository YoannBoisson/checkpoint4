import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Outlet, useNavigate } from "react-router-dom";

export default function Navigation() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "ingesta") {
      navigate("/ingesta");
    } else if (newValue === "contact") {
      navigate("/contact");
    } else if (newValue === "home") {
      navigate("/");
    }
  };

  return (
    <>
      <BottomNavigation
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          position: "fixed",
          bottom: 0,
          zIndex: 999,
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Accueil"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Calcul des apports"
          value="ingesta"
          icon={<LocalDiningIcon />}
        />

        <BottomNavigationAction
          label="Contact"
          value="contact"
          icon={<ContactMailIcon />}
        />
      </BottomNavigation>
      <Outlet />
    </>
  );
}
