import { trpc } from "../utils/trpc";

export default function ElementsPage() {
  const element = trpc.element.greeting.useQuery({ name: "hi" });

  if (!element.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{element.data.message}</h1>
    </div>
  );
}
