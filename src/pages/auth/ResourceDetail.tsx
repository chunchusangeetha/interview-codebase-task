// src/pages/ResourceDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../../api/rickAndMorty";
import { Character } from "../../types/rickAndMorty";
import {
  Card,
  Image,
  Text,
  Container,
  Loader,
  Button,
  Box,
  Title,
  Group,
} from "@mantine/core";
import "./auth.css";

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id!),
    enabled: !!id,
  });

  const handleLogout = () => {
    navigate("/signup");
  };

  if (isLoading) return <Loader size="lg" className="auth-loader" />;
  if (error || !data) return <Text color="red">Error fetching character</Text>;

  return (
    <Container size="lg" className="resource-detail-container">
      {/* Header with Title and Logout Button */}
      <Group justify="space-between" className="resource-detail-header">
        <Title order={2} className="resource-detail-title">
          Character Details
        </Title>
        <Button color="red" onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </Group>

      {/* Card with Image and Details */}
      <Card shadow="xl" padding="xl" radius="lg" withBorder className="resource-detail-card">
        <Box className="resource-detail-image">
          <Image
            src={data.image}
            alt={data.name}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box className="resource-detail-info">
          <Title order={3} className="resource-detail-name">
            {data.name}
          </Title>
          <Text size="lg">🧬 Species: <strong>{data.species}</strong></Text>
          <Text size="lg">💀 Status: <strong>{data.status}</strong></Text>
          <Text size="lg">🚻 Gender: <strong>{data.gender}</strong></Text>
          <Text size="lg">🌍 Origin: <strong>{data.origin.name}</strong></Text>
          <Text size="lg">📍 Location: <strong>{data.location.name}</strong></Text>
        </Box>
      </Card>

      {/* Back to Resource List Button */}
      <Button
        
        onClick={() => navigate("/resource")}
        className="back-button"
      >
        Back to Resource List
      </Button>
    </Container>
  );
};

export default ResourceDetail;
