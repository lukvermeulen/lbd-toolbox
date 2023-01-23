import { AspectRatio, Button, Card, Flex, Group } from "@mantine/core";
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
      <Flex justify="start" align="center" h="100%">
        <Button variant="outline" onClick={() => setOpen(true)}>
          <IconPlus />
        </Button>

        {Modal && (
          <Modal open={open} setOpen={setOpen} submitValues={submitValues} />
        )}
      </Flex>
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
