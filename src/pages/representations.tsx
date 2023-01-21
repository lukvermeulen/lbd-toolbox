import { trpc } from "../utils/trpc";

export default function RepresentationsPage() {
  const representation = trpc.representation.greeting.useQuery({ name: "hi" });

  if (!representation.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{representation.data.message}</h1>
    </div>
  );
}
