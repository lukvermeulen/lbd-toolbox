import {
  Card,
  Group,
  Stack,
  Text,
  Menu,
  ActionIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconInfoCircle,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { useState } from "react";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";
import { EditDrawer } from "./edit-drawer";
import { InfoDrawer } from "./info-drawer";

type TopologyElementProps = {
  category: string;
  name: string;
  deleteAction: (input: { name: string }) => void;
  selectAction: () => void;
  LinkMenu?: React.ElementType;
};
export function TopologyElement({
  category,
  name,
  deleteAction,
  selectAction,
  LinkMenu,
}: TopologyElementProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const { id, displayName } = splitIriToIdAndName(name);

  function selectElement() {
    setSelected((value) => !value);
    selectAction();
  }

  return (
    <>
      <Card
        shadow={"xs"}
        sx={(theme) => {
          if (!selected) return {};
          return {
            outline: "1px solid",
            outlineColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.dark[9],
          };
        }}
      >
        <Stack>
          <Group position="apart">
            <Text>{category}</Text>
            <Menu withinPortal position="bottom-start" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconEye size={14} />}
                  onClick={() => setEditOpen(true)}
                >
                  Filter storeys‚
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
                    deleteAction({ name });
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group position="center" onClick={selectElement}>
            <Tooltip label={id} withinPortal>
              <Title order={3}>{displayName}</Title>
            </Tooltip>
          </Group>

          <Group position="apart">
            <ActionIcon onClick={() => setInfoOpen(true)}>
              <IconInfoCircle size={18} />
            </ActionIcon>

            {LinkMenu && <LinkMenu name={name} />}
          </Group>
        </Stack>
      </Card>
      <InfoDrawer
        open={infoOpen}
        setOpen={setInfoOpen}
        elementInfo={{ displayName: displayName, name: name }}
      />
      <EditDrawer
        open={editOpen}
        setOpen={setEditOpen}
        elementInfo={{ displayName: displayName, name: name }}
      />
    </>
  );
}
