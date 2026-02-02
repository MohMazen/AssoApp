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
export type Screen = 'feed' | 'details' | 'history' | 'admin' | 'profile' | 'donate' | 'payment' | 'login' | 'signup-step1' | 'signup-step2';

// Contexte de paiement
export interface PaymentContext {
  type: 'association' | 'developer';
  card?: Card; // Défini si type === 'association'
}

// Association signup data
export interface AssociationSignupStep1Data {
  associationName: string;
  rnaNumber: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface AssociationAccount {
  id: string;
  associationName: string;
  rnaNumber: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  documents?: string[];
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
