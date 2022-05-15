import { ApolloProvider } from "@apollo/client";
import Split from "../components/Split";
import { steadyApolloClient } from "../helpers/Subgraph";

const SplitPage = () => {
  return (
    <div className="SplitPageContainer">
      <ApolloProvider client={steadyApolloClient}>
        <Split />
      </ApolloProvider>
    </div>
  );
}

export default SplitPage;
