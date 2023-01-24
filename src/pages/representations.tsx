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
import { LdElement } from "~/features/ld-element";
import { PictureLinkMenu } from "~/features/representation/picture/picture-link-menu";
import { PictureModal } from "~/features/representation/picture/picture-modal";
import { trpc } from "../utils/trpc";

export default function RepresentationsPage() {
  const pictures = trpc.representation.picture.list.useQuery();
  const pictureMutation = trpc.representation.picture.add.useMutation({
    onSuccess: pictures.refetch,
  });
  const pictureDeleteMutation = trpc.representation.picture.remove.useMutation({
    onSuccess: pictures.refetch,
  });

  const meshes = trpc.representation.mesh.list.useQuery();
  const meshMutation = trpc.representation.mesh.add.useMutation({
    onSuccess: meshes.refetch,
  });

  const breps = trpc.representation.brep.list.useQuery();
  const brepMutation = trpc.representation.brep.add.useMutation({
    onSuccess: breps.refetch,
  });

  const pointclouds = trpc.representation.pointcloud.list.useQuery();
  const pointcloudMutatoin = trpc.representation.pointcloud.add.useMutation({
    onSuccess: pointclouds.refetch,
  });

  const plans = trpc.representation.plan.list.useQuery();
  const planMutation = trpc.representation.plan.add.useMutation({
    onSuccess: plans.refetch,
  });

  return (
    <>
      <h1>Representations</h1>
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
              <AddElement
                Modal={PictureModal}
                submitValues={pictureMutation.mutate}
              />
              {!pictures.data && <Text>Loading...</Text>}
              {pictures.data?.map((picture, index) => (
                <LdElement
                  name={picture.name}
                  properties={{
                    date: picture.date,
                    pictureUrl: picture.pictureUrl,
                  }}
                  LinkMenu={PictureLinkMenu}
                  category="picture"
                  key={index}
                  deleteAction={pictureDeleteMutation.mutate}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="meshes">
          <Accordion.Control>meshes</Accordion.Control>
          <Accordion.Panel>
            A 3D object representation consisting of a collection of vertices
            and polygons.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={PictureModal}
                submitValues={meshMutation.mutate}
              />
              {!meshes.data && <Text>Loading...</Text>}
              {meshes.data?.map((mesh) => (
                <LdElement />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="breps">
          <Accordion.Control>breps</Accordion.Control>
          <Accordion.Panel>
            Boundary representations, a 3D object representation.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={PictureModal}
                submitValues={brepMutation.mutate}
              />
              {!breps.data && <Text>Loading...</Text>}
              {breps.data?.map((brep) => (
                <LdElement />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="pointclouds">
          <Accordion.Control>point clouds</Accordion.Control>
          <Accordion.Panel>
            A discrete set of data points in space, acquired e.g. by laser
            scanning or sfm.
            <SimpleGrid cols={4}>
              <AddElement
                action={() => pointcloudMutatoin.mutate({ name: "Pointcloud" })}
              />
              {!pointclouds.data && <Text>Loading...</Text>}
              {pointclouds.data?.map((pointcloud) => (
                <LdElement />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="plans">
          <Accordion.Control>plans</Accordion.Control>
          <Accordion.Panel>
            Two-Dimensional representations e.g. as line drawing.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={PictureModal}
                submitValues={planMutation.mutate}
              />
              {!plans.data && <Text>Loading...</Text>}
              {plans.data?.map((plan) => (
                <LdElement />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
