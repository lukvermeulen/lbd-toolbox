import { Accordion, Text, SimpleGrid, Anchor, Space } from "@mantine/core";

import { AddElement } from "~/components/elements/add-element";
import { BuildingLinkMenu } from "~/features/topology/building/building-link-menu";
import { BuildingModal } from "~/features/topology/building/building-modal";
import { SiteLinkMenu } from "~/features/topology/site/site-link-menu";
import { SiteModal } from "~/features/topology/site/site-modal";
import { SpaceLinkMenu } from "~/features/topology/space/space-link-menu";
import { SpaceModal } from "~/features/topology/space/space-modal";
import { StoreyLinkMenu } from "~/features/topology/storey/storey-link-menu";
import { StoreyModal } from "~/features/topology/storey/storey-modal";
import { TopologyElement } from "~/features/topology/topology-element";
import { ZoneLinkMenu } from "~/features/topology/zone/zone-link-menu";
import { ZoneModal } from "~/features/topology/zone/zone-modal";
import { trpc } from "../utils/trpc";

export default function TopologyPage() {
  const zones = trpc.topology.zone.list.useQuery();
  const zoneMutation = trpc.topology.zone.add.useMutation({
    onSuccess: zones.refetch,
  });

  const sites = trpc.topology.site.list.useQuery();
  const siteMutation = trpc.topology.site.add.useMutation({
    onSuccess: sites.refetch,
  });

  const buildings = trpc.topology.building.list.useQuery();
  const buildingMutation = trpc.topology.building.add.useMutation({
    onSuccess: buildings.refetch,
  });

  const storeys = trpc.topology.storey.list.useQuery();
  const storeyMutation = trpc.topology.storey.add.useMutation({
    onSuccess: storeys.refetch,
  });

  const spaces = trpc.topology.space.list.useQuery();
  const spaceMutation = trpc.topology.space.add.useMutation({
    onSuccess: spaces.refetch,
  });

  return (
    <>
      <h1>Topology</h1>
      <Text>
        Describe the core topological concept of the building according to the{" "}
        <Anchor href="https://w3c-lbd-cg.github.io/bot">
          Building Topology Ontology
        </Anchor>
        .
      </Text>
      <Space h="md" />

      <Accordion defaultValue={[]} variant="separated" multiple={true}>
        <Accordion.Item value="zone">
          <Accordion.Control>bot:Zone</Accordion.Control>
          <Accordion.Panel>
            A part of the physical world or a virtual world that is inherently
            both located in this world and has a 3D spatial extent.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={ZoneModal}
                submitValues={zoneMutation.mutate}
              />

              {!zones.data && <Text>Loading...</Text>}
              {zones.data?.map((zone) => (
                <TopologyElement
                  name={zone}
                  category="bot:Zone"
                  LinkMenu={ZoneLinkMenu}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="site">
          <Accordion.Control>bot:Site</Accordion.Control>
          <Accordion.Panel>
            An area containing one or more buildings.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={SiteModal}
                submitValues={siteMutation.mutate}
              />

              {!sites.data && <Text>Loading...</Text>}
              {sites.data?.map((site) => (
                <TopologyElement
                  name={site}
                  category="bot:Site"
                  LinkMenu={SiteLinkMenu}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="building">
          <Accordion.Control>bot:Building</Accordion.Control>
          <Accordion.Panel>
            An independent unit of the built environment with a characteristic
            spatial structure.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={BuildingModal}
                submitValues={buildingMutation.mutate}
              />
              {!buildings.data && <Text>Loading...</Text>}
              {buildings.data?.map((building) => (
                <TopologyElement
                  name={building}
                  category="bot:Building"
                  LinkMenu={BuildingLinkMenu}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="storey">
          <Accordion.Control>bot:Storey</Accordion.Control>
          <Accordion.Panel>
            A level part of a building.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={StoreyModal}
                submitValues={storeyMutation.mutate}
              />

              {!storeys.data && <Text>Loading...</Text>}
              {storeys.data?.map((storey) => (
                <TopologyElement
                  name={storey}
                  category="bot:Storey"
                  LinkMenu={StoreyLinkMenu}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="space">
          <Accordion.Control>bot:Space</Accordion.Control>
          <Accordion.Panel>
            A limited three-dimensional extent defined physically or notionally.
            <SimpleGrid cols={4}>
              <AddElement
                Modal={SpaceModal}
                submitValues={spaceMutation.mutate}
              />
              {!spaces.data && <Text>Loading...</Text>}
              {spaces.data?.map((space) => (
                <TopologyElement
                  name={space}
                  category="bot:Space"
                  LinkMenu={SpaceLinkMenu}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
