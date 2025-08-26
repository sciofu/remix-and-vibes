import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

let localCharacters = [];

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const species = formData.get("species");
  const status = formData.get("status");
  const gender = formData.get("gender");
  const id = localCharacters.length + 10000; // Simulate ID
  const newChar = {
    id,
    name,
    species,
    status,
    gender,
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  };
  localCharacters.push(newChar);
  return redirect(`/characters/${id}`);
}

export async function loader() {
  return null;
}

export default function NewCharacter() {
  const actionData = useActionData();
  return (
    <div>
      <h1>Add New Character (local only)</h1>
      <Form method="post">
        <div>
          <label>
            Name: <input name="name" required />
          </label>
        </div>
        <div>
          <label>
            Species: <input name="species" required />
          </label>
        </div>
        <div>
          <label>
            Status: <input name="status" required />
          </label>
        </div>
        <div>
          <label>
            Gender: <input name="gender" required />
          </label>
        </div>
        <button type="submit">Add</button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
    </div>
  );
}
