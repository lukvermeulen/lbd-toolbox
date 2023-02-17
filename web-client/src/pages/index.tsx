import { Space, Text } from "@mantine/core";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const healthcheck = trpc.healthcheck.useQuery();

  if (!healthcheck.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>LBD toolbox</h1>
      <p>API status: {healthcheck.data}</p>
      <Text>
        Create the semantic topolgy of a building, manage project related
        representations and manage building elements and their according
        properties or meta information.
      </Text>
      <Space h="md" />
    </div>
  );
}
