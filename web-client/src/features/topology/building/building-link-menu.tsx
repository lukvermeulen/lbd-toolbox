import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";
import { useState } from "react";
import { HasStoreyModal } from "../storey/has-storey-modal";

type BuildingLinkMenuProps = { name: string };

export function BuildingLinkMenu({ name }: BuildingLinkMenuProps) {
  const [hasStoreyOpen, setHasStoreyOpen] = useState(false);

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
            onClick={() => setHasStoreyOpen(true)}
          >
            hasStorey
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <HasStoreyModal
        open={hasStoreyOpen}
        setOpen={setHasStoreyOpen}
        name={name}
      />
    </>
  );
}
