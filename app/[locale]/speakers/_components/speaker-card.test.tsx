import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Speaker } from "@/types/speaker";

import { SpeakerCard } from "./speaker-card";

const speaker: Speaker = {
  name: "Ana Lopez",
  sessions: [
    {
      id: "morning-talk",
      title: "A Morning Talk",
      speaker: "Ana Lopez",
      track: "React",
      room: "Main Hall",
      startTime: "09:00",
      durationMinutes: 45,
      description: "",
    },
    {
      id: "afternoon-talk",
      title: "An Afternoon Talk",
      speaker: "Ana Lopez",
      track: "Architecture",
      room: "Room B",
      startTime: "15:00",
      durationMinutes: 45,
      description: "",
    },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's time and title", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Ana Lopez")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("A Morning Talk")).toBeInTheDocument();
    expect(screen.getByText("15:00")).toBeInTheDocument();
    expect(screen.getByText("An Afternoon Talk")).toBeInTheDocument();
  });

  it("uses the speaker's name as a level 2 heading", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Ana Lopez" }),
    ).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("link", { name: /A Morning Talk/ }),
    ).toHaveAttribute("href", "/en/sessions/morning-talk");
    expect(
      screen.getByRole("link", { name: /An Afternoon Talk/ }),
    ).toHaveAttribute("href", "/en/sessions/afternoon-talk");
  });
});
