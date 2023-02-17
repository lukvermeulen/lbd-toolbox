import { Container, Space } from "@mantine/core";
import { Footer } from "./footer";
import { Header } from "./header";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container>
      <Space h="md" />
      <Header />
      <main>{children}</main>
      <Space h="xl" />
      <Footer />
      <Space h="md" />
    </Container>
  );
}
