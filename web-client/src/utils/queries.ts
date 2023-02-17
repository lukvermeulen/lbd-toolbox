export const queryPresets: { [key: string]: string } = {
  basicSelect: `
    PREFIX : <http://example.org/>
    SELECT ?s ?p ?o WHERE {
        ?s ?p ?o
    }
    ORDER BY DESC(?s)
    `,
};
