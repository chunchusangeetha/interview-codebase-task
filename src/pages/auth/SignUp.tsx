import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useStore } from "../../store/app.store";
import "./auth.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find((u: any) => u.email === email);

    if (existing) {
      setErrorMessage("Account already exists. Please log in.");
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    login(); 
    navigate("/resource");
  };

  return (
    <div className="auth-container">
      <Container size="xs" className="auth-card-container">
        <Card shadow="lg" className="auth-card">
          <Title order={2} mb="md" className="auth-title">
            Create an Account
          </Title>
          <form onSubmit={handleSignup}>
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
              {errorMessage && (
                <Text size="sm" color="red" className="auth-error-text">
                  {errorMessage}
                </Text>
              )}
              <Button
                type="submit"
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
              onClick={() => navigate("/signin")}
              className="auth-secondary-button"
            >
              Login
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
