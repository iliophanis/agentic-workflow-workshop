import { beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/en.json";
import { fetchSessions } from "@/services/sessions";
import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SpeakersPage from "./page";

vi.mock("@/services/sessions", () => ({ fetchSessions: vi.fn() }));
vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
  getTranslations: async () => (key: keyof typeof messages.Speakers) =>
    messages.Speakers[key],
}));

function session(overrides: Partial<Session>): Session {
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

async function renderPage() {
  render(await SpeakersPage({ params: Promise.resolve({ locale: "en" }) }));
}

describe("SpeakersPage", () => {
  beforeEach(() => {
    vi.mocked(fetchSessions).mockReset();
  });

  it("shows one card per speaker, sorted by name, without the panel", async () => {
    vi.mocked(fetchSessions).mockResolvedValue([
      session({ id: "b", speaker: "Ben" }),
      session({ id: "a", speaker: "Ana" }),
      session({ id: "panel", speaker: "Full speaker lineup" }),
    ]);

    await renderPage();

    expect(
      screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent),
    ).toEqual(["Ana", "Ben"]);
    expect(screen.queryByText("Full speaker lineup")).not.toBeInTheDocument();
  });

  it("shows an empty message when there are no speakers", async () => {
    vi.mocked(fetchSessions).mockResolvedValue([]);

    await renderPage();

    expect(screen.getByText(messages.Speakers.empty)).toBeInTheDocument();
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
  });
});
