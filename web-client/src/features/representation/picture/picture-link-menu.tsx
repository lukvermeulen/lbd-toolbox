import { ActionIcon, Menu } from "@mantine/core";
import { IconArrowMoveRight, IconLine } from "@tabler/icons";
import { useState } from "react";
import { NewPictureVersionModal } from "./new-picture-version-modal";

type PictureLinkMenuProps = { name: string };

export function PictureLinkMenu({ name }: PictureLinkMenuProps) {
  const [showNewPicture, setShowNewPicture] = useState(false);

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
            onClick={() => setShowNewPicture(true)}
          >
            new version
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <NewPictureVersionModal
        name={name}
        open={showNewPicture}
        setOpen={setShowNewPicture}
      />
    </>
  );
}
