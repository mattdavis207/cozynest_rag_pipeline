import {
    Field,
    FieldDescription,
    FieldLabel,
  } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"

export function DocumentIngestion(){

    return (
        <Field>
            <FieldLabel htmlFor="document">Document</FieldLabel>
                <Input id="document" type="file" />
            <FieldDescription>Select a document to upload. (csv, pdf, txt)</FieldDescription>
        </Field>
    );
}