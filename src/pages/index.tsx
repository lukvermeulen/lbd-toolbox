import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const healthcheck = trpc.healthcheck.useQuery();

  if (!healthcheck.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>API status: {healthcheck.data}</h1>
    </div>
  );
}
