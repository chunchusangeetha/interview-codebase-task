<<<<<<< HEAD
=======
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import "./App.scss";
>>>>>>> 55a1489 (code done)
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResourceList from "./pages/auth/ResourceList";
<<<<<<< HEAD
import ResourceDetail from "./pages/auth/ResourceDetail";
=======
import ResourceDetail from "./pages/auth/ResoureDetail"
>>>>>>> 55a1489 (code done)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/resource" element={<ResourceList />} />
      <Route path="/resource/:id" element={<ResourceDetail />} />
    </Routes>
  );
};

export default App;
<<<<<<< HEAD
=======

>>>>>>> 55a1489 (code done)
