import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";

type BuildingLinkMenuProps = {};

export function BuildingLinkMenu(props: BuildingLinkMenuProps) {
  return (
    <Menu withinPortal position="bottom-start" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconLine size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconArrowMoveRight size={14} />}>hasStorey</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
