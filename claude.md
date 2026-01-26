# Project: CoeurMatch (Tinder for Charitable Causes)

## Status
- Phase: Development - Core Features Complete
- Last Action: Implemented all core screens with navigation

## Tech Stack
- Framework: React Native (Expo) with expo-router
- Language: TypeScript (strict mode)
- UI: React Native Reanimated for swipe animations
- Gesture: react-native-gesture-handler
- Icons: @expo/vector-icons (Ionicons)

## Project Structure
```
src/
├── components/
│   ├── SwipeCard.tsx      # Legacy card component
│   ├── ActionButtons.tsx  # Like/Dislike action buttons
│   └── index.ts
├── screens/
│   ├── SwipeFeedScreen.tsx    # Main swipe screen with animated cards
│   ├── DetailsScreen.tsx      # Association details view
│   ├── HistoryScreen.tsx      # Matches list
│   ├── AdminPostScreen.tsx    # Project posting form (associations)
│   ├── DonateScreen.tsx       # Donation interface
│   ├── ProfileScreen.tsx      # User profile and settings
│   ├── HomeScreen.tsx         # Legacy home screen
│   └── index.ts
├── navigation/
│   ├── BottomNav.tsx          # Bottom navigation with 5 tabs
│   └── index.ts
├── types/
│   ├── Association.ts     # TypeScript interfaces (Card, Match, Need, etc.)
│   └── index.ts
├── constants/
│   ├── colors.ts          # CoeurMatch color palette & theme
│   ├── mockData.ts        # Mock cards and matches data
│   └── index.ts
└── index.ts               # Main exports
app/
├── _layout.tsx            # Root layout with GestureHandler
└── index.tsx              # Entry point with state-based navigation
```

## Features Implemented

### Screens
- [x] **SwipeFeedScreen**: Animated swipe cards with Reanimated
  - Stack of cards with swipe gestures
  - Like/Nope overlays on swipe
  - Needs icons (💰 donations, 🙋 volunteers, 📦 equipment, 👔 employees)
  - Location badge and tags
  - Info button for details
  - Action buttons for like/dislike

- [x] **DetailsScreen**: Full association details
  - Video placeholder (16:9)
  - Description, needs with details
  - Social links grid
  - CTA "Faire un don" button

- [x] **HistoryScreen**: Matches list
  - Mini-cards with image, name, date
  - Donation status badges
  - Navigate to details on tap

- [x] **AdminPostScreen**: Project posting form
  - Form validation
  - Needs selection checkboxes
  - Social links inputs
  - Image picker placeholder

- [x] **DonateScreen**: Donation interface
  - Quick amount buttons (5€, 10€, 20€, 50€, 100€)
  - Custom amount input
  - Featured causes section
  - Impact information

- [x] **ProfileScreen**: User profile
  - Role toggle (Donor/Association)
  - Settings section
  - Statistics display

### Navigation
- [x] **BottomNav**: 5-tab navigation
  - Découvrir (feed)
  - Matchs (history)
  - Poster (admin) - visible only in Association mode
  - Donner (donate)
  - Profil (profile)
- [x] State-based navigation (no React Navigation library)
- [x] BottomNav hidden on Details screen

### Types
- [x] Card interface with all required fields
- [x] Match interface
- [x] Need type ('donations' | 'volunteers' | 'equipment' | 'employees')
- [x] SocialLinks interface
- [x] Screen type for navigation

### Theme
- Primary: #FF6B6B (Coral)
- Secondary: #4ECDC4 (Teal)
- Success: #00B894 (Green)
- Background: #FAFAFA
- Consistent shadows and spacing

## Todo
- [ ] Add actual video player integration
- [ ] Implement image picker for AdminPostScreen
- [ ] Add backend integration
- [ ] Add user authentication
- [ ] Persist matches/donations to storage
- [ ] Add push notifications

## Notes
- Using state-based navigation (useState) instead of React Navigation
- All screens use consistent CoeurMatch branding
- Swipe gestures use react-native-reanimated for performance
- Mock data includes 5 realistic French associations
