import { Accordion, Text, SimpleGrid, Anchor, Space } from "@mantine/core";
import type { SimpleGridBreakpoint } from "@mantine/core";
import { useEffect, useReducer, useState } from "react";

import { AddElement } from "~/components/elements/add-element";
import { BuildingLinkMenu } from "~/features/topology/building/building-link-menu";
import { BuildingModal } from "~/features/topology/building/building-modal";
import { SiteLinkMenu } from "~/features/topology/site/site-link-menu";
import { SiteModal } from "~/features/topology/site/site-modal";
import { SpaceLinkMenu } from "~/features/topology/space/space-link-menu";
import { SpaceModal } from "~/features/topology/space/space-modal";
import { StoreyLinkMenu } from "~/features/topology/storey/storey-link-menu";
import { StoreyModal } from "~/features/topology/storey/storey-modal";
import { LdElement } from "~/features/ld-element";
import { ZoneLinkMenu } from "~/features/topology/zone/zone-link-menu";
import { ZoneModal } from "~/features/topology/zone/zone-modal";
import { trpc } from "../utils/trpc";

export default function TopologyPage() {
  type QueryState = {
    zones: string[];
    sites: string[];
    buildings: string[];
    storeys: string[];
    spaces: string[];
  };

  type QueryAction = {
    type: string;
    item: string | string[];
  };

  const initArg: QueryState = {
    zones: [],
    sites: [],
    buildings: [],
    storeys: [],
    spaces: [],
  };

  function addOrRemove(array: string[], item: string | string[]) {
    if (Array.isArray(item)) {
      return item;
    } else {
      const exists = array.includes(item);

      if (exists) {
        return array.filter((arrayItem) => arrayItem !== item);
      } else {
        const result = array;
        array.push(item);
        return result;
      }
    }
  }

  const [queries, dispatch] = useReducer(queryReducer, initArg);
  const [selectMode, setSelectMode] = useState(false);

  function queryReducer(state: QueryState, action: QueryAction) {
    switch (action.type) {
      case "zones":
        return { ...state, zones: addOrRemove(state.zones, action.item) };
      case "sites":
        return { ...state, sites: addOrRemove(state.sites, action.item) };
      case "buildings":
        return {
          ...state,
          buildings: addOrRemove(state.buildings, action.item),
        };
      case "storeys":
        return {
          ...state,
          storeys: addOrRemove(state.storeys, action.item),
        };
      case "spaces":
        return { ...state, spaces: addOrRemove(state.spaces, action.item) };
      default:
        return state;
    }
  }

  const zones = trpc.topology.zone.list.useQuery();
  const zoneMutation = trpc.topology.zone.add.useMutation({
    onSuccess: zones.refetch,
  });
  const zoneDeleteMutation = trpc.topology.zone.remove.useMutation({
    onSuccess: zones.refetch,
  });

  const sites = trpc.topology.site.list.useQuery();
  const siteMutation = trpc.topology.site.add.useMutation({
    onSuccess: sites.refetch,
  });
  const siteDeleteMutation = trpc.topology.site.remove.useMutation({
    onSuccess: sites.refetch,
  });

  const buildings = trpc.topology.building.list.useQuery({
    sites: queries.sites,
  });
  const buildingMutation = trpc.topology.building.add.useMutation({
    onSuccess: buildings.refetch,
  });
  const buildingDeleteMutation = trpc.topology.building.remove.useMutation({
    onSuccess: buildings.refetch,
  });

  const storeys = trpc.topology.storey.list.useQuery({
    buildings: queries.buildings,
  });
  const storeyMutation = trpc.topology.storey.add.useMutation({
    onSuccess: storeys.refetch,
  });
  const storeyDeleteMutation = trpc.topology.storey.remove.useMutation({
    onSuccess: storeys.refetch,
  });

  const spaces = trpc.topology.space.list.useQuery({
    storeys: queries.storeys,
  });
  const spaceMutation = trpc.topology.space.add.useMutation({
    onSuccess: spaces.refetch,
  });
  const spaceDeleteMutation = trpc.topology.space.remove.useMutation({
    onSuccess: spaces.refetch,
  });

  const breakpoints: SimpleGridBreakpoint[] = [
    { maxWidth: 980, cols: 3, spacing: "md" },
    { maxWidth: 755, cols: 2, spacing: "sm" },
    { maxWidth: 600, cols: 1, spacing: "sm" },
  ];

  useEffect(() => {
    zones.refetch();
    sites.refetch();
    buildings.refetch();
    storeys.refetch();
    spaces.refetch();

    const selecting =
      Object.values(queries).reduce((acc, cur) => {
        return acc.concat(cur);
      }).length > 0;
    setSelectMode(selecting);
  }, [queries]);

  useEffect(() => {
    console.log(queries);
    console.log(selectMode);
  }, [selectMode, queries]);

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
            <SimpleGrid cols={4} breakpoints={breakpoints}>
              <AddElement
                Modal={ZoneModal}
                submitValues={zoneMutation.mutate}
              />

              {!zones.data && <Text>Loading...</Text>}
              {zones.data?.map((zone, index) => (
                <LdElement
                  key={index}
                  name={zone}
                  category="bot:Zone"
                  LinkMenu={ZoneLinkMenu}
                  deleteAction={zoneDeleteMutation.mutate}
                  selectAction={dispatch}
                  selected={queries.zones.includes(zone)}
                  actionType="zones"
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="site">
          <Accordion.Control>bot:Site</Accordion.Control>
          <Accordion.Panel>
            An area containing one or more buildings.
            <SimpleGrid cols={4} breakpoints={breakpoints}>
              <AddElement
                Modal={SiteModal}
                submitValues={siteMutation.mutate}
              />

              {!sites.data && <Text>Loading...</Text>}
              {sites.data?.map((site, index) => (
                <LdElement
                  key={index}
                  name={site}
                  category="bot:Site"
                  LinkMenu={SiteLinkMenu}
                  deleteAction={siteDeleteMutation.mutate}
                  selectAction={dispatch}
                  selected={queries.sites.includes(site)}
                  actionType="sites"
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
            <SimpleGrid cols={4} breakpoints={breakpoints}>
              <AddElement
                Modal={BuildingModal}
                submitValues={buildingMutation.mutate}
              />
              {!buildings.data && <Text>Loading...</Text>}
              {buildings.data?.map((building, index) => (
                <LdElement
                  key={index}
                  name={building}
                  category="bot:Building"
                  LinkMenu={BuildingLinkMenu}
                  deleteAction={buildingDeleteMutation.mutate}
                  selectAction={dispatch}
                  selected={queries.buildings.includes(building)}
                  actionType="buildings"
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="storey">
          <Accordion.Control>bot:Storey</Accordion.Control>
          <Accordion.Panel>
            A level part of a building.
            <SimpleGrid cols={4} breakpoints={breakpoints}>
              <AddElement
                Modal={StoreyModal}
                submitValues={storeyMutation.mutate}
              />

              {!storeys.data && <Text>Loading...</Text>}
              {storeys.data?.map((storey, index) => (
                <LdElement
                  key={index}
                  name={storey}
                  category="bot:Storey"
                  LinkMenu={StoreyLinkMenu}
                  deleteAction={storeyDeleteMutation.mutate}
                  selectAction={dispatch}
                  selected={queries.storeys.includes(storey)}
                  actionType="storeys"
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="space">
          <Accordion.Control>bot:Space</Accordion.Control>
          <Accordion.Panel>
            A limited three-dimensional extent defined physically or notionally.
            <SimpleGrid cols={4} breakpoints={breakpoints}>
              <AddElement
                Modal={SpaceModal}
                submitValues={spaceMutation.mutate}
              />
              {!spaces.data && <Text>Loading...</Text>}
              {spaces.data?.map((space, index) => (
                <LdElement
                  key={index}
                  name={space}
                  category="bot:Space"
                  LinkMenu={SpaceLinkMenu}
                  deleteAction={spaceDeleteMutation.mutate}
                  selectAction={dispatch}
                  selected={queries.spaces.includes(space)}
                  actionType="spaces"
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
