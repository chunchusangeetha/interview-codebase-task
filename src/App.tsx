import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResourceList from "./pages/auth/ResourceList";
import ResourceDetail from "./pages/auth/ResourceDetail";
import { Title, Text } from "@mantine/core";
import "./style.scss";

const App = () => {
  return (
    <div>
      <header
        style={{
          backgroundColor: "#2c3e50",
          color: "#fff",
          padding: "2rem 0",
          textAlign: "center",
        }}
      >
        <Title order={1} style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
        Discover the World of Rick and Morty
        </Title>
        <Text style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
        Explore characters, locations, and episodes from the multiverse
        </Text>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resource" element={<ResourceList />} />
        <Route path="/resource/:id" element={<ResourceDetail />} />
      </Routes>
    </div>
  );
};

export default App;