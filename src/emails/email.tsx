import { styles } from "./_styles";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Section,
  Text,
  Hr,
  Row,
  Column,
  Link,
} from "@react-email/components";
import type { ConfirmationEmailProps } from "./_types";

export default function ConfirmationEmail({
  fullName,
  handle,
  platforms,
  pillar1,
  pillar2,
  pillar3,
  frequency,
  postingDays,
  goal,
  trackerUrl,
  guideUrl,
}: ConfirmationEmailProps) {
  const pillars = [pillar1, pillar2, pillar3].filter(Boolean);

  return (
    <Html>
      <Head />
      <Preview>You&apos;re locked in. Now execute.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.headerLabel}>PROJECT · RELENTLESS</Text>
            <Heading style={styles.headerTitle}>YOU&apos;RE LOCKED IN.</Heading>
            <Text style={styles.headerSub}>Now execute. No excuses.</Text>
          </Section>

          {/* Greeting */}
          <Section style={styles.section}>
            <Text style={styles.body_text}>Hey {fullName},</Text>
            <Text style={styles.body_text}>
              Your Week 0 plan has been received. The guide and your 30-day
              accountability tracker are attached to this email. Read the guide
              before you post a single thing.
            </Text>
          </Section>

          <Hr style={styles.hr} />

          {/* Commitment summary */}
          <Section style={styles.section}>
            <Text style={styles.label}>YOUR COMMITMENT</Text>

            <Row style={styles.row}>
              <Column style={styles.col_left}>
                <Text style={styles.field_label}>Handle</Text>
              </Column>
              <Column style={styles.col_right}>
                <Text style={styles.field_value}>
                  @{handle} · {platforms.join(", ")}
                </Text>
              </Column>
            </Row>

            <Hr style={styles.hr} />

            <Row style={styles.row}>
              <Column style={styles.col_left}>
                <Text style={styles.field_label}>Content Pillars</Text>
              </Column>
              <Column style={styles.col_right}>
                {pillars.map((p) => (
                  <Text key={p} style={styles.field_value}>
                    {p}
                  </Text>
                ))}
              </Column>
            </Row>

            <Hr style={styles.hr} />

            <Row style={styles.row}>
              <Column style={styles.col_left}>
                <Text style={styles.field_label}>Frequency</Text>
              </Column>
              <Column style={styles.col_right}>
                <Text style={styles.field_value}>{frequency} per week</Text>
              </Column>
            </Row>

            <Hr style={styles.hr} />

            <Row style={styles.row}>
              <Column style={styles.col_left}>
                <Text style={styles.field_label}>Posting Days</Text>
              </Column>
              <Column style={styles.col_right}>
                <Text style={styles.field_value}>{postingDays.join(", ")}</Text>
              </Column>
            </Row>

            <Hr style={styles.hr} />

            <Row style={styles.row}>
              <Column style={styles.col_left}>
                <Text style={styles.field_label}>30-Day Goal</Text>
              </Column>
              <Column style={styles.col_right}>
                <Text style={styles.field_value}>{goal}</Text>
              </Column>
            </Row>
          </Section>

          {/*Project Guides*/}
          <Section style={styles.section}>
            <Text style={styles.label}>YOUR TOOLS</Text>
            <Text style={styles.body_text}>
              The 30-day accountability tracker is ready for you:
            </Text>
            <Link href={guideUrl} style={styles.button_outline}>
              Read the Project Guide →
            </Link>
            <Link href={trackerUrl} style={styles.button}>
              Open Accountability Tracker →
            </Link>
          </Section>

          <Hr style={styles.hr} />

          {/* Footer note */}
          <Section style={styles.section}>
            <Text style={styles.body_text}>
              Consistency builds momentum. Momentum builds growth.
            </Text>
            <Text style={styles.body_text}>
              See you on the other side of 30 days.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footer_text}>
              Project Relentless · This email was sent because you signed up.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
