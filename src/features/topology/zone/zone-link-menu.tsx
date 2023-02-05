import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";
import { useState } from "react";
import { AdjacentZoneModal } from "./adjacent-zone-modal";

type ZoneLinkMenuProps = { name: string };

export function ZoneLinkMenu({ name }: ZoneLinkMenuProps) {
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
            intersectsZone
          </Menu.Item>
          <Menu.Item icon={<IconArrowMoveRight size={14} />}>
            containsZone
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <AdjacentZoneModal
        open={adjacentZoneOpen}
        setOpen={setAdjacentZoneOpen}
        name={name}
      />
    </>
  );
}
