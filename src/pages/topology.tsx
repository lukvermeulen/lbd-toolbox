import {
  Accordion,
  ActionIcon,
  Card,
  Text,
  Group,
  Menu,
  Image,
  SimpleGrid,
  Button,
} from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconFileZip,
  IconPlus,
  IconTrash,
} from "@tabler/icons";
import { trpc } from "../utils/trpc";

function Element() {
  return (
    <Card>
      <Menu withinPortal position="bottom-end" shadow="sm">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item>
          <Menu.Item icon={<IconEye size={14} />}>Preview all</Menu.Item>
          <Menu.Item icon={<IconTrash size={14} />} color="red">
            Delete all
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Text>
        since last visit, review them to select which one should be added to
        your gallery
      </Text>

      <Card.Section mt="sm">
        <Image src="https://images.unsplash.com/photo-1579263477001-7a703f1974e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" />
      </Card.Section>
    </Card>
  );
}

function AddElement() {
  return (
    <Card>
      <Card.Section></Card.Section>
      <Button>
        <IconPlus />
      </Button>
    </Card>
  );
}

export default function TopologyPage() {
  const topology = trpc.topology.greeting.useQuery({ name: "hi" });

  if (!topology.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{topology.data.message}</h1>
      <Accordion
        defaultValue={["site", "zone"]}
        variant="separated"
        multiple={true}
      >
        <Accordion.Item value="zone">
          <Accordion.Control>bot:Zone</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of
            settings or overwrite any part of component styles
            <SimpleGrid cols={4}>
              <AddElement />
              <Element />
              <Element />
              <Element />
              <Element />
              <Element />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="site">
          <Accordion.Control>bot:Site</Accordion.Control>
          <Accordion.Panel>
            An area containing one or more buildings.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="building">
          <Accordion.Control>bot:Building</Accordion.Control>
          <Accordion.Panel>
            An independent unit of the built environment with a characteristic
            spatial structure.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="storey">
          <Accordion.Control>bot:Storey</Accordion.Control>
          <Accordion.Panel>A level part of a building.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="space">
          <Accordion.Control>bot:Space</Accordion.Control>
          <Accordion.Panel>
            A limited three-dimensional extent defined physically or notionally.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
