import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";

import { supabase } from "./supabase";

export const useCreateEvent = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      const event = await supabase
        .from("events")
        .insert({
          name: new Date().toLocaleString(),
          description: "[]",
          organizerName: "",
          ownersSlug: v4(),
          participantsSlug: v4(),
          eventId: v4(),
        })
        .select("*")
        .limit(1)
        .single()
        .throwOnError();
      if (!event.data) {
        throw new Error("Event creation failed");
      }

      return event.data;
    },
  });

  return mutation;
};
