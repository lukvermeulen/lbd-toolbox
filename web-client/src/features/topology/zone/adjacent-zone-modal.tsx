import { useEffect } from "react";
import { Modal } from "~/components/modal/modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";
import { AdjacentZoneForm, AdjacentZoneFormValues } from "./adjacent-zone-form";

type AdjacentZoneModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
};

export function AdjacentZoneModal({
  open,
  setOpen,
  name,
}: AdjacentZoneModalProps) {
  const zones = trpc.topology.zone.list.useQuery();
  const adjacentZone = trpc.topology.zone.adjacentZone.useMutation({
    onSuccess: zones.refetch,
  });

  function submitFormValues(values: AdjacentZoneFormValues) {
    values.zoneName.forEach((zone) => {
      adjacentZone.mutate({ name: name, zoneName: zone });
    });
    setOpen(false);
  }

  useEffect(() => {
    zones.refetch();
  }, [open]);

  if (!zones.data) {
    return <></>;
  }

  const zoneList = zones.data?.map((zone) => {
    const { displayName } = splitIriToIdAndName(zone);
    return { value: zone, label: displayName };
  });

  return (
    <Modal open={open} setOpen={setOpen} title="Add bot:adjacentZone link">
      <AdjacentZoneForm data={zoneList} submitFormValues={submitFormValues} />
    </Modal>
  );
}
