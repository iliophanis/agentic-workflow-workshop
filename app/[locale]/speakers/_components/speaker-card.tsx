import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/types/speaker";
import { Flex, Link as ChakraLink, List, Text } from "@chakra-ui/react";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle as="h2" fontSize="lg">
          {speaker.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* role="list": Safari/VoiceOver drop list semantics when list-style is none. */}
        <List.Root role="list" listStyle="none" margin="0" padding="0" gap="3">
          {speaker.sessions.map((session) => (
            <List.Item key={session.id}>
              <ChakraLink
                asChild
                color="var(--text-primary)"
                _hover={{ textDecoration: "underline" }}
                _focusVisible={{ textDecoration: "underline" }}
              >
                <Link href={`/sessions/${session.id}`}>
                  <Flex direction="column" gap="0.5">
                    <Text fontSize="xs" color="var(--text-muted)">
                      {session.startTime}
                    </Text>
                    <Text fontSize="sm">{session.title}</Text>
                  </Flex>
                </Link>
              </ChakraLink>
            </List.Item>
          ))}
        </List.Root>
      </CardContent>
    </Card>
  );
}
