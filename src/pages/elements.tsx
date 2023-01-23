import {
  AspectRatio,
  Card,
  Space,
  Text,
  Image,
  Group,
  Stack,
} from "@mantine/core";
import { AddElementList } from "~/components/elements/add-element";
import { trpc } from "../utils/trpc";

function RepresentationElement() {
  return (
    <Card shadow={"xs"}>
      <Group position="apart">
        <Text>Element</Text>
        <Text>Element</Text>
        <Text>Element</Text>
      </Group>
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
      <AddElementList
        action={() => pictureMutation.mutate({ name: "Picture" })}
      />
      <Stack>
        {!elements.data && <Text>Loading...</Text>}
        {elements.data?.map((picture) => (
          <RepresentationElement />
        ))}
      </Stack>
    </>
  );
}
