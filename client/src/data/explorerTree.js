import { portfolioData } from './portfolioData';

const makeProjectChildren = (project) => [
  {
    id: `${project.id}-readme`,
    label: 'README.md',
    type: 'file',
    action: { kind: 'projectReadme', projectId: project.id },
  },
  {
    id: `${project.id}-logo`,
    label: 'logo.jpg',
    type: 'file',
    action: { kind: 'projectImage', projectId: project.id, fileName: 'logo.jpg' },
  },
  {
    id: `${project.id}-images`,
    label: 'images',
    type: 'folder',
    children: [
      {
        id: `${project.id}-image-1`,
        label: 'hero.png',
        type: 'file',
        action: { kind: 'projectImage', projectId: project.id, fileName: 'hero.png' },
      },
      {
        id: `${project.id}-image-2`,
        label: 'details.png',
        type: 'file',
        action: { kind: 'projectImage', projectId: project.id, fileName: 'details.png' },
      },
    ],
  },
  {
    id: `${project.id}-exe`,
    label: 'app.exe',
    type: 'file',
    action: { kind: 'console', projectId: project.id },
  },
];

export const explorerTree = [
  {
    id: 'root-readme',
    label: 'README.md',
    type: 'file',
    action: { kind: 'section', section: 'account', tabId: 'account-readme' },
  },
  {
    id: 'root-about',
    label: 'about.md',
    type: 'file',
    action: { kind: 'section', section: 'account', tabId: 'account-about' },
  },
  {
    id: 'root-projects',
    label: 'projects.md',
    type: 'file',
    action: { kind: 'section', section: 'projects', tabId: 'projects-overview' },
  },
  {
    id: 'root-experience',
    label: 'experience.md',
    type: 'file',
    action: { kind: 'section', section: 'experience', tabId: 'experience-overview' },
  },
  {
    id: 'root-github',
    label: 'github.md',
    type: 'file',
    action: { kind: 'section', section: 'github', tabId: 'github-overview' },
  },
  {
    id: 'root-skills',
    label: 'skills.md',
    type: 'file',
    action: { kind: 'section', section: 'skills', tabId: 'skills-overview' },
  },
  {
    id: 'root-settings',
    label: 'settings.json',
    type: 'file',
    action: { kind: 'section', section: 'settings', tabId: 'settings-overview' },
  },
  {
    id: 'projects-folder',
    label: 'projects',
    type: 'folder',
    children: portfolioData.projects.map((project) => ({
      id: `folder-${project.id}`,
      label: project.slug,
      type: 'folder',
      children: makeProjectChildren(project),
    })),
  },
];
