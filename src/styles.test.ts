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

  it("keeps technology stack previews out of project cards", () => {
    expect(styles).not.toContain(".project-tags");
  });

  it("keeps expanded categories and long project titles within mobile cards", () => {
    expect(styles).toContain("width: min(calc(100% - 32px), 1224px);");
    expect(styles).toContain(
      ".category-tabs {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));",
    );
    expect(styles).toContain("padding: 0 10px;");
    expect(styles).toContain("flex-wrap: wrap;");
    expect(styles).toContain("overflow-wrap: anywhere;");
  });
});
