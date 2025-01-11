import type { Block } from "./Block";
import type { Reservation } from "./reservation";

export type BlockWithReservations = Block & { reservations: Reservation[] };
