import { useEffect } from "react";
import { Modal } from "~/components/modal/modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";
import { HasSpaceForm, HasSpaceFormValues } from "./has-space-form";

type HasSpaceModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
};

export function HasSpaceModal({ open, setOpen, name }: HasSpaceModalProps) {
  const spaces = trpc.topology.space.list.useQuery();
  const hasSpaceMutation = trpc.topology.space.hasSpace.useMutation({
    onSuccess: spaces.refetch,
  });

  function submitFormValues(values: HasSpaceFormValues) {
    values.spaceName.forEach((space) => {
      hasSpaceMutation.mutate({ name: name, spaceName: space });
    });
    setOpen(false);
  }

  useEffect(() => {
    spaces.refetch();
  }, [open]);

  if (!spaces.data) {
    return <></>;
  }

  const spaceList = spaces.data?.map((space) => {
    const { displayName } = splitIriToIdAndName(space);
    return { value: space, label: displayName };
  });

  return (
    <Modal open={open} setOpen={setOpen} title="Add bot:hasSpace link">
      <HasSpaceForm data={spaceList} submitFormValues={submitFormValues} />
    </Modal>
  );
}
