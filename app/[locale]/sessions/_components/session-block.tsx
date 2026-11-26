import { Badge } from "@/components/atoms/badge";
import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  const t = useTranslations("Sessions");

  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Flex align="center" gap="2">
            <Text
              fontWeight="medium"
              color="var(--text-primary)"
              truncate
              minWidth="0"
            >
              {session.title}
            </Text>
            <Box flexShrink="0">
              <Badge variant="secondary">{t(`level.${session.level}`)}</Badge>
            </Box>
          </Flex>
          <Text color="var(--text-muted)" truncate>
            {session.startTime} · {session.speaker}
          </Text>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
