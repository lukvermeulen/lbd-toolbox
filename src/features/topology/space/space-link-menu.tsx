import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";

type SpaceLinkMenuProps = {};

export function SpaceLinkMenu(props: SpaceLinkMenuProps) {
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
          hasElement
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
