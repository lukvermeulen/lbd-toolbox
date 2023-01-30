import { Space, Text, Stack, Table, Tooltip } from "@mantine/core";
import { AddElementList } from "~/components/elements/add-element";
import { ElementModal } from "~/features/element/element-modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "../utils/trpc";

type RepresentationElementProps = {
  name: string;
  buildingelementClass: string;
};

function RepresentationElement({
  name,
  buildingelementClass,
}: RepresentationElementProps) {
  return (
    <tr key={name}>
      <td>
        <Tooltip label={name}>
          <Text>{splitIriToIdAndName(name).displayName}</Text>
        </Tooltip>
      </td>
      <td>
        <Text>{buildingelementClass}</Text>
      </td>
    </tr>
  );
}

export default function ElementsPage() {
  const elements = trpc.element.list.useQuery();
  const elementMutation = trpc.element.add.useMutation({
    onSuccess: elements.refetch,
  });

  return (
    <>
      <h1>Elements</h1>
      <Text>Show element, their properties and their meta information.</Text>
      <Space h="md" />
      <AddElementList
        Modal={ElementModal}
        submitValues={elementMutation.mutate}
      />
      <Stack>
        {!elements.data && <Text>Loading...</Text>}
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Building element class</th>
            </tr>
          </thead>
          <tbody>
            {elements.data?.map((element) => (
              <RepresentationElement
                name={element.name}
                buildingelementClass={element.buildingelementClass}
              />
            ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
}
