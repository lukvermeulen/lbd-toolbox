import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const result = trpc.post.greeting.useQuery({ name: "'trpc client' s" });
  const user = trpc.healthcheck.useQuery();

  if (!result.data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{result.data.text}</h1>
      <h1>{result.data.message}</h1>
      <h1>User: {user.data}</h1>
    </div>
  );
}
