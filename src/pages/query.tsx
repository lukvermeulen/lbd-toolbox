import {
  Space,
  Text,
  Stack,
  Table,
  Tooltip,
  Textarea,
  Group,
  Button,
  Select,
} from "@mantine/core";
import { splitIriToIdAndName } from "~/utils/formatting";
import { useForm } from "@mantine/form";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { queryPresets } from "~/utils/queries";

type ResultElementProps = {
  element: {
    [key: string]:
      | string
      | {
          s: string;
          p: string;
          o: string;
        };
  };
};

export type QueryFormValues = {
  query: string;
};

function ResultElement({ element }: ResultElementProps) {
  return (
    <tr>
      {Object.values(element).map((el) => {
        if (typeof el === "object") {
          return (
            <td>
              <Text>{el.s}</Text>
              <Text>{el.p}</Text>
              <Text>{el.o}</Text>
            </td>
          );
        } else {
          return (
            <td>
              <Text>{el}</Text>
            </td>
          );
        }
      })}
    </tr>
  );
}

export default function QueryPage() {
  const [query, setQuery] = useState<string>(queryPresets["basicSelect"]);

  let headers: string[] = [];

  const results = trpc.query.query.useQuery({ queryString: query });

  console.log(results.data);

  const form = useForm<QueryFormValues>({
    initialValues: {
      query: queryPresets["basicSelect"],
    },
  });

  function submitForm(values: QueryFormValues) {
    setQuery(values.query);
  }

  if (results.data && results.data.length > 0) {
    headers = Object.keys(results.data[0]);
  }

  return (
    <>
      <h1>Query</h1>
      <Text>Write custom queries and display data.</Text>
      <Space h="md" />

      <Select
        label="Representation type"
        placeholder="Representation type"
        defaultValue="basicSelect"
        data={[{ value: "basicSelect", label: "Basic select" }]}
        onChange={(value) => {
          form.setFieldValue("query", queryPresets[value ?? "basicSelect"]);
        }}
      ></Select>

      <form onSubmit={form.onSubmit(submitForm)}>
        <Textarea
          withAsterisk
          required
          label="SPARQL Query"
          placeholder="Query"
          minRows={8}
          {...form.getInputProps("query")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      <Stack>
        <Text>Results:</Text>
        {!results.data && <Text>Loading...</Text>}
        <Table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.data?.map((element, index) => (
              <ResultElement key={index} element={element} />
            ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
}
