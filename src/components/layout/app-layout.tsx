import { Anchor, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container>
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
      <main>{children}</main>
    </Container>
  );
}
