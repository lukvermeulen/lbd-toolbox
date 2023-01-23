import { AspectRatio, Button, Card, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";

type AddElementProps<V> = {
  submitValues: (values: V) => void;
  Modal?: React.ElementType<{
    open: boolean;
    setOpen: (open: boolean) => void;
    submitValues: (values: V) => void;
  }>;
};

export function AddElement<V>({ Modal, submitValues }: AddElementProps<V>) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <AspectRatio ratio={5 / 3} sx={{ maxWidth: 300 }} mx="auto">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <IconPlus />
        </Button>

        {Modal && (
          <Modal open={open} setOpen={setOpen} submitValues={submitValues} />
        )}
      </AspectRatio>
    </Card>
  );
}

export function AddElementList<V>({ Modal, submitValues }: AddElementProps<V>) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <Group position="left">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <IconPlus />
        </Button>

        {Modal && (
          <Modal open={open} setOpen={setOpen} submitValues={submitValues} />
        )}
      </Group>
    </Card>
  );
}
