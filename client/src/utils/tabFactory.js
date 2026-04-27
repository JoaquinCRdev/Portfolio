const sectionTabs = {
  account: {
    id: 'account-readme',
    title: 'README.md',
    kind: 'readme',
    section: 'account',
  },
  about: {
    id: 'about-readme',
    title: 'about.md',
    kind: 'about',
    section: 'about',
  },
  projects: {
    id: 'projects-overview',
    title: 'projects.md',
    kind: 'projectsOverview',
    section: 'projects',
  },
  experience: {
    id: 'experience-overview',
    title: 'experience.md',
    kind: 'experience',
    section: 'experience',
  },
  github: {
    id: 'github-overview',
    title: 'github.md',
    kind: 'github',
    section: 'github',
  },
  skills: {
    id: 'skills-overview',
    title: 'skills.md',
    kind: 'skills',
    section: 'skills',
  },
  settings: {
    id: 'settings-overview',
    title: 'settings.json',
    kind: 'settings',
    section: 'settings',
  },
};

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