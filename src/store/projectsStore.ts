import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Project } from '@/types';

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  filters: {
    search: string;
    technologies: string[];
    featured: boolean;
  };
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  setSelectedProject: (project: Project | null) => void;
  setFilters: (filters: Partial<ProjectsState['filters']>) => void;
  clearFilters: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  devtools(
    persist(
      (set) => ({
        projects: [],
        selectedProject: null,
        filters: {
          search: '',
          technologies: [],
          featured: false,
        },

        setProjects: (projects) => set({ projects }),

        addProject: (project) =>
          set((state) => ({
            projects: [...state.projects, project],
          })),

        updateProject: (id, updates) =>
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
          })),

        deleteProject: (id) =>
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
          })),

        setSelectedProject: (project) => set({ selectedProject: project }),

        setFilters: (filters) =>
          set((state) => ({
            filters: { ...state.filters, ...filters },
          })),

        clearFilters: () =>
          set({
            filters: {
              search: '',
              technologies: [],
              featured: false,
            },
          }),
      }),
      {
        name: 'projects-storage',
      }
    ),
    { name: 'ProjectsStore' }
  )
);
