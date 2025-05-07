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
  Flex,
  Box,
  Title,
} from "@mantine/core";

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader size="lg" />;
  if (error || !data) return <Text color="red">Error fetching character</Text>;

  return (
    <div
      style={{
        marginTop:"2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container size="lg">
        <Card
          shadow="xl"
          padding="xl"
          radius="lg"
          withBorder
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap="xl"
            align="center"
            justify="center"
          >
            {/* Image Section */}
            <Box style={{ flex: 1, textAlign: "center" }}>
              <Image
                src={data.image}
                alt={data.name}
                height={400}
                radius="md"
                style={{ objectFit: "cover", width: "100%" }}
              />
            </Box>

            {/* Details Section */}
            <Box style={{ flex: 1 }}>
              <Title order={2} mb="md" style={{ color: "#2c3e50" }}>
                {data.name}
              </Title>
              <Text size="lg" mb="xs">🧬 Species: <strong>{data.species}</strong></Text>
              <Text size="lg" mb="xs">💀 Status: <strong>{data.status}</strong></Text>
              <Text size="lg" mb="xs">🚻 Gender: <strong>{data.gender}</strong></Text>
              <Text size="lg" mb="xs">🌍 Origin: <strong>{data.origin.name}</strong></Text>
              <Text size="lg" mb="xs">📍 Location: <strong>{data.location.name}</strong></Text>

              
            </Box>
          </Flex>
        </Card>
        <Button
                fullWidth
                mt="lg"
                size="md"
                color="green"
                onClick={() => navigate("/resource")}
              >
                Go to Resource List
              </Button>
      </Container>
    </div>
  );
};

export default ResourceDetail;
