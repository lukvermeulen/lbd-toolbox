import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";

type StoreyLinkMenuProps = {};

export function StoreyLinkMenu(props: StoreyLinkMenuProps) {
  return (
    <Menu withinPortal position="bottom-start" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconLine size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconArrowMoveRight size={14} />}>hasSpace</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
