// src/pages/auth/SignUp.tsx
import { useState } from "react";
import { TextInput, PasswordInput, Button, Card, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("User registered! Now sign in.");
    navigate("/signin");
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>Sign Up</Title>
      <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.currentTarget.value)} mt="md" />
      <Button fullWidth mt="lg" onClick={handleSignup}>
        Register
      </Button>
    </Card>
  );
}
