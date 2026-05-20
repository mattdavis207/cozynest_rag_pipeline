"use client"

import { DocumentIngestion } from "@/components/admin/document-ingestion";
import { useState } from "react";

export default function AdminPage() {

  const [refreshKey, setRefreshKey] = useState(0);

  // rerenders all components on ingestion
  function refreshAdminData(){
    setRefreshKey((key) => key + 1);
  }

  return (
    <main>
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="mt-2 text-muted-foreground">
        TODO: Add document management after you create the Supabase schema.
      </p>

      <DocumentIngestion onIngested={refreshAdminData}/>

    </main>
  );
}
