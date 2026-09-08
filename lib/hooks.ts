import { useEffect, useState } from "react";

/** Time-of-day greeting, resolved after mount to avoid hydration mismatch. */
export function useGreeting() {
  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);
  return greeting;
}

/** Formatted today date, resolved after mount to avoid hydration mismatch. */
export function useToday() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);
  return today;
}
