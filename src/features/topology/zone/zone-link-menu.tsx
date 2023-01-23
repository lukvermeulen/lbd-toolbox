import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";

type ZoneLinkMenuProps = {};

export function ZoneLinkMenu(props: ZoneLinkMenuProps) {
  return (
    <Menu withinPortal position="bottom-start" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconLine size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconArrowMoveRight size={14} />}>
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
  );
}
