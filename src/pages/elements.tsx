import {
  Space,
  Text,
  Stack,
  Table,
  Tooltip,
  Menu,
  ActionIcon,
  Group,
} from "@mantine/core";
import { useEventListener } from "@mantine/hooks";
import {
  IconArrowMoveRight,
  IconDotsVertical,
  IconInfoCircle,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import { AddElementList } from "~/components/elements/add-element";
import { EditDrawer } from "~/features/edit-drawer";
import { ElementModal } from "~/features/element/element-modal";
import { InfoDrawer } from "~/features/info-drawer/info-drawer";
import { RepresentedByModal } from "~/features/representation/represented-by-modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "../utils/trpc";

type RepresentationElementProps = {
  name: string;
  buildingelementClass: string;
  properties?: { [key: string]: string };
};

function RepresentationElement({
  name,
  buildingelementClass,
  properties,
}: RepresentationElementProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [representedByOpen, setRepresentedByOpen] = useState(false);

  const utils = trpc.useContext();

  const deleteMutation = trpc.element.remove.useMutation({
    onSuccess: () => {
      utils.element.invalidate();
    },
  });

  const { id, displayName } = splitIriToIdAndName(name);

  return (
    <>
      <tr key={name}>
        <td>
          <Group>
            <Tooltip label={name}>
              <Text>{splitIriToIdAndName(name).displayName}</Text>
            </Tooltip>
            <ActionIcon onClick={() => setInfoOpen(true)}>
              <IconInfoCircle size={18} />
            </ActionIcon>
          </Group>
        </td>
        <td>
          <Text>{buildingelementClass}</Text>
        </td>
        <td>
          <Group position="right">
            <Menu withinPortal position="bottom-start" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconArrowMoveRight size={14} />}
                  onClick={() => setRepresentedByOpen(true)}
                >
                  representedBy
                </Menu.Item>

                <Menu.Item
                  icon={<IconPencil size={14} />}
                  onClick={() => setEditOpen(true)}
                >
                  Edit
                </Menu.Item>

                <Menu.Item
                  icon={<IconTrash size={14} />}
                  color="red"
                  onClick={() => {
                    deleteMutation.mutate({ name });
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </td>
      </tr>
      <InfoDrawer
        open={infoOpen}
        setOpen={setInfoOpen}
        elementInfo={{ displayName: displayName, name: name }}
        properties={properties}
      />
      <EditDrawer
        open={editOpen}
        setOpen={setEditOpen}
        elementInfo={{ displayName: displayName, name: name }}
      />
      <RepresentedByModal
        open={representedByOpen}
        setOpen={setRepresentedByOpen}
        name={name}
      />
    </>
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
              <th></th>
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
