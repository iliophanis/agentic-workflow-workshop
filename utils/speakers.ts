import type { Session } from "@/types/session";
import type { Speaker } from "@/types/speaker";

/**
 * The closing panel is seeded with this in `speaker`. It is a label for "all
 * of the day's speakers", not a person, so it never gets a card.
 */
export const PANEL_SPEAKER = "Full speaker lineup";

/**
 * Groups sessions by speaker. Speakers are sorted by name, and each speaker's
 * sessions by start time. The closing panel's placeholder is left out.
 */
export function groupSessionsBySpeaker(sessions: Session[]): Speaker[] {
  const byName = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === PANEL_SPEAKER) continue;

    const existing = byName.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      byName.set(session.speaker, [session]);
    }
  }

  return Array.from(byName, ([name, speakerSessions]) => ({
    name,
    sessions: [...speakerSessions].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.name.localeCompare(b.name));
}
