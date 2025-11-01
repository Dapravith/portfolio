import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService } from '@/services';
import { useProjectsStore } from '@/store';
import type { Project } from '@/types';

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,
  featured: () => [...projectKeys.all, 'featured'] as const,
};

// Get all projects
export function useProjects() {
  const setProjects = useProjectsStore((state) => state.setProjects);

  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: async () => {
      const projects = await projectsService.getAll();
      setProjects(projects);
      return projects;
    },
  });
}

// Get featured projects
export function useFeaturedProjects() {
  return useQuery({
    queryKey: projectKeys.featured(),
    queryFn: () => projectsService.getFeatured(),
  });
}

// Get project by ID
export function useProject(id: number) {
  const setSelectedProject = useProjectsStore((state) => state.setSelectedProject);

  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const project = await projectsService.getById(id);
      setSelectedProject(project);
      return project;
    },
    enabled: !!id,
  });
}

// Create project
export function useCreateProject() {
  const queryClient = useQueryClient();
  const addProject = useProjectsStore((state) => state.addProject);

  return useMutation({
    mutationFn: (data: Omit<Project, 'id'>) => projectsService.create(data),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      addProject(newProject);
    },
  });
}

// Update project
export function useUpdateProject() {
  const queryClient = useQueryClient();
  const updateProject = useProjectsStore((state) => state.updateProject);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) =>
      projectsService.update(id, data),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: projectKeys.detail(updatedProject.id) 
      });
      updateProject(updatedProject.id, updatedProject);
    },
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const deleteProject = useProjectsStore((state) => state.deleteProject);

  return useMutation({
    mutationFn: (id: number) => projectsService.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      deleteProject(deletedId);
    },
  });
}
