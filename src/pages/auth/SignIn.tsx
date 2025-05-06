// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Container, Title, Stack } from "@mantine/core";
import { useStore } from "../../store/app.store";

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
