import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";

type SiteLinkMenuProps = {};

export function SiteLinkMenu(props: SiteLinkMenuProps) {
  return (
    <Menu withinPortal position="bottom-start" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconLine size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconArrowMoveRight size={14} />}>
          hasBuilding
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
