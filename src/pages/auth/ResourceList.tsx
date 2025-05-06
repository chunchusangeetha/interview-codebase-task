
// src/pages/ResourceList.tsx
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/app.store";
import { fetchCharacters } from "../../api/rickAndMorty";
import { Character } from "../../types/rickAndMorty";
import { Link } from "react-router-dom";
import { Table, Loader, Text, Container, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ResourceList = () => {
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
    enabled: isAuthenticated, // Prevent fetching when not authenticated
  });

  if (!isAuthenticated) {
    return <Text align="center" mt="xl" onClick={()=>navigate("/signin")}>Please log in to view the content.</Text>;
  }

  if (isLoading) return <Loader size="lg" />;
  if (error || !data) return <Text color="red">Error loading characters</Text>;

  return (
    <>
    <Container size="lg" mt="md">
      <Text size="xl" weight={700} mb="md">Rick and Morty Characters</Text>
      <Table striped highlightOnHover withBorder>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((character: Character) => (
            <tr key={character.id}>
              <td><Link to={`/resource/${character.id}`}>{character.name}</Link></td>
              <td>{character.species}</td>
              <td>{character.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
      </>
  );
};

export default ResourceList;
