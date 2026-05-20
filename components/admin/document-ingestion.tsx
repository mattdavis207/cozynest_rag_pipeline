"use client"

import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { useState } from "react";
import { UploadCloud } from "lucide-react";

type DocumentIngestionProps = {
    onIngested: () => void;
};

export function DocumentIngestion({ onIngested }: DocumentIngestionProps){

    const [files, setFiles]= useState<File[]>([]);
    const [isImporting, setIsImporting] = useState(false);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
        const selectedFiles = Array.from(event.target.files ?? []);
        setFiles(selectedFiles);
    }

    async function handleImport() {
        if (files.length===0){
            return;
        }

        setIsImporting(true);

        try {
            const formData = new FormData();

            for (const file of files){
                formData.append("files", file);
            }

            const response = await fetch("/api/ingest", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result.status);
            
            setFiles([]);
            onIngested();

        } catch (err){
            console.error('Error:', err);
        } finally {
            setIsImporting(false);
        }
    }

    return (
        <div className="space-y-4">
            <Field>
                <FieldLabel htmlFor="document">Document</FieldLabel>
                    <Input id="document" type="file" multiple accept=".csv,.pdf,.txt" onChange={handleFileChange}/>
                <FieldDescription>Select documents to upload. (csv, pdf, txt)</FieldDescription>
            </Field>

            {/* List inputted files */}
            {files.length > 0 && (
                <ul className="text-sm text-muted-foreground">
                {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>{file.name}</li>
                ))}
                </ul>
            )}

            <Button
                type="button"
                onClick={handleImport}
                disabled={files.length === 0 || isImporting}
                className="h-10 gap-2 rounded-md bg-[#00a99d] px-4 text-sm font-semibold text-white shadow-sm shadow-[#003057]/10 hover:bg-[#008f88] focus-visible:ring-[#00a99d]/40 disabled:bg-[#7fbfba]"
            >
                <UploadCloud className="size-4" aria-hidden="true" />
                {isImporting ? "Importing..." : "Import Data"}
            </Button>
        </div>
        

    );
}
