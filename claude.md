# Project: CoeurMatch (Tinder for Charitable Causes)

## Status
- Phase: Development - Core Features Complete
- Last Action: Refactored donation system with dev support and association donations
- Last Update: 2026-01-28

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
  - Displays list of matched associations in 2-column grid
  - Each card shows cover image and association name
  - Navigate to DetailsScreen for direct donation
  - Empty state when no matches exist

- [x] **ProfileScreen**: User profile
  - Role toggle (Donor/Association)
  - "Soutenir CoeurMatch" section for developer donations
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

## Version History & Modifications

### Version 1.3 (2026-01-28) - Donation System Refactoring
**PR #4: Refactor donation system - split dev support from association donations**

**Changes:**
- **ProfileScreen**: Added "Soutenir CoeurMatch" section
  - New donation button for development support between Settings and Statistics
  - Shows alert dialog for future dev donation implementation
  - New styles: `supportButton`, `supportContent`, `supportText`, `supportTitle`, `supportDescription`

- **DonateScreen**: Complete refactor from donation form to match list
  - Props changed: `onConfirm?: (amount: number) => void` → `onSelectAssociation: (cardId: string) => void`
  - Displays 2-column grid of matched associations with cover images
  - Each card navigates to DetailsScreen on tap for direct donation
  - Empty state when no matches exist
  - Reduced from 423 to 129 lines

- **app/index.tsx**: Navigation improvements
  - Pass `onSelectAssociation={handleSelectMatch}` to DonateScreen
  - Fix: `handleSelectMatch` now uses `currentScreen` dynamically for correct back navigation

- **SwipeFeedScreen**: Cleanup
  - Removed `showToast()` calls and function
  - Removed unused `Alert` and `Dimensions` imports

**Stats**: +182 additions, -301 deletions, 4 files changed

---

### Version 1.2 (2026-01-27) - Mobile Layout Optimization
**PR #3: Optimize mobile layout - reduce spacing, increase card size, standardize headers**

**Changes:**
- **Card Dimensions**: Optimized for mobile screens
  - Increased card width: 90% → 92% of screen width
  - Card height now height-based: `CARD_WIDTH * 1.4` → `SCREEN_HEIGHT * 0.65`
  - Extracted to shared constants in `colors.ts` with getter functions for orientation support

- **SwipeFeedScreen**: Spacing reductions
  - Header: `paddingTop: xl+lg → lg` (-32px), `paddingVertical: md → sm` (-8px)
  - Logo: 28 → 24, subtitle: 14 → 12
  - Video placeholder: icon 48 → 40, padding `md → sm`
  - Card content: padding `md → sm`, margins `sm → xs` throughout
  - Needs icons: 24 → 20
  - Action buttons: `paddingVertical: lg → md`

- **Header Standardization**: All screens (Donate, Profile, History, AdminPost, Details)
  - `paddingTop: lg` (was `xl+lg`, saves ~32px per screen)
  - `fontSize: 24` (was 28)

- **Additional Optimizations**:
  - DonateScreen: impact section padding `lg → md`, bottom spacer 120 → 100
  - ProfileScreen: avatar section padding `xl → lg`
  - AdminPostScreen: form spacing `lg → md`, image picker padding `xl → lg`

**Result**: ~60-80px vertical space reclaimed per screen, better screen real estate usage

**Stats**: +57 additions, -40 deletions, 8 files changed

---

### Version 1.1 (2026-01-27) - Minor Fix
**Commit**: "supp message swip"
- Removed toast notifications from swipe interactions

---

### Version 1.0 - Initial Development
- Implementation of all core screens with navigation
- Swipe card animation system with Reanimated
- Bottom navigation with 5 tabs
- Mock data for associations and matches
- Complete UI/UX with CoeurMatch branding

## Todo
- [ ] Add actual video player integration
- [ ] Implement image picker for AdminPostScreen
- [ ] Add backend integration for donations (both dev and associations)
- [ ] Add user authentication
- [ ] Persist matches/donations to storage
- [ ] Add push notifications
- [ ] Implement payment gateway for donations

## Notes
- Using state-based navigation (useState) instead of React Navigation
- All screens use consistent CoeurMatch branding
- Swipe gestures use react-native-reanimated for performance
- Mock data includes 5 realistic French associations
- Dual donation system: developer support via ProfileScreen, association donations via DonateScreen