"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, X } from "lucide-react";

const DISMISS_KEY = "security-banner-dismissed";

export function SecurityBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    fetch("/api/security-status")
      .then((res) => res.json() as Promise<{ protected: boolean }>)
      .then((data) => {
        if (!data.protected) setVisible(true);
      })
      .catch(() => {});
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  return (
    <div className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200">
      <div className="mx-auto flex max-w-5xl items-start gap-3">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1">
          <p className="font-medium">This instance is publicly accessible</p>
          <p className="mt-0.5 text-amber-800 dark:text-amber-300">
            Your data is safe, but anyone who finds this URL can configure
            sources and push notifications to your devices.{" "}
            <a
              href="https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-public-app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-amber-950 dark:hover:text-amber-100"
            >
              Learn how to secure it with Cloudflare Access&nbsp;&rarr;
            </a>
          </p>
          <button
            onClick={dismiss}
            className="mt-2 text-xs font-medium text-amber-700 underline underline-offset-2 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200"
          >
            Don&apos;t show this again — I know what I&apos;m doing
          </button>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="rounded p-0.5 text-amber-600 hover:bg-amber-100 hover:text-amber-800 dark:text-amber-400 dark:hover:bg-amber-900 dark:hover:text-amber-200"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
