import { Modal } from "~/components/modal/modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";
import { HasStoreyForm, HasStoreyFormValues } from "./has-storey-form";

type HasStoreyModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
};

export function HasStoreyModal({ open, setOpen, name }: HasStoreyModalProps) {
  const storeys = trpc.topology.storey.list.useQuery();
  const hasStoreyMutation = trpc.topology.storey.hasStorey.useMutation({
    onSuccess: storeys.refetch,
  });

  function submitFormValues(values: HasStoreyFormValues) {
    values.storeyName.forEach((storey) => {
      hasStoreyMutation.mutate({ name: name, storeyName: storey });
    });
    setOpen(false);
  }

  if (!storeys.data) {
    return <></>;
  }

  const storeyList = storeys.data?.map((storey) => {
    const { id, displayName } = splitIriToIdAndName(storey);
    return { value: id, label: displayName };
  });

  return (
    <Modal open={open} setOpen={setOpen} title="Add bot:hasStorey link">
      <HasStoreyForm data={storeyList} submitFormValues={submitFormValues} />
    </Modal>
  );
}
