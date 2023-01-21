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
  AspectRatio,
  Anchor,
  Space,
} from "@mantine/core";
import { AddElement } from "~/components/elements/add-element";
import { trpc } from "../utils/trpc";

function TopologyElement() {
  return (
    <Card shadow={"xs"}>
      <AspectRatio ratio={5 / 3} sx={{ maxWidth: 300 }} mx="auto">
        <Image
          src="https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          alt="Panda"
        />
      </AspectRatio>
      {/* <Menu withinPortal position="bottom-end" shadow="sm">
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
      </Card.Section> */}
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
    <>
      <h1>Topology</h1>
      <p>{topology.data.message}</p>
      <Text>
        Describe the core topological concept of the building according to the{" "}
        <Anchor href="https://w3c-lbd-cg.github.io/bot">
          Building Topology Ontology
        </Anchor>
        .
      </Text>
      <Space h="md" />

      <Accordion
        defaultValue={["site", "zone"]}
        variant="separated"
        multiple={true}
      >
        <Accordion.Item value="zone">
          <Accordion.Control>bot:Zone</Accordion.Control>
          <Accordion.Panel>
            A part of the physical world or a virtual world that is inherently
            both located in this world and has a 3D spatial extent.
            <SimpleGrid cols={4}>
              <AddElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="site">
          <Accordion.Control>bot:Site</Accordion.Control>
          <Accordion.Panel>
            An area containing one or more buildings.
            <SimpleGrid cols={4}>
              <AddElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="building">
          <Accordion.Control>bot:Building</Accordion.Control>
          <Accordion.Panel>
            An independent unit of the built environment with a characteristic
            spatial structure.
            <SimpleGrid cols={4}>
              <AddElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="storey">
          <Accordion.Control>bot:Storey</Accordion.Control>
          <Accordion.Panel>
            A level part of a building.
            <SimpleGrid cols={4}>
              <AddElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="space">
          <Accordion.Control>bot:Space</Accordion.Control>
          <Accordion.Panel>
            A limited three-dimensional extent defined physically or notionally.
            <SimpleGrid cols={4}>
              <AddElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
              <TopologyElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
