import { useEffect } from "react";
import { Modal } from "~/components/modal/modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";
import { HasBuildingForm, HasBuildingFormValues } from "./has-building-form";

type HasBuildingModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
};

export function HasBuildingModal({
  open,
  setOpen,
  name,
}: HasBuildingModalProps) {
  const buildings = trpc.topology.building.list.useQuery();
  const hasBuildingMutation = trpc.topology.building.hasBuilding.useMutation({
    onSuccess: buildings.refetch,
  });

  function submitFormValues(values: HasBuildingFormValues) {
    values.buildingName.forEach((building) => {
      hasBuildingMutation.mutate({ name: name, buildingName: building });
    });
    setOpen(false);
  }

  useEffect(() => {
    buildings.refetch();
  }, [open]);

  if (!buildings.data) {
    return <></>;
  }

  const spaceList = buildings.data?.map((space) => {
    const { displayName } = splitIriToIdAndName(space);
    return { value: space, label: displayName };
  });

  return (
    <Modal open={open} setOpen={setOpen} title="Add bot:hasSpace link">
      <HasBuildingForm data={spaceList} submitFormValues={submitFormValues} />
    </Modal>
  );
}
