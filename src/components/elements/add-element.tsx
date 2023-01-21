import { AspectRatio, Button, Card } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

export function AddElement() {
  return (
    <Card>
      <AspectRatio ratio={5 / 3} sx={{ maxWidth: 300 }} mx="auto">
        <Button variant="outline">
          <IconPlus />
        </Button>
      </AspectRatio>
    </Card>
  );
}
