# Project: AssoSwipe (Tinder for Associations)
## Status
- Phase: Development
- Last Action: Initial setup completed

## Tech Stack
- Framework: React Native (Expo) - *Standard pour itération rapide*
- Language: TypeScript
- UI: React Native Reanimated (pour les swipes)

## Project Structure
```
src/
├── components/
│   ├── SwipeCard.tsx      # Card component for associations
│   ├── ActionButtons.tsx  # Like/Dislike buttons
│   └── index.ts
├── screens/
│   ├── HomeScreen.tsx     # Main swipe screen
│   └── index.ts
├── types/
│   ├── Association.ts     # TypeScript interfaces
│   └── index.ts
├── constants/
│   ├── colors.ts          # App color palette
│   ├── mockData.ts        # Mock association data
│   └── index.ts
└── index.ts
app/
├── _layout.tsx            # Root layout with Stack navigator
└── index.tsx              # Entry point → HomeScreen
```

## Todo
- [x] Initialize Expo Project
- [x] Create folder structure (src/components, src/screens, etc.)
- [x] Create Home Screen with basic UI
- [ ] Add swipe gestures with React Native Reanimated
- [ ] Add backend integration
- [ ] Add user authentication
