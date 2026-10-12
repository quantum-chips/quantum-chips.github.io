import { Fragment } from "react";

// Headline text that never breaks a hyphenated compound ("quantum-safe") at its
// hyphen — a break there reads as a typo at display sizes. The space before each
// word stays outside the no-wrap span so the line can still break between words.
export default function Headline({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
        </Fragment>
      ))}
    </>
  );
}
