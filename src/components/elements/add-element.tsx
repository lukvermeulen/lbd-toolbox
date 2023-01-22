import { AspectRatio, Button, Card } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

type AddElementProps = {
  action?: () => void;
};

export function AddElement({ action }: AddElementProps) {
  return (
    <Card>
      <AspectRatio ratio={5 / 3} sx={{ maxWidth: 300 }} mx="auto">
        <Button variant="outline" onClick={action}>
          <IconPlus />
        </Button>
      </AspectRatio>
    </Card>
  );
}
