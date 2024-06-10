import { useQuery } from "@tanstack/react-query";

import { supabase } from "./supabase";
import type { Tables } from "./types";

export const useEvent = (slug: string, initialData?: Tables<"events">) => {
  const query = useQuery({
    queryKey: ["event", slug],
    initialData,
    queryFn: async () => {
      const event = await supabase
        .from("events")
        .select("*")
        .eq("ownersSlug", slug)
        .single()
        .throwOnError();

      if (!event.data) {
        throw new Error("Event not found");
      }

      return event.data;
    },
    refetchInterval: 1000,
  });

  return query;
};
