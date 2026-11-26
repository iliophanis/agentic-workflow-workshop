import type { Session } from "./session";

/** A speaker and the sessions they give, in schedule order. */
export interface Speaker {
  name: string;
  sessions: Session[];
}
