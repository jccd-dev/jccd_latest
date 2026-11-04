"use client";

import { useEffect, useState } from "react";

function readManilaClock() {
  const now = new Date();
  const hour = Number(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      hourCycle: "h23",
    }),
  );
  const time = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
  });

  // Working hours are 8 AM to 5 PM. They colour the dot, never a claim about availability.
  return { time: `${time} in the Philippines`, isWorking: hour >= 8 && hour < 17 };
}

// Stays null until mounted so server and client markup match.
function useManilaClock() {
  const [clock, setClock] = useState<ReturnType<
    typeof readManilaClock
  > | null>(null);

  useEffect(() => {
    const update = () => setClock(readManilaClock());
    const first = setTimeout(update);
    const interval = setInterval(update, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return clock;
}

export function AvailabilityStatus() {
  const clock = useManilaClock();

  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span
        aria-hidden="true"
        className={`size-2 rounded-full transition-colors duration-200 ${clock?.isWorking ? "bg-green-500" : "bg-neutral-500"}`}
      />
      {clock?.time ?? "Based in the Philippines"}
    </span>
  );
}

// The full stop in the big headings is green during working hours.
export function AvailabilityStop() {
  const clock = useManilaClock();

  return (
    <span
      className={`transition-colors duration-200 ${clock?.isWorking ? "text-green-600 dark:text-green-500" : "text-neutral-500"}`}
    >
      .
    </span>
  );
}
