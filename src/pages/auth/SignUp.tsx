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
import "./auth.css"; // Custom CSS if needed

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Invalid Email: Enter a valid email address.");
      return;
    }

    if (!isValidPassword(trimmedPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find((u: any) => u.email === trimmedEmail);

    if (existing) {
      setErrorMessage("User already exists. Redirecting to login...");
      setTimeout(() => navigate("/signin"), 1500);
      return;
    }

    users.push({ email: trimmedEmail, password: trimmedPassword });
    localStorage.setItem("users", JSON.stringify(users));
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
                <Text size="sm" mt="xs" className="auth-error-text" color="red">
                  {errorMessage}
                </Text>
              )}
              <Button type="submit" fullWidth className="auth-submit-button">
                Register
              </Button>
            </Stack>
          </form>
          <div className="auth-footer" style={{ marginTop: "1rem", textAlign: "center" }}>
            <Text size="sm">Already have an account?</Text>
            <Button
              variant="outline"
              color="blue"
              mt="sm"
              fullWidth
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
