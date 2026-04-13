export function findProjectById(projects, projectId) {
  return projects.find((project) => project.id === projectId) || null;
}
