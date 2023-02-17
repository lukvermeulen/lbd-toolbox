import { Modal } from "~/components/modal/modal";
import { PointcloudForm, PointcloudFormValues } from "./pointcloud-form";

type PointcloudModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: PointcloudFormValues) => void;
};

export function PointcloudModal({
  open,
  setOpen,
  submitValues,
}: PointcloudModalProps) {
  function submitFormValues(values: PointcloudFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Create point cloud representation"
    >
      <PointcloudForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
