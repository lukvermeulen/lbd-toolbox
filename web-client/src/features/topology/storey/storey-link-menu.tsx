import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";
import { useState } from "react";
import { HasSpaceModal } from "../space/has-space-modal";

type StoreyLinkMenuProps = { name: string };

export function StoreyLinkMenu({ name }: StoreyLinkMenuProps) {
  const [hasSpaceOpen, setHasSpaceOpen] = useState(false);

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
            onClick={() => setHasSpaceOpen(true)}
          >
            hasSpace
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <HasSpaceModal
        open={hasSpaceOpen}
        setOpen={setHasSpaceOpen}
        name={name}
      />
    </>
  );
}
