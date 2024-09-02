import { useSuspenseQuery } from "@tanstack/react-query";

import { supabase } from "./supabase";

export const useEvent = (slug: string) => {
  const query = useSuspenseQuery({
    queryKey: ["event", slug],

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
