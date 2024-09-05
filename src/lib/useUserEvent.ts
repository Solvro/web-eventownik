import { useQuery } from "@tanstack/react-query";

import { supabase } from "./supabase";
import type { Tables } from "./types";

export const useUserEvent = (
  participationSlug: string,
  initialData?: Tables<"events">,
) => {
  const query = useQuery({
    queryKey: ["event-user", participationSlug],
    initialData,
    queryFn: async () => {
      const event = await supabase
        .from("events")
        .select("*")
        .eq("participantsSlug", participationSlug)
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
