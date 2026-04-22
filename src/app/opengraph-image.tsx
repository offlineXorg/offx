import { ImageResponse } from "next/og";

export const alt = "OffX · Tweet without internet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "Inter, sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(245, 158, 11, 0.18), transparent 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 38,
            fontWeight: 600,
          }}
        >
          <svg
            width="280"
            height="77"
            viewBox="310 310 1050 290"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 531 502 L 527 508 L 529 515 L 532 517 L 540 516 L 543 512 L 543 506 L 537 501 Z" fill="#FDB51C" fillRule="evenodd" />
            <path d="M 502 501 L 497 505 L 496 512 L 501 517 L 507 517 L 511 514 L 512 507 L 508 502 Z" fill="#FDB51C" fillRule="evenodd" />
            <path d="M 562 448 L 536 436 L 509 435 L 485 443 L 470 454 L 459 467 L 451 482 L 448 493 L 447 521 L 451 535 L 460 550 L 458 586 L 461 590 L 469 590 L 493 578 L 509 581 L 537 580 L 560 570 L 578 553 L 590 529 L 592 520 L 592 497 L 584 473 L 575 460 Z M 550 464 L 564 479 L 572 498 L 572 519 L 569 529 L 562 541 L 549 553 L 534 560 L 519 562 L 496 557 L 478 565 L 477 556 L 479 543 L 470 529 L 466 511 L 468 495 L 476 478 L 491 463 L 510 455 L 529 455 Z" fill="#FDB51C" fillRule="evenodd" />
            <path d="M 1177 390 L 1176 392 L 1236 476 L 1241 486 L 1175 580 L 1211 581 L 1262 510 L 1313 581 L 1348 581 L 1345 574 L 1283 486 L 1348 392 L 1346 390 L 1313 390 L 1310 392 L 1262 460 L 1212 390 Z" fill="#FDB51C" fillRule="evenodd" />
            <path d="M 339 521 L 341 528 L 348 532 L 411 531 L 415 525 L 415 496 L 419 478 L 427 459 L 439 441 L 455 425 L 480 410 L 505 403 L 521 402 L 539 404 L 556 409 L 576 420 L 599 441 L 611 459 L 619 479 L 623 501 L 623 527 L 625 530 L 629 532 L 690 532 L 696 529 L 699 522 L 696 514 L 693 512 L 645 511 L 642 486 L 635 462 L 626 444 L 614 427 L 597 410 L 576 396 L 551 386 L 529 382 L 509 382 L 487 386 L 468 393 L 445 407 L 424 427 L 406 455 L 396 486 L 394 510 L 345 512 Z" fill="#FDB51C" fillRule="evenodd" />
            <path d="M 347 475 L 347 483 L 351 488 L 359 489 L 366 484 L 374 454 L 388 426 L 407 401 L 436 376 L 455 365 L 486 354 L 505 351 L 532 351 L 551 354 L 576 362 L 592 370 L 616 387 L 639 411 L 653 432 L 664 455 L 672 485 L 678 489 L 684 489 L 688 487 L 691 482 L 686 457 L 672 424 L 650 392 L 629 371 L 605 354 L 581 342 L 551 333 L 526 330 L 493 332 L 462 340 L 431 355 L 410 370 L 392 387 L 372 413 L 359 437 Z" fill="#FDB51C" fillRule="evenodd" />
            <path d="M 1153 390 L 1141 388 L 1126 389 L 1108 397 L 1099 407 L 1094 419 L 1093 446 L 1091 448 L 1074 448 L 1072 450 L 1072 472 L 1076 474 L 1091 473 L 1093 475 L 1094 581 L 1120 581 L 1122 579 L 1122 475 L 1133 473 L 1148 474 L 1154 472 L 1153 448 L 1123 448 L 1122 430 L 1126 421 L 1133 416 L 1148 415 L 1155 417 L 1157 415 L 1157 392 Z" fill="#F2F2F2" fillRule="evenodd" />
            <path d="M 1064 390 L 1052 388 L 1037 389 L 1020 396 L 1014 401 L 1007 412 L 1003 428 L 1003 447 L 982 449 L 982 472 L 1003 475 L 1004 581 L 1032 580 L 1032 475 L 1038 473 L 1063 473 L 1063 449 L 1034 448 L 1032 446 L 1032 433 L 1036 422 L 1046 415 L 1068 416 L 1068 392 Z" fill="#F2F2F2" fillRule="evenodd" />
            <path d="M 854 388 L 840 391 L 821 399 L 805 410 L 794 421 L 783 437 L 775 456 L 771 476 L 771 498 L 775 517 L 782 534 L 791 548 L 807 564 L 819 572 L 837 580 L 855 584 L 882 584 L 897 581 L 917 573 L 928 566 L 945 550 L 955 535 L 963 517 L 967 498 L 967 474 L 964 459 L 956 439 L 942 419 L 929 407 L 917 399 L 898 391 L 875 387 Z M 858 417 L 871 416 L 888 419 L 911 431 L 928 451 L 933 462 L 937 481 L 937 491 L 933 510 L 928 521 L 920 532 L 900 548 L 877 555 L 855 554 L 842 550 L 831 544 L 816 530 L 810 521 L 802 500 L 801 481 L 803 468 L 814 445 L 834 426 Z" fill="#F2F2F2" fillRule="evenodd" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.02,
            }}
          >
            <div style={{ display: "flex" }}>Tweet without</div>
            <div style={{ display: "flex", color: "#f59e0b" }}>internet.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: 960,
              lineHeight: 1.35,
            }}
          >
            The first X bridge that posts your tweets over SMS. Built for
            censorship, blackouts, and broken networks.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>offlinex.org</div>
          <div style={{ display: "flex" }}>
            313 shutdowns · 52 countries · 2025
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
