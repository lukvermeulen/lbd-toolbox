import { Group, Text } from "@mantine/core";
import Link from "next/link";

export function Header() {
  return (
    <Group>
      <Text href="/" component={Link}>
        /
      </Text>
      <Text href="topology" component={Link}>
        Toplogy
      </Text>
      <Text href="representations" component={Link}>
        Representations
      </Text>
      <Text href="elements" component={Link}>
        Elements
      </Text>
    </Group>
  );
}
