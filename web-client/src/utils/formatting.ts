export function splitIriToIdAndName(iri: string) {
  const [id, ...restName] = iri.split("_");
  const displayName = restName.join("_");
  return { id, displayName };
}
