// src/pages/SignUp.tsx
import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Title,
  Container,
  Stack,
  Text,
  Center,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = () => {
    if (!isValidEmail(email)) {
      showNotification({ title: "Invalid Email", message: "Enter a valid email address.", color: "red" });
      return;
    }

    if (password.length < 4) {
      showNotification({ title: "Weak Password", message: "Password must be at least 4 characters.", color: "red" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find((u: any) => u.email === email);

    if (existing) {
      showNotification({
        title: "User Exists",
        message: "Account already exists. Redirecting to login...",
        color: "orange",
      });
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showNotification({
      title: "Success",
      message: "Registration successful. Redirecting to login...",
      color: "green",
    });
    navigate("/signin");
  };

  return (
    <div style={{ marginTop:"2rem", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Container size="xs">
        <Card shadow="md" padding="xl" radius="lg" withBorder style={{width: 300}}>
          <Title order={2} align="center" mb="md" style={{ color: "#2c3e50" }}>
            Create an Account
          </Title>
          <form onSubmit={handleSignup}>

          <Stack spacing="md">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              type="email"
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
              placeholder="Create a password"
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
              <Button style={{ backgroundColor: "#2ecc71", width: "150px" }}>
                Register
              </Button>
            </Center>
            <Text align="center" size="sm">Already have an account?</Text>
            <Center>
              <Button variant="outline" color="blue" onClick={() => navigate("/signin")} style={{ width: "150px" }}>
                Login
              </Button>
            </Center>
          </Stack>
          </form>
        </Card>
      </Container>
    </div>
  );
}
