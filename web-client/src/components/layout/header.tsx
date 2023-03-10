import { Group, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();

  return (
    <Group>
      <Text
        href="/"
        component={Link}
        fw={router.pathname === "/" ? 600 : undefined}
      >
        /
      </Text>
      <Text
        href="topology"
        component={Link}
        td={router.pathname === "/topology" ? "underline" : undefined}
      >
        Toplogy
      </Text>
      <Text
        href="representations"
        component={Link}
        td={router.pathname === "/representations" ? "underline" : undefined}
      >
        Representations
      </Text>
      <Text
        href="elements"
        component={Link}
        td={router.pathname === "/elements" ? "underline" : undefined}
      >
        Elements
      </Text>
      <Text
        href="query"
        component={Link}
        td={router.pathname === "/query" ? "underline" : undefined}
        ml="auto"
      >
        Query
      </Text>
    </Group>
  );
}
