import { Table, Text, Tooltip, Image, Switch } from "@mantine/core";
import { useState } from "react";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";

type RepresentedBySectionProps = {
  elementInfo: {
    displayName: string;
    name: string;
  };
};

export function RepresentedBySection({
  elementInfo,
}: RepresentedBySectionProps) {
  const [showOnlyNewest, setShowOnlyNewest] = useState(false);

  const representations = trpc.representation.listRepresentations.useQuery({
    name: elementInfo.name,
  });

  if (!representations.data || representations.data.length < 1) {
    return <></>;
  }

  return (
    <>
      <Text>Representations:</Text>

      {/* <Switch
        checked={showOnlyNewest}
        onChange={(event) => setShowOnlyNewest(event.currentTarget.checked)}
        label="Show only newest versions"
      /> */}

      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Representation</th>
          </tr>
        </thead>
        <tbody>
          {representations &&
            representations.data?.map((representation) => (
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
