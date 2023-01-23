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
  IconInfoCircle,
  IconLine,
  IconPencil,
  IconTrash,
} from "@tabler/icons";

type TopologyElementProps = {
  category: string;
  name: string;
};
export function TopologyElement({ category, name }: TopologyElementProps) {
  const [id, ...displayName] = name.split("_");
  return (
    <Card shadow={"xs"}>
      <Stack>
        {/* <AspectRatio ratio={5 / 3} sx={{ maxWidth: 300 }} mx="auto">
          </AspectRatio> */}
        {/* <Image
            src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            alt="Panda"
          /> */}
        <Group position="apart">
          <Text>{category}</Text>
          <Menu withinPortal position="bottom-start" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={14} />}>Edit</Menu.Item>
              <Menu.Item icon={<IconTrash size={14} />} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Group position="center">
          <Tooltip label={id} withinPortal>
            <Title order={3}>{displayName.join("_")}</Title>
          </Tooltip>
        </Group>

        <Group position="apart">
          <ActionIcon>
            <IconInfoCircle size={18} />
          </ActionIcon>

          <Menu withinPortal position="bottom-start" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconLine size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconPencil size={14} />}>hasStorey</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Stack>
    </Card>
  );
}
