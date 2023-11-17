import { getFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

export default async function BuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const form = await getFormById(Number(id));
  if (!form) {
    throw new Error("form not found");
  }
  return <FormBuilder form={form} />;
}
