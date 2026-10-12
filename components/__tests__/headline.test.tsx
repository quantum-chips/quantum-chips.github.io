import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Headline from "@/components/Headline";

describe("Headline", () => {
  it("keeps a hyphenated word whole but still lets the line break before it", () => {
    const { container } = render(<Headline text="Where quantum-safe chips break." />);
    const nowrap = container.querySelectorAll(".whitespace-nowrap");
    expect(nowrap).toHaveLength(1);
    // The space must sit outside the no-wrap span, or "Where quantum-safe" becomes
    // one unbreakable run that overflows narrow screens.
    expect(nowrap[0].textContent).toBe("quantum-safe");
    expect(container.textContent).toBe("Where quantum-safe chips break.");
  });
});
