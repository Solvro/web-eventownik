import { atomWithStorage } from "jotai/utils";

export const userRegistrationsAtom = atomWithStorage<string[]>(
  "userRegistrations",
  [],
);
