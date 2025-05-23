import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Card,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useStore } from "../../store/app.store";
import "./auth.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const user = savedUsers.find((u: any) => u.email === email);

    if (!user || user.password !== password) {
      setErrorMessage("Invalid email or password.");
      return;
    }

    login();
    navigate("/resource");
  };

  return (
    <div className="auth-container">
      <Container size="xs" className="auth-card-container">
        <Card shadow="lg" className="auth-card">
          <Title order={2} mb="md" className="auth-title">
            Login to your account
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
                className="auth-input"
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
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
              <Button type="submit" fullWidth className="auth-submit-button">
                Sign In
              </Button>
            </Stack>
          </form>
          <div className="auth-footer">
            <Text size="sm" className="auth-footer-text">
              Don't have an account?
            </Text>
            <Button
              onClick={() => navigate("/signup")}
              className="auth-secondary-button"
            >
              Sign Up
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default SignIn;
