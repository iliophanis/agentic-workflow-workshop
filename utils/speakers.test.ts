import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker, PANEL_SPEAKER } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("gives one speaker all of their sessions", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "one", speaker: "Ana" }),
      session({ id: "two", speaker: "Ben" }),
      session({ id: "three", speaker: "Ana" }),
    ]);

    const ana = speakers.find((speaker) => speaker.name === "Ana");
    expect(ana?.sessions.map((s) => s.id)).toEqual(["one", "three"]);
    expect(speakers).toHaveLength(2);
  });

  it("sorts speakers by name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ speaker: "Sofia" }),
      session({ speaker: "Diego" }),
      session({ speaker: "Marta" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego",
      "Marta",
      "Sofia",
    ]);
  });

  it("orders each speaker's sessions by start time", () => {
    const [speaker] = groupSessionsBySpeaker([
      session({ id: "late", speaker: "Ana", startTime: "15:00" }),
      session({ id: "early", speaker: "Ana", startTime: "09:00" }),
    ]);

    expect(speaker.sessions.map((s) => s.id)).toEqual(["early", "late"]);
  });

  it("leaves out the closing panel's placeholder speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({ speaker: "Ana" }),
      session({ speaker: PANEL_SPEAKER }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual(["Ana"]);
  });

  it("does not change the sessions it is given", () => {
    const sessions = [
      session({ id: "late", speaker: "Ana", startTime: "15:00" }),
      session({ id: "early", speaker: "Ana", startTime: "09:00" }),
    ];

    groupSessionsBySpeaker(sessions);

    expect(sessions.map((s) => s.id)).toEqual(["late", "early"]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
