import { Space, Text } from "@mantine/core";
import { trpc } from "../utils/trpc";

export default function ElementsPage() {
  const element = trpc.element.greeting.useQuery({ name: "hi" });

  if (!element.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <h1>Elements</h1>
      <p>{element.data.message}</p>
      <Text>Show element, their properties and their meta information.</Text>
      <Space h="md" />
    </>
  );
}
