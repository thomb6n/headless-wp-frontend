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
    <div>
      <h1 key={idea.node.id}>{idea.node.title}</h1>
      {idea.node.currentStatus.edges.map((status, index) => (
        <p key={index}>{status.node.name}</p>
      ))}
    </div>
  ));
}

export default App;
