import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex, Grid, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type SpeakersPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: SpeakersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Speakers" });

  return { title: t("title"), description: t("description") };
}

export default async function SpeakersPage({ params }: SpeakersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Speakers");
  const speakers = groupSessionsBySpeaker(await fetchSessions());

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      {speakers.length === 0 ? (
        <Text color="var(--text-muted)">{t("empty")}</Text>
      ) : (
        <Grid gap="4" templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}>
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </Grid>
      )}
    </Flex>
  );
}
