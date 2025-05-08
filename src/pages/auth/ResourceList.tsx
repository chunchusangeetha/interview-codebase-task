import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../../api/rickAndMorty";
import { Character } from "../../types/rickAndMorty";
import { Table, Loader, Text, Container, Button, Group } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../store/app.store";
import "./auth.css";

const ResourceList = () => {
  const { isAuthenticated, logout } = useStore();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    logout();
    navigate("/signup");
  };

  if (!isAuthenticated) {
    return (
      <Text className="auth-error-text">
        Please log in to view the content.
      </Text>
    );
  }

  if (isLoading) return <Loader size="lg" className="auth-loader" />;
  if (error || !data) return <Text className="auth-error-text">Error loading characters</Text>;

  return (
    
    <Container size="lg" mt="md" className="resource-container">
      <Group  className="resource-header">
        <Text  className="resource-title" >
          Rick and Morty List
        </Text>
        <Button onClick={handleLogout} className="logout-button">
          Logout
        </Button>
      </Group>
      <Table striped highlightOnHover className="resource-table">
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
              <td>
                <Link to={`/resource/${character.id}`} className="resource-link">
                  {character.name}
                </Link>
              </td>
              <td>{character.species}</td>
              <td>{character.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResourceList;
