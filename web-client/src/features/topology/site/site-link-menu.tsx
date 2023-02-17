import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";
import { useState } from "react";
import { HasBuildingModal } from "../building/has-building-modal";

type SiteLinkMenuProps = { name: string };

export function SiteLinkMenu({ name }: SiteLinkMenuProps) {
  const [hasBuildingOpen, setHasBuildingOpen] = useState(false);

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
            onClick={() => setHasBuildingOpen(true)}
          >
            hasBuilding
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <HasBuildingModal
        open={hasBuildingOpen}
        setOpen={setHasBuildingOpen}
        name={name}
      />
    </>
  );
}
