"use client";

import { useFeedApi, type ConnectorCatalogItem } from "@/hooks/use-feed-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ConnectorCard({ connector }: { connector: ConnectorCatalogItem }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{connector.name}</CardTitle>
          <Badge className="bg-zinc-100 dark:bg-zinc-800">
            {connector.kind}
          </Badge>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {connector.description}
        </p>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Configuration Fields
        </p>
        <ul className="space-y-1.5">
          {connector.configFields.map((field) => (
            <li
              key={field.key}
              className="flex items-baseline justify-between rounded-md border border-zinc-100 px-2.5 py-1.5 text-sm dark:border-zinc-800"
            >
              <span className="font-medium">{field.label}</span>
              <span className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{field.type}</span>
                {field.required ? (
                  <Badge className="bg-zinc-100 text-[10px] px-1.5 py-0 dark:bg-zinc-800">
                    required
                  </Badge>
                ) : (
                  <Badge className="text-[10px] px-1.5 py-0">
                    optional
                  </Badge>
                )}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function ConnectorsPage() {
  const { loading, catalog } = useFeedApi();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Connectors</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Browse available input and output connectors. Use these when adding
          sources or outputs.
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800"
            />
          ))}
        </div>
      ) : (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-medium tracking-tight">
              Input Connectors
              <span className="ml-2 text-sm font-normal text-zinc-500">
                ({catalog.inputs.length})
              </span>
            </h2>
            {catalog.inputs.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No input connectors available.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {catalog.inputs.map((connector) => (
                  <ConnectorCard key={connector.id} connector={connector} />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium tracking-tight">
              Output Connectors
              <span className="ml-2 text-sm font-normal text-zinc-500">
                ({catalog.outputs.length})
              </span>
            </h2>
            {catalog.outputs.length === 0 ? (
              <p className="text-sm text-zinc-500">
                No output connectors available.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {catalog.outputs.map((connector) => (
                  <ConnectorCard key={connector.id} connector={connector} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
