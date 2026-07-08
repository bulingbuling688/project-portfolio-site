import { describe, expect, it } from "vitest";
import {
  PAGE_SIZE,
  buildPageLabels,
  filterProjects,
  getDisplayProjects,
  getTotalPages,
  getVisibleProjects,
  normalizePageAfterFilterChange,
} from "./projectLogic";
import { projects, type Project } from "./projects";

const baseProject: Project = {
  slug: "fixture-project",
  title: "Fixture Project",
  description: "Fixture description",
  category: "跨境电商",
  status: "draft",
  features: ["Fixture feature"],
  techStack: ["Fixture stack"],
};

describe("portfolio project browsing", () => {
  it("filters by title, placeholder description, category, and tech stack", () => {
    expect(filterProjects(projects, "项目 01", "全部").map((project) => project.slug)).toEqual([
      "project-01",
    ]);

    expect(filterProjects(projects, "待补充", "全部")).toHaveLength(projects.length);

    expect(filterProjects(projects, "占位技术", "全部").every((project) => {
      return [
        project.title,
        project.description,
        project.category,
        ...project.techStack,
      ].join(" ").includes("占位技术");
    })).toBe(true);
  });

  it("filters projects by category before pagination", () => {
    const crossBorderProjects = filterProjects(projects, "", "跨境电商");

    expect(crossBorderProjects).toHaveLength(9);
    expect(crossBorderProjects.every((project) => project.category === "跨境电商")).toBe(true);
  });

  it("keeps draft projects visible in test mode", () => {
    const fixtureProjects: Project[] = [
      { ...baseProject, slug: "draft-project", status: "draft" },
      { ...baseProject, slug: "published-project", status: "published" },
    ];

    expect(getDisplayProjects(fixtureProjects, true).map((project) => project.slug)).toEqual([
      "draft-project",
      "published-project",
    ]);
  });

  it("hides draft projects in published mode", () => {
    const fixtureProjects: Project[] = [
      { ...baseProject, slug: "draft-project", status: "draft" },
      { ...baseProject, slug: "published-project", status: "published" },
    ];

    expect(getDisplayProjects(fixtureProjects, false).map((project) => project.slug)).toEqual([
      "published-project",
    ]);
  });

  it("keeps each page to nine projects", () => {
    expect(PAGE_SIZE).toBe(9);
    expect(getVisibleProjects(projects, 1)).toHaveLength(9);
    expect(getVisibleProjects(projects, 2)).toHaveLength(9);
    expect(getTotalPages(projects)).toBe(2);
  });

  it("builds Chinese pagination labels from the data-driven page count", () => {
    expect(buildPageLabels(2)).toEqual(["第一页", "第二页"]);
  });

  it("resets to the first page when search or category changes", () => {
    expect(normalizePageAfterFilterChange(2, "跨境电商", "中转站")).toBe(1);
    expect(normalizePageAfterFilterChange(2, "全部", "全部")).toBe(2);
  });
});
