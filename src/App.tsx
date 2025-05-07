
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResourceList from "./pages/auth/ResourceList";
import ResourceDetail from "./pages/auth/ResourceDetail";
import { Title, Text } from "@mantine/core";
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
      <Title order={1} style={{ fontWeight: "bold", fontSize: "3rem" }}>
        Rick and Morty API Explorer
      </Title>
      <Text style={{ fontSize: "1.2rem", marginTop: "0.5rem" }}>
        Browse characters, episodes, and locations from the world of Rick and Morty. Fetch data directly from the API.
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

