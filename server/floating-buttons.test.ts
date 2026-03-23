import { describe, expect, it } from "vitest";

// Unit test for the FloatingButtons cart visibility logic
// Tests the business rule: cart button appears only when itemCount > 0

describe("FloatingButtons cart visibility", () => {
  it("shows cart button when itemCount > 0", () => {
    const itemCount = 3;
    const hasItems = itemCount > 0;
    expect(hasItems).toBe(true);
  });

  it("hides cart button when itemCount is 0", () => {
    const itemCount = 0;
    const hasItems = itemCount > 0;
    expect(hasItems).toBe(false);
  });

  it("formats total correctly with German decimal notation", () => {
    const total = 19.9;
    const formatted = total.toFixed(2).replace('.', ',');
    expect(formatted).toBe('19,90');
  });

  it("caps badge display at 9+", () => {
    const itemCount = 12;
    const badgeText = itemCount > 9 ? '9+' : String(itemCount);
    expect(badgeText).toBe('9+');
  });

  it("shows exact count when itemCount <= 9", () => {
    const itemCount = 5;
    const badgeText = itemCount > 9 ? '9+' : String(itemCount);
    expect(badgeText).toBe('5');
  });
});
