import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";

type PictureLinkMenuProps = {};

export function PictureLinkMenu(props: PictureLinkMenuProps) {
  return (
    <Menu withinPortal position="bottom-start" shadow="sm">
      <Menu.Target>
        <ActionIcon>
          <IconLine size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconArrowMoveRight size={14} />}>
          new version
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
