
// src/pages/ResourceDetail.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCharacterById } from "../../api/rickAndMorty";
import { Character } from "../../types/rickAndMorty";
import { Card, Image, Text, Container, Loader, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id!),
    enabled: !!id,
  });

  if (isLoading) return <Loader size="lg" />;
  if (error || !data) return <Text color="red">Error fetching character</Text>;

  return (
    <>
    <Container size="sm" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={data.image} alt={data.name} height={300} />
        </Card.Section>
        <Text weight={700} size="lg" mt="md">{data.name}</Text>
        <Text>Species: {data.species}</Text>
        <Text>Status: {data.status}</Text>
        <Text>Gender: {data.gender}</Text>
        <Text>Origin: {data.origin.name}</Text>
        <Text>Location: {data.location.name}</Text>
      </Card>
    <Button onClick={()=> navigate("/resource")}>Go to List</Button>
    </Container>
    </>

  );
};

export default ResourceDetail;
