import { Container } from "@/components/ui/container";

const steps = [
  {
    n: "01",
    title: "Connect X",
    body: "OAuth 2.0 with X (Twitter) so OffX can post on your behalf. We get tweet-write access only. No DMs, no password.",
  },
  {
    n: "02",
    title: "Verify your phone",
    body: "We send a 6-digit code by SMS. Enter it once, it ties your phone number to your X handle on our end.",
  },
  {
    n: "03",
    title: "Save our number",
    body: "Add `+1 (978) 310-3688` to your contacts as `OffX`. That's the number you text when you want to tweet offline.",
  },
  {
    n: "04",
    title: "Text to tweet",
    body: "Send an SMS with your message, or attach up to 4 photos by MMS. Within seconds it's a tweet on your account, signed `Via @OffXorg`. We reply with the tweet link.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-b border-border py-24">
      <Container>
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            How it works
          </div>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Four steps. That&apos;s the whole thing.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Set it up once, use it forever. No app to keep updated, no account
            to re-login.
          </p>
        </div>

        <ol className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex flex-col gap-4 bg-background p-7"
            >
              <div className="font-mono text-sm text-accent">{s.n}</div>
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
