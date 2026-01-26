import { Association } from '../types/Association';

export const mockAssociations: Association[] = [
  {
    id: '1',
    name: 'Les Restos du Cœur',
    description: 'Aide alimentaire et insertion sociale pour les personnes en difficulté.',
    category: 'Solidarité',
    imageUrl: 'https://picsum.photos/seed/asso1/400/600',
    memberCount: 73000,
  },
  {
    id: '2',
    name: 'Greenpeace France',
    description: 'Protection de l\'environnement et lutte contre le changement climatique.',
    category: 'Environnement',
    imageUrl: 'https://picsum.photos/seed/asso2/400/600',
    memberCount: 42000,
  },
  {
    id: '3',
    name: 'Médecins Sans Frontières',
    description: 'Aide médicale humanitaire dans les zones de conflit et de catastrophe.',
    category: 'Humanitaire',
    imageUrl: 'https://picsum.photos/seed/asso3/400/600',
    memberCount: 65000,
  },
  {
    id: '4',
    name: 'La Croix-Rouge',
    description: 'Aide aux personnes en situation de vulnérabilité et premiers secours.',
    category: 'Solidarité',
    imageUrl: 'https://picsum.photos/seed/asso4/400/600',
    memberCount: 91000,
  },
  {
    id: '5',
    name: 'WWF France',
    description: 'Conservation de la nature et protection de la biodiversité.',
    category: 'Environnement',
    imageUrl: 'https://picsum.photos/seed/asso5/400/600',
    memberCount: 28000,
  },
];
