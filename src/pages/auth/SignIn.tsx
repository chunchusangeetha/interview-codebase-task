// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Container, Title, Stack } from "@mantine/core";
import { useStore } from "../../store/app.store";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Container, Title, Stack } from "@mantine/core";
import { useStore } from "../../store/app.store";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve user data from localStorage
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    // Validate credentials
    if (email === savedUser.email && password === savedUser.password) {
      login(); // Update auth state
      navigate("/resource"); // Navigate to ResourceList page
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container size="xs" mt="xl">
      <Title align="center" mb="md">Sign In</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="admin"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="1234"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <Button type="submit">Sign In</Button>
        </Stack>
      </form>
      <p>New User?</p>
      <Button onClick={() => navigate("/signup")}>Go to Sign Up</Button>
    </Container>
  );
};

export default Login;
    <div style={{ backgroundColor: "#e9ecef", minHeight: "100vh", padding: "2rem" }}>
      {/* Header Section */}
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title style={{ color: "#2c3e50", fontSize: "2.5rem", fontWeight: "bold" }}>API Management Portal</Title>
        <p style={{ color: "#6c757d", fontSize: "1.2rem" }}>
          Manage your API keys, monitor usage, and access resources.
        </p>
      </header>

      {/* Sign-In Container */}
      <Container size="xs" mt="xl" style={{ backgroundColor: "white", borderRadius: "1rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Title align="center" mb="md" style={{ color: "#2c3e50", fontSize: "2rem" }}>Sign In</Title>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Button type="submit" style={{ backgroundColor: "#3498db" }}>Sign In</Button>
          </Stack>
        </form>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem", gap: "2rem" }}>
          <p style={{ marginRight: "0.1rem" }}>New User?</p>
          <Button onClick={() => navigate("/signup")} style={{ backgroundColor: "#2ecc71" }}>
            Sign Up
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Login;
