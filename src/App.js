import { useQuery, gql } from "@apollo/client";

const GET_IDEAS = gql`
  {
    ideas {
      edges {
        node {
          id
          title
          currentStatus {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_IDEAS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.ideas.edges.map((idea) => (
    <div key={idea.node.id}>
      <h1>{idea.node.title}</h1>
      {idea.node.currentStatus.edges.map((status, index) => (
        <p key={status.node.id}>{status.node.name}</p>
      ))}
    </div>
  ));
}

export default App;
