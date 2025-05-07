// src/pages/SignIn.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, PasswordInput, Button, Container, Card, Stack, Title, Text, Center } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useStore } from "../../store/app.store";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = savedUsers.find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      showNotification({ title: "Login Failed", message: "Invalid credentials", color: "red" });
      return;
    }

    login();
    showNotification({ title: "Login Successful", message: "Redirecting to dashboard...", color: "green" });
    navigate("/resource");
  };

  return (
    <div style={{ marginTop:"2rem", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Container size="xs">
        <Card shadow="md" radius="lg" withBorder  style={{width: 300}} >
          <Title order={2} align="center" mb="md" style={{ color: "#2c3e50" }}>
            Sign In
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              styles={{
                input: {
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid black",
                backgroundColor: "white",
                },
              }}
              />
              <PasswordInput
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              styles={{
                input: {
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid black",
                backgroundColor: "white",
                },
              }}
              />
              <Center>
              <Button type="submit" style={{ backgroundColor: "#2ecc71", width: "150px" }}>
                Sign In
              </Button>
              </Center>
              <Text align="center" size="sm">Don't have an account?</Text>
              <Center>
              <Button variant="outline" color="blue" onClick={() => navigate("/signup")} style={{ width: "150px" }}>
                Sign Up
              </Button>
              </Center>
            </Stack>
          </form>
        </Card>
      </Container>
    </div>
  );
};

export default SignIn;
