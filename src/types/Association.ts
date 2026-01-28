// Types de besoins
export type Need = 'donations' | 'volunteers' | 'equipment' | 'employees';

// Liens sociaux
export interface SocialLinks {
  website?: string;
  facebook?: string;
  instagram?: string;
  donationPage?: string;
}

// Carte d'association
export interface Card {
  id: string;
  associationName: string;
  projectTitle: string;
  location: string;
  videoUrl: string;
  coverImage: string;
  description: string;
  tags: string[];
  needs: Need[];
  needsDetails?: Record<Need, string>;
  socialLinks: SocialLinks;
  createdAt: string;
}

// Match
export interface Match {
  id: string;
  cardId: string;
  card: Card;
  matchedAt: string;
  donated?: boolean;
  donationAmount?: number;
}

// Écrans de navigation
export type Screen = 'feed' | 'details' | 'history' | 'admin' | 'profile' | 'donate' | 'payment';

// Contexte de paiement
export interface PaymentContext {
  type: 'association' | 'developer';
  card?: Card; // Défini si type === 'association'
}

// Legacy type alias for backwards compatibility
export interface Association {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  memberCount: number;
}
