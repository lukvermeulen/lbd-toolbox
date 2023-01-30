import { Drawer } from "~/components/drawer/drawer";
import { Stack, Table, Text, Title, Image, Tooltip } from "@mantine/core";
import { trpc } from "~/utils/trpc";
import { splitIriToIdAndName } from "~/utils/formatting";

type InfoDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  elementInfo: {
    displayName: string;
    name: string;
  };
  properties?: {
    [key: string]: string;
  };
};

export function InfoDrawer({
  open,
  setOpen,
  elementInfo,
  properties,
}: InfoDrawerProps) {
  const previousRepresentations = trpc.representation.listPrevious.useQuery({
    name: elementInfo.name,
  });

  return (
    <Drawer open={open} setOpen={setOpen} title="Information">
      <Stack>
        <Title order={2}>{elementInfo.displayName}</Title>
        <Text>Properties: </Text>
        <Text>IRI: {elementInfo.name}</Text>
        {properties &&
          Object.keys(properties).map((key, index) => (
            <Text key={index}>
              {key}: {properties[key]}
            </Text>
          ))}
        <Text>Versions:</Text>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Representation</th>
            </tr>
          </thead>
          <tbody>
            {previousRepresentations &&
              previousRepresentations.data?.map((representation) => (
                <tr key={representation.name}>
                  <td>
                    <Text
                      fw={
                        representation.name === elementInfo.name
                          ? 500
                          : undefined
                      }
                    >
                      {splitIriToIdAndName(representation.name).displayName}
                    </Text>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(representation.date))}
                  </td>
                  <td>
                    {representation.pictureUrl ? (
                      <Tooltip label={representation.fileUrl} withinPortal>
                        <Image src={representation.pictureUrl} height={100} />
                      </Tooltip>
                    ) : (
                      <Tooltip label={representation.fileUrl} withinPortal>
                        <Text>File</Text>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Stack>
    </Drawer>
  );
}
