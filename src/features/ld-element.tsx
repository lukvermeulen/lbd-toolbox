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
import { EditDrawer } from "./edit-drawer";
import { InfoDrawer } from "./info-drawer";

type LdElementProps = {
  category: string;
  name: string;
  properties?: { [key: string]: string };
  deleteAction: (input: { name: string }) => void;
  selectAction?: (action: { type: string; item: string | string[] }) => void;
  actionType?: string;
  selected?: boolean;
  LinkMenu?: React.ElementType;
};
export function LdElement({
  category,
  name,
  properties,
  deleteAction,
  selectAction,
  actionType,
  selected,
  LinkMenu,
}: LdElementProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { id, displayName } = splitIriToIdAndName(name);

  function selectElement() {
    if (selectAction && actionType)
      selectAction({ type: actionType, item: name });
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
        properties={properties}
      />
      <EditDrawer
        open={editOpen}
        setOpen={setEditOpen}
        elementInfo={{ displayName: displayName, name: name }}
      />
    </>
  );
}
