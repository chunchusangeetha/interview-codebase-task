
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResourceList from "./pages/auth/ResourceList";
import ResourceDetail from "./pages/auth/ResourceDetail";
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

