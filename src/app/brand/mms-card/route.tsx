import { ImageResponse } from "next/og";
import { env } from "@/lib/env";

export const runtime = "nodejs";

const MARK_PATHS = [
  "M 531 502 L 527 508 L 529 515 L 532 517 L 540 516 L 543 512 L 543 506 L 537 501 Z",
  "M 502 501 L 497 505 L 496 512 L 501 517 L 507 517 L 511 514 L 512 507 L 508 502 Z",
  "M 562 448 L 536 436 L 509 435 L 485 443 L 470 454 L 459 467 L 451 482 L 448 493 L 447 521 L 451 535 L 460 550 L 458 586 L 461 590 L 469 590 L 493 578 L 509 581 L 537 580 L 560 570 L 578 553 L 590 529 L 592 520 L 592 497 L 584 473 L 575 460 Z M 550 464 L 564 479 L 572 498 L 572 519 L 569 529 L 562 541 L 549 553 L 534 560 L 519 562 L 496 557 L 478 565 L 477 556 L 479 543 L 470 529 L 466 511 L 468 495 L 476 478 L 491 463 L 510 455 L 529 455 Z",
  "M 339 521 L 341 528 L 348 532 L 411 531 L 415 525 L 415 496 L 419 478 L 427 459 L 439 441 L 455 425 L 480 410 L 505 403 L 521 402 L 539 404 L 556 409 L 576 420 L 599 441 L 611 459 L 619 479 L 623 501 L 623 527 L 625 530 L 629 532 L 690 532 L 696 529 L 699 522 L 696 514 L 693 512 L 645 511 L 642 486 L 635 462 L 626 444 L 614 427 L 597 410 L 576 396 L 551 386 L 529 382 L 509 382 L 487 386 L 468 393 L 445 407 L 424 427 L 406 455 L 396 486 L 394 510 L 345 512 Z",
  "M 347 475 L 347 483 L 351 488 L 359 489 L 366 484 L 374 454 L 388 426 L 407 401 L 436 376 L 455 365 L 486 354 L 505 351 L 532 351 L 551 354 L 576 362 L 592 370 L 616 387 L 639 411 L 653 432 L 664 455 L 672 485 L 678 489 L 684 489 L 688 487 L 691 482 L 686 457 L 672 424 L 650 392 L 629 371 L 605 354 L 581 342 L 551 333 L 526 330 L 493 332 L 462 340 L 431 355 L 410 370 L 392 387 L 372 413 L 359 437 Z",
];

function asset(path: string): string {
  return `${env.appUrl.replace(/\/$/, "")}${path}`;
}

function TweetAction({
  svg,
  count,
}: {
  svg: React.ReactElement;
  count?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {svg}
      {count ? <span>{count}</span> : null}
    </div>
  );
}

export async function GET() {
  const iconProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#71717a",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const MessageCircle = (
    <svg {...iconProps}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
  const Repeat2 = (
    <svg {...iconProps}>
      <path d="m2 9 3-3 3 3" />
      <path d="M13 18H7a2 2 0 0 1-2-2V6" />
      <path d="m22 15-3 3-3-3" />
      <path d="M11 6h6a2 2 0 0 1 2 2v10" />
    </svg>
  );
  const Heart = (
    <svg {...iconProps}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
  const Bars = (
    <svg {...iconProps}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
  const Bookmark = (
    <svg {...iconProps}>
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
  const Share = (
    <svg {...iconProps}>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="m16 6-4-4-4 4" />
      <path d="M12 2v13" />
    </svg>
  );
  const MoreDots = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#71717a">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
  const BadgeCheck = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#1d9bf0" />
      <path
        d="M7 12 L10.5 15.5 L17 8.5"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          fontFamily: "Inter, sans-serif",
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.18), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="56" height="40" viewBox="320 310 400 290" fill="none">
            {MARK_PATHS.map((d, i) => (
              <path key={i} d={d} fill="#FDB51C" fillRule="evenodd" />
            ))}
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#F2F2F2" }}>Off</span>
            <span style={{ color: "#FDB51C" }}>X</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 52,
            gap: 72,
            alignItems: "center",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                display: "flex",
                fontSize: 112,
                fontWeight: 700,
                lineHeight: 1,
                color: "#F2F2F2",
                letterSpacing: "-0.05em",
              }}
            >
              Now with
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 112,
                fontWeight: 700,
                lineHeight: 1,
                color: "#FDB51C",
                letterSpacing: "-0.05em",
                marginTop: 4,
              }}
            >
              photos.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#a1a1aa",
                marginTop: 40,
                maxWidth: 560,
                lineHeight: 1.4,
              }}
            >
              Attach up to 4 images to your SMS. We upload them to X and post them on your account.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 32,
                gap: 10,
                fontFamily: "monospace",
                fontSize: 18,
                color: "#71717a",
              }}
            >
              <span>SMS</span>
              <span style={{ color: "#FDB51C" }}>→</span>
              <span>X</span>
              <span>·</span>
              <span>text + 4 images</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 560,
              background: "#141414",
              border: "1px solid #262626",
              borderRadius: 28,
              padding: 22,
            }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/avatars/sara.jpg")}
                width={52}
                height={52}
                alt=""
                style={{ borderRadius: 26 }}
              />
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 20,
                  }}
                >
                  <span style={{ color: "#F2F2F2", fontWeight: 600 }}>Sara</span>
                  {BadgeCheck}
                  <span style={{ color: "#71717a" }}>@sara_m · 1m</span>
                </div>
              </div>
              {MoreDots}
            </div>

            <div
              style={{
                display: "flex",
                color: "#F2F2F2",
                fontSize: 20,
                marginTop: 14,
                lineHeight: 1.4,
              }}
            >
              Street is completely dark. No one on the network.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 14,
                gap: 3,
                borderRadius: 18,
                overflow: "hidden",
                height: 240,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/brand/mock/photo-1.jpg")}
                width={260}
                height={240}
                alt=""
                style={{ objectFit: "cover", flex: 1 }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 3,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/brand/mock/photo-2.jpg")}
                  width={260}
                  height={118}
                  alt=""
                  style={{ objectFit: "cover", flex: 1 }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/brand/mock/photo-3.jpg")}
                  width={260}
                  height={118}
                  alt=""
                  style={{ objectFit: "cover", flex: 1 }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                color: "#71717a",
                fontSize: 18,
                marginTop: 14,
              }}
            >
              Via @OffXorg
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 14,
                color: "#71717a",
                fontSize: 15,
              }}
            >
              <TweetAction svg={MessageCircle} count="38" />
              <TweetAction svg={Repeat2} count="142" />
              <TweetAction svg={Heart} count="1.2k" />
              <TweetAction svg={Bars} count="24k" />
              <div style={{ display: "flex", gap: 14 }}>
                {Bookmark}
                {Share}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>offlinex.org</div>
          <div style={{ display: "flex" }}>Text to post. Photos now included.</div>
        </div>
      </div>
    ),
    { width: 1600, height: 900 },
  );
}
