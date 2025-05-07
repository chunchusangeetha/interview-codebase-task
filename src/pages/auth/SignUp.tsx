import { useState } from "react";
import { TextInput, PasswordInput, Button, Card, Title, Container, Stack, Text, Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const existingUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (existingUser.email === email) {
      alert("An account with this email already exists. Redirecting to sign in...");
      setTimeout(() => navigate("/signin"), 1000);
      return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("User registered successfully! Redirecting to sign in...");
    navigate("/signin");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        //minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container size="md">
        <Card shadow="md" padding="xl" radius="lg"  withBorder style={{ backgroundColor: "white", 
 }}>
          <Title order={2} align="center" mb="md" style={{ color: "#2c3e50" }}>
            Create an Account
          </Title>
          <Stack spacing="md">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Center>
              <Button onClick={handleSignup} style={{ backgroundColor: "#2ecc71", width: "150px" }}>
                Register
              </Button>
            </Center>
            <Text align="center" size="sm">
              Already have an account?
            </Text>
            <Center>
              <Button variant="outline" color="blue" onClick={() => navigate("/signin")} style={{ width: "150px" }}>
                Login
              </Button>
            </Center>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}
