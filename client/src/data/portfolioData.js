export const portfolioData = {
  profile: {
    name: 'Joaquín Cáceres Rodriguez',
    role: 'Fullstack Developer',
    tagline: 'Construyendo experiencias digitales con código limpio y diseño cuidado.',
    location: 'Argentina',
    availability: 'Disponible para nuevos proyectos',
    email: 'jcacerestech@gmail.com',
    github: 'JoaquinCRdev',
    website: 'http://localhost:5173',
  },
  about: {
    headline: 'Hola, soy Joaquín Cáceres Rodriguez.',
    intro:
      'Este es un portfolio simple inspirado en la estetica del editor de código Visual Studio Code. Disfruta de lo simple :)',
    bullets: [
      'Desarrollador con enfoque en interfaces limpias y experiencias intuitivas.',
      'Apasionado por la organización visual y la atención al detalle.',
      'Siempre buscando aprender nuevas tecnologías y mejorar mis habilidades.',
      'Me encanta colaborar en proyectos que desafíen mi creatividad y capacidad de resolución de problemas.',
    ],
  },
  experience: [
    {
      company: 'Municipalidad de Benito Juarez',
      role: 'Desarrollador Fullstack y Product Owner',
      period: '2026 - Presente',
      summary: 'Trabajo en proyectos de implementación para el municipio',
      achievements: [
        'Lideré el desarrollo de un sistema de gestión de trámites digitales, mejorando la eficiencia en un 30%.',
        'Implementé un panel de control para monitorear el rendimiento de los servicios municipales, facilitando la toma de decisiones basada en datos.',
        'Colaboré con equipos multidisciplinarios para diseñar soluciones que mejoren la experiencia del ciudadano.',
      ],
    },
  ],
  github: {
    username: 'JoaquinCRdev',
    bio: 'Desarrollador apasionado por crear experiencias digitales limpias y funcionales.',
    stats: [
      { label: 'Repos públicos', value: '3' },
      { label: 'Lenguaje principal', value: 'JavaScript' },
      { label: 'Contribuciones', value: 'Constantes' },
      { label: 'Especialidad', value: 'Desarrollo Fullstack' },
    ],
    pinned: [
      { name: 'Portfolio', description: 'Portfolio con UI de Visual Studio Code.' },
      { name: 'Restaurant-POS-System', description: 'Sistema POS para restaurantes.' },
    ],
  },
  skills: {
    frontend: ['React', 'Tailwind CSS', 'Redux'],
    backend: ['Node.js', 'Express', 'MongoDB', 'SQL', 'Firebase', 'Superbase', 'Python'],
    tools: ['Git', 'Vite', 'Postman', 'Docker'],
    production: ['AWS', 'Heroku', 'Netlify'],
    soft: ['Comunicación', 'Trabajo en equipo', 'Resolución de problemas', 'Gestión del tiempo'],
  },
  settings: {
    theme: 'dark',
    language: 'Español',
    density: 'comfortable',
    motion: 'normal',
    accent: 'blue',
    keyboardShortcuts: [
      'Ctrl+B para alternar el explorer',
    ],
  },
  projects: [
    {
      id: 'atlas',
      slug: 'atlas-ui',
      name: 'Atlas UI',
      year: '2025',
      status: 'En desarrollo',
      summary: 'Sistema visual de paneles con foco en dashboards y navegación fluida.',
      description:
        'Proyecto modular pensado para mostrar jerarquía, tarjetas de información y una composición limpia en pantalla.',
      stack: ['React', 'Tailwind', 'Redux'],
      metrics: [
        { label: 'Pantallas', value: '8' },
        { label: 'Componentes', value: '24' },
        { label: 'Animación', value: 'Sutil' },
      ],
      colorA: '#0f172a',
      colorB: '#1d4ed8',
    },
    {
        id: 'portfolio',
        slug: 'portfolio-vscode',
        name: 'Portfolio VSCode',
        year: '2026',
        status: 'Completado',
        summary: 'Portfolio personal inspirado en la estética de Visual Studio Code.',
        description: 'Un proyecto que combina diseño minimalista con funcionalidad, mostrando mi experiencia y proyectos de una manera única.',
        stack: ['React', 'Tailwind CSS', 'Redux'],
        metrics: [
            { label: 'Páginas', value: '6' },
            { label: 'Componentes', value: '20' },
            { label: 'Animación', value: 'Sutil' },
        ],
        colorA: '#1e1e1e',
        colorB: '#007acc',
    },
    {
        id: 'restaurant-pos',
        slug: 'restaurant-pos-system',
        name: 'Restaurant POS System',
        year: '2024',
        status: 'Completado',
        summary: 'Sistema de punto de venta para restaurantes, con gestión de pedidos y pagos.',
        description: 'Una aplicación completa para la gestión de restaurantes, desde la toma de pedidos hasta el procesamiento de pagos, diseñada para mejorar la eficiencia operativa.',
        stack: ['Node.js', 'Express', 'MongoDB', 'React'],
        metrics: [
            { label: 'Funcionalidades', value: 'Gestión de pedidos, inventario, reportes' },
            { label: 'Usuarios', value: 'Admin, mesero, cocina' },
            { label: 'Integraciones', value: 'Stripe para pagos' },
        ],
        colorA: '#2d2d2d',
        colorB: '#e06c75',
    }
  ],
};
