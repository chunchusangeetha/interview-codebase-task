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
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./auth.css"; // Import shared CSS for consistent styling

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = () => {
    if (!isValidEmail(email)) {
      alert("Invalid Email: Enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      alert("Weak Password: Password must be at least 4 characters.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find((u: any) => u.email === email);

    if (existing) {
      alert("User Exists: Account already exists. Redirecting to login...");
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/resource");
  };

  return (
    <div className="auth-container">
      <Container size="xs" className="auth-card-container">
        <Card shadow="lg" padding="xl" radius="lg" withBorder className="auth-card">
          <Title order={2} mb="md" className="auth-title">
            Create an Account
          </Title>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
                className="auth-input"
              />
              <PasswordInput
                label="Password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
                className="auth-input"
              />
              <Button
                onClick={handleSignup}
                type="button"
                fullWidth
                className="auth-submit-button"
              >
                Register
              </Button>
            </Stack>
          </form>
          <div className="auth-footer">
            <Text size="sm" className="auth-footer-text">
              Already have an account?
            </Text>
            <Button
              variant="outline"
              color="blue"
              onClick={() => navigate("/signin")}
              className="auth-secondary-button"
            >
              Log in
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
