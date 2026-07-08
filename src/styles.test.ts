import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync("src/styles.css", "utf8");

describe("portfolio layout styles", () => {
  it("keeps the simplified hero compact", () => {
    expect(styles).toContain("min-height: 112px;");
  });

  it("uses a shorter cover slot while placeholder images are missing", () => {
    expect(styles).toContain("aspect-ratio: 5 / 2;");
  });

  it("keeps long project tech tags inside card bounds", () => {
    expect(styles).toContain("text-overflow: ellipsis;");
    expect(styles).toContain("white-space: nowrap;");
  });
});
