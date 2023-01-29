import { useEffect } from "react";
import { Modal } from "~/components/modal/modal";
import { splitIriToIdAndName } from "~/utils/formatting";
import { trpc } from "~/utils/trpc";
import {
  RepresentedByForm,
  RepresentedByFormValues,
} from "./represented-by-form";

type RepresentedByModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
};

export function RepresentedByModal({
  open,
  setOpen,
  name,
}: RepresentedByModalProps) {
  const pictures = trpc.representation.picture.list.useQuery();
  const meshes = trpc.representation.mesh.list.useQuery();
  const breps = trpc.representation.brep.list.useQuery();
  const pointclouds = trpc.representation.pointcloud.list.useQuery();
  const plans = trpc.representation.plan.list.useQuery();

  const representedByMutation = trpc.representation.representedBy.useMutation();

  function submitFormValues(values: RepresentedByFormValues) {
    values.representationName.forEach((space) => {
      representedByMutation.mutate({
        element: name,
        representation: space,
        active: values.active,
      });
    });
    setOpen(false);
  }

  useEffect(() => {
    pictures.refetch();
    meshes.refetch();
    breps.refetch();
    pointclouds.refetch();
    plans.refetch();
  }, [open]);

  if (!pictures.data) {
    return <></>;
  }

  const representations = {
    picture: pictures.data?.map(({ name }) => {
      const { displayName } = splitIriToIdAndName(name);
      return { value: name, label: displayName };
    }),
    mesh: meshes.data?.map(({ name }) => {
      const { displayName } = splitIriToIdAndName(name);
      return { value: name, label: displayName };
    }),
    brep: breps.data?.map(({ name }) => {
      const { displayName } = splitIriToIdAndName(name);
      return { value: name, label: displayName };
    }),
    pointcloud: pointclouds.data?.map(({ name }) => {
      const { displayName } = splitIriToIdAndName(name);
      return { value: name, label: displayName };
    }),
    plan: plans.data?.map(({ name }) => {
      const { displayName } = splitIriToIdAndName(name);
      return { value: name, label: displayName };
    }),
  };

  console.log(representations);

  return (
    <Modal open={open} setOpen={setOpen} title="Add representedBy link">
      <RepresentedByForm
        data={representations}
        submitFormValues={submitFormValues}
      />
    </Modal>
  );
}
