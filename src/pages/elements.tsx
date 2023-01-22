import { AspectRatio, Card, Space, Text, Image } from "@mantine/core";
import { AddElement } from "~/components/elements/add-element";
import { trpc } from "../utils/trpc";

function RepresentationElement() {
  return (
    <Card shadow={"xs"}>
      <AspectRatio ratio={5 / 3} sx={{ maxWidth: 300 }} mx="auto">
        <Image
          src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          alt="Panda"
        />
      </AspectRatio>
    </Card>
  );
}

export default function ElementsPage() {
  const elements = trpc.element.list.useQuery();
  const pictureMutation = trpc.element.add.useMutation({
    onSuccess: elements.refetch,
  });

  return (
    <>
      <h1>Elements</h1>
      <Text>Show element, their properties and their meta information.</Text>
      <Space h="md" />
      <AddElement action={() => pictureMutation.mutate({ name: "Picture" })} />
      {!elements.data && <Text>Loading...</Text>}
      {elements.data?.map((picture) => (
        <RepresentationElement />
      ))}
    </>
  );
}
