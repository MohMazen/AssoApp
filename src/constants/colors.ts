import { Dimensions } from 'react-native';

export const Colors = {
  primary: '#FF6B6B',
  primaryDark: '#EE5A5A',
  secondary: '#4ECDC4',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  white: '#FFFFFF',
  black: '#2D3436',
  text: '#2D3436',
  textSecondary: '#636E72',
  gray: '#636E72',
  lightGray: '#DFE6E9',
  border: '#E0E0E0',
  success: '#00B894',
  error: '#FF7675',
  danger: '#E17055',
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Card dimensions for consistent sizing across components
// Use getter functions to support orientation changes
export const CardDimensions = {
  get SCREEN_WIDTH() {
    return Dimensions.get('window').width;
  },
  get SCREEN_HEIGHT() {
    return Dimensions.get('window').height;
  },
  get CARD_WIDTH() {
    return this.SCREEN_WIDTH * 0.92;
  },
  get CARD_HEIGHT() {
    return this.SCREEN_HEIGHT * 0.65;
  },
  get SWIPE_THRESHOLD() {
    return this.SCREEN_WIDTH * 0.25;
  },
};
