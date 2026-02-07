import { useState, useMemo, useEffect } from 'react';
import '@pages/newtab/Newtab.css';

type Project = {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  techStack: string[];
  userStories: string[];
};

const STORAGE_KEY = 'project-pal:projects';

export default function Newtab() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount and listen for changes
  useEffect(() => {
    const loadProjects = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProjectList(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load from localStorage', error);
      }
    };

    loadProjects();

    // Listen for storage changes from popup
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setProjectList(JSON.parse(e.newValue));
        } catch (error) {
          console.error('Failed to parse storage change', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return projectList;
    }
    return projectList.filter((project) =>
      `${project.name} ${project.description}`.toLowerCase().includes(query)
    );
  }, [projectList, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Portfolio Workspace</p>
          <h1 className="text-4xl font-semibold tracking-wide text-gray-100 mt-1">Project Pal</h1>
          <p className="text-gray-400 mt-2">Your portfolio of projects</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 mb-8">
          <input
            className="flex-1 rounded-xl border border-gray-800 bg-gray-950/60 px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search projects..."
          />
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-700 p-12 text-center">
            <p className="text-gray-400">No projects yet. Create one in the extension popup.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-gray-800 bg-gray-950/40 p-4 hover:border-gray-700 transition cursor-pointer"
                onClick={() =>
                  setExpandedProjectId(expandedProjectId === project.id ? null : project.id)
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-100 break-words">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-3">Updated: {project.lastUpdated}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-gray-800 bg-gray-900 px-2 py-1 text-[10px] font-medium text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* User Stories Preview */}
                {project.userStories.length > 0 && (
                  <div className="mb-3 text-xs text-gray-400">
                    <p className="font-semibold mb-1">{project.userStories.length} user stories</p>
                    <p className="line-clamp-1">{project.userStories[0]}</p>
                  </div>
                )}

                {/* Expanded Details */}
                {expandedProjectId === project.id && (
                  <div className="border-t border-gray-800 pt-3 mt-3 text-sm text-gray-300">
                    {project.userStories.length > 0 && (
                      <div>
                        <p className="font-semibold text-gray-200 uppercase text-xs tracking-wider mb-2">User Stories</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          {project.userStories.map((story) => (
                            <li key={story} className="text-gray-400">
                              {story}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Info hint */}
                <div className="mt-3 text-center text-xs text-gray-500">
                  {expandedProjectId === project.id ? 'Click to collapse' : 'Click to expand'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
