import { ArrowLeft, ArrowRight, Code2, ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildPageLabels,
  filterProjects,
  getDisplayProjects,
  getTotalPages,
  getVisibleProjects,
} from "./data/projectLogic";
import {
  categories,
  projects,
  SHOW_DRAFT_PROJECTS,
  type CategoryFilter,
  type Project,
} from "./data/projects";

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="返回项目作品集首页">
        项目作品集
      </a>
    </header>
  );
}

function PortfolioHero() {
  return (
    <section className="hero" aria-labelledby="portfolio-title">
      <div>
        <p className="eyebrow">精选项目 / 持续更新</p>
        <h1 id="portfolio-title">项目作品集</h1>
      </div>
    </section>
  );
}

type ProjectControlsProps = {
  query: string;
  category: CategoryFilter;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilter) => void;
};

function ProjectControls({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: ProjectControlsProps) {
  return (
    <section className="controls" aria-label="项目筛选">
      <label className="search-field">
        <span className="sr-only">搜索项目、技术栈或关键词</span>
        <Search size={18} strokeWidth={1.8} aria-hidden="true" />
        <input
          aria-label="搜索项目、技术栈或关键词"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="搜索项目、技术栈或关键词"
        />
      </label>

      <div className="category-tabs" role="tablist" aria-label="项目分类">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={category === item}
            className={category === item ? "active" : ""}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <a className="cover-link" href={`/projects/${project.slug}`} aria-label={`查看${project.title}详情`}>
        <ProjectCover project={project} />
      </a>

      <div className="project-body">
        <div className="project-heading">
          <h2>{project.title}</h2>
          <span>{project.category}</span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-tags" aria-label={`${project.title}技术栈`}>
          {project.techStack.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          <a className="case-link" href={`/projects/${project.slug}`}>
            查看详情
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectCover({ project }: { project: Project }) {
  if (project.coverImage) {
    return <img src={project.coverImage} alt={`${project.title}封面`} className="project-cover" />;
  }

  return (
    <div
      className="project-cover project-cover-placeholder"
      role="img"
      aria-label={`${project.title}封面预留位`}
    />
  );
}

function ProjectGrid({ visibleProjects }: { visibleProjects: Project[] }) {
  if (visibleProjects.length === 0) {
    return (
      <div className="empty-state" role="status">
        没有找到匹配项目
      </div>
    );
  }

  return (
    <section className="project-grid" id="projects" aria-label="项目列表">
      {visibleProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}

type ProjectPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function ProjectPagination({ currentPage, totalPages, onPageChange }: ProjectPaginationProps) {
  const pageLabels = buildPageLabels(totalPages);

  return (
    <nav className="pagination" aria-label="项目分页">
      <button
        type="button"
        className="page-arrow"
        aria-label="上一页"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
      </button>
      {pageLabels.map((label, index) => {
        const page = index + 1;
        return (
          <button
            key={label}
            type="button"
            className={currentPage === page ? "active" : ""}
            aria-current={currentPage === page ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {label}
          </button>
        );
      })}
      <button
        type="button"
        className="page-arrow"
        aria-label="下一页"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
      </button>
      <span className="page-count">
        第 {currentPage} / {totalPages} 页
      </span>
    </nav>
  );
}

function PortfolioPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");
  const [currentPage, setCurrentPage] = useState(1);
  const displayProjects = useMemo(
    () => getDisplayProjects(projects, SHOW_DRAFT_PROJECTS),
    [],
  );

  const filteredProjects = useMemo(
    () => filterProjects(displayProjects, query, category),
    [category, displayProjects, query],
  );
  const totalPages = getTotalPages(filteredProjects);
  const safePage = Math.min(currentPage, totalPages);
  const visibleProjects = getVisibleProjects(filteredProjects, safePage);

  function handleQueryChange(value: string) {
    setQuery(value);
    setCurrentPage(1);
  }

  function handleCategoryChange(value: CategoryFilter) {
    setCategory(value);
    setCurrentPage(1);
  }

  return (
    <>
      <SiteHeader />
      <main className="page-shell">
        <PortfolioHero />
        <ProjectControls
          query={query}
          category={category}
          onQueryChange={handleQueryChange}
          onCategoryChange={handleCategoryChange}
        />
        <ProjectGrid visibleProjects={visibleProjects} />
        <ProjectPagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
      <footer className="site-footer">项目持续更新，更多作品正在整理中。</footer>
    </>
  );
}

function ProjectDetailPage({ project }: { project: Project }) {
  return (
    <>
      <SiteHeader />
      <main className="detail-shell">
        <a className="back-link" href="/">
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          返回项目列表
        </a>
        <section className="detail-hero">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            {project.projectUrl || project.githubUrl ? (
              <div className="detail-actions">
                {project.projectUrl ? (
                  <a
                    className="visit-link"
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    上线网站 <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    className="case-link"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub <Code2 size={15} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
          <ProjectCover project={project} />
        </section>

        <section className="case-study" id="case">
          <CaseColumn title="核心功能" list={project.features} />
          <CaseColumn title="技术栈" list={project.techStack} />
        </section>
      </main>
    </>
  );
}

function NotFoundProjectPage() {
  return (
    <>
      <SiteHeader />
      <main className="detail-shell not-found-shell">
        <h1>项目不存在</h1>
        <a className="case-link" href="/">
          返回项目列表
        </a>
      </main>
    </>
  );
}

function CaseColumn({ title, body, list }: { title: string; body?: string; list?: string[] }) {
  return (
    <section className="case-column">
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {list ? (
        <ul>
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function App() {
  const pathname = window.location.pathname;
  const detailMatch = pathname.match(/^\/projects\/([^/]+)$/);
  const displayProjects = getDisplayProjects(projects, SHOW_DRAFT_PROJECTS);

  if (detailMatch) {
    const project = displayProjects.find((item) => item.slug === detailMatch[1]);
    if (project) return <ProjectDetailPage project={project} />;
    return <NotFoundProjectPage />;
  }

  return <PortfolioPage />;
}
