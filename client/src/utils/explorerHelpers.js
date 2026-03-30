const findProjectById = (projects, projectId) => {
  return projects.find((project) => project.id === projectId) || null;
}

module.exports = {
    findProjectById,
};