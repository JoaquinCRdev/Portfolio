export const createSectionTab = (sectionId) => {
  return sectionTabs[sectionId] ? { ...sectionTabs[sectionId] } : null;
};

export const createTabById = (tabId) => {
  const tab = Object.values(sectionTabs).find((item) => item.id === tabId);
  return tab ? { ...tab } : null;
};

export const createProjectTab = (project, kind, fileName = '') => {
  const suffix =
    kind === 'projectReadme'
      ? 'readme'
      : kind === 'projectImage'
      ? fileName.replace(/\./g, '-')
      : 'detail';

  const titles = {
    projectReadme: 'README.md',
    projectImage: fileName || 'image.png',
    projectDetail: `${project.slug}.md`,
  };

  return {
    id: `${project.id}-${suffix}`,
    title: titles[kind] || `${project.slug}.md`,
    kind,
    section: 'projects',
    projectId: project.id,
    fileName,
  };
};