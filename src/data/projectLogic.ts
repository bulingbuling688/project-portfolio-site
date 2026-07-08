import type { CategoryFilter, Project } from "./projects";

export const PAGE_SIZE = 9;

export function getDisplayProjects(projects: Project[], showDraftProjects: boolean): Project[] {
  if (showDraftProjects) return projects;
  return projects.filter((project) => project.status === "published");
}

export function filterProjects(
  projects: Project[],
  query: string,
  category: CategoryFilter,
): Project[] {
  const keyword = query.trim().toLowerCase();

  return projects
    .filter((project) => category === "全部" || project.category === category)
    .filter((project) => {
      if (!keyword) return true;

      return [
        project.title,
        project.description,
        project.category,
        ...project.features,
        ...project.techStack,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
}

export function getVisibleProjects(projects: Project[], currentPage: number): Project[] {
  const start = (currentPage - 1) * PAGE_SIZE;
  return projects.slice(start, start + PAGE_SIZE);
}

export function buildPageLabels(totalPages: number): string[] {
  return Array.from({ length: totalPages }, (_, index) => {
    if (index === 0) return "第一页";
    if (index === 1) return "第二页";
    if (index === 2) return "第三页";
    return `第 ${index + 1} 页`;
  });
}

export function normalizePageAfterFilterChange(
  currentPage: number,
  previousFilterKey: string,
  nextFilterKey: string,
): number {
  return previousFilterKey === nextFilterKey ? currentPage : 1;
}

export function getTotalPages(projects: Project[]): number {
  return Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
}
