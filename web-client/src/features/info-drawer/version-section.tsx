import { Table, Text, Tooltip, Image } from "@mantine/core";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";

type VersionSectionProps = {
  elementInfo: {
    displayName: string;
    name: string;
  };
};

export function VersionSection({ elementInfo }: VersionSectionProps) {
  const previousRepresentations = trpc.representation.listPrevious.useQuery({
    name: elementInfo.name,
  });

  if (
    !previousRepresentations.data ||
    previousRepresentations.data.length < 1
  ) {
    return <></>;
  }

  return (
    <>
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
                      representation.name === elementInfo.name ? 500 : undefined
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
    </>
  );
}
