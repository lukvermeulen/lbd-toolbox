import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";
import { useState } from "react";
import { RepresentedByModal } from "~/features/representation/represented-by-modal";
import { AdjacentZoneModal } from "../zone/adjacent-zone-modal";

type SpaceLinkMenuProps = { name: string };

export function SpaceLinkMenu({ name }: SpaceLinkMenuProps) {
  const [representedByOpen, setRepresentedByOpen] = useState(false);
  const [adjacentZoneOpen, setAdjacentZoneOpen] = useState(false);

  return (
    <>
      <Menu withinPortal position="bottom-start" shadow="sm">
        <Menu.Target>
          <ActionIcon>
            <IconLine size={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            icon={<IconArrowMoveRight size={14} />}
            onClick={() => setAdjacentZoneOpen(true)}
          >
            adjacentZone
          </Menu.Item>
          <Menu.Item icon={<IconArrowMoveRight size={14} />}>
            hasElement
          </Menu.Item>
          <Menu.Item
            icon={<IconArrowMoveRight size={14} />}
            onClick={() => setRepresentedByOpen(true)}
          >
            representedBy
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <RepresentedByModal
        open={representedByOpen}
        setOpen={setRepresentedByOpen}
        name={name}
      />
      <AdjacentZoneModal
        open={adjacentZoneOpen}
        setOpen={setAdjacentZoneOpen}
        name={name}
      />
    </>
  );
}
