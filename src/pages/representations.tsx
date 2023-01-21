import {
  Accordion,
  AspectRatio,
  Card,
  SimpleGrid,
  Image,
  Space,
  Anchor,
  Text,
} from "@mantine/core";
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

export default function RepresentationsPage() {
  const representation = trpc.representation.greeting.useQuery({ name: "hi" });

  if (!representation.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <h1>Representations</h1>
      <p>{representation.data.message}</p>
      <Text>Manage building representations of various types.</Text>
      <Space h="md" />
      <Accordion
        defaultValue={["pictures"]}
        variant="separated"
        multiple={true}
      >
        <Accordion.Item value="pictures">
          <Accordion.Control>pictures</Accordion.Control>
          <Accordion.Panel>
            Images taken by camera.
            <SimpleGrid cols={4}>
              <AddElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="meshes">
          <Accordion.Control>meshes</Accordion.Control>
          <Accordion.Panel>
            A 3D object representation consisting of a collection of vertices
            and polygons.
            <SimpleGrid cols={4}>
              <AddElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="breps">
          <Accordion.Control>breps</Accordion.Control>
          <Accordion.Panel>
            Boundary representations, a 3D object representation.
            <SimpleGrid cols={4}>
              <AddElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="pointclouds">
          <Accordion.Control>point clouds</Accordion.Control>
          <Accordion.Panel>
            A discrete set of data points in space, acquired e.g. by laser
            scanning or sfm.
            <SimpleGrid cols={4}>
              <AddElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="plans">
          <Accordion.Control>plans</Accordion.Control>
          <Accordion.Panel>
            Two-Dimensional representations e.g. as line drawing.
            <SimpleGrid cols={4}>
              <AddElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
              <RepresentationElement />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
