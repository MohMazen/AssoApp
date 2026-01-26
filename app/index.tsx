import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  SwipeFeedScreen, 
  DetailsScreen, 
  HistoryScreen, 
  AdminPostScreen, 
  DonateScreen,
  ProfileScreen 
} from '../src/screens';
import { BottomNav } from '../src/navigation';
import { Screen, Card } from '../src/types/Association';
import { mockCards } from '../src/constants/mockData';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);
  const [isAssociation, setIsAssociation] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<Screen>('feed');

  const handleNavigate = useCallback((screen: Screen) => {
    if (screen !== 'details') {
      setPreviousScreen(currentScreen);
    }
    setCurrentScreen(screen);
  }, [currentScreen]);

  const handleInfo = useCallback((card: Card) => {
    setSelectedCard(card);
    setPreviousScreen(currentScreen);
    setCurrentScreen('details');
  }, [currentScreen]);

  const handleSelectMatch = useCallback((cardId: string) => {
    const card = mockCards.find(c => c.id === cardId);
    if (card) {
      setSelectedCard(card);
      setPreviousScreen('history');
      setCurrentScreen('details');
    }
  }, []);

  const handleBack = useCallback(() => {
    setCurrentScreen(previousScreen);
    setSelectedCard(undefined);
  }, [previousScreen]);

  const handleDonate = useCallback(() => {
    setCurrentScreen('donate');
  }, []);

  const handleToggleRole = useCallback(() => {
    setIsAssociation(prev => !prev);
  }, []);

  const handlePublish = useCallback(() => {
    setCurrentScreen('feed');
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'feed':
        return (
          <SwipeFeedScreen 
            onInfo={handleInfo}
          />
        );
      case 'details':
        return (
          <DetailsScreen 
            card={selectedCard}
            onBack={handleBack}
            onDonate={handleDonate}
          />
        );
      case 'history':
        return (
          <HistoryScreen 
            onSelectMatch={handleSelectMatch}
          />
        );
      case 'admin':
        return (
          <AdminPostScreen 
            onPublish={handlePublish}
          />
        );
      case 'donate':
        return (
          <DonateScreen />
        );
      case 'profile':
        return (
          <ProfileScreen 
            isAssociation={isAssociation}
            onToggleRole={handleToggleRole}
          />
        );
      default:
        return (
          <SwipeFeedScreen 
            onInfo={handleInfo}
          />
        );
    }
  };

  // Don't show BottomNav on details screen
  const showBottomNav = currentScreen !== 'details';

  return (
    <View style={styles.container}>
      {renderScreen()}
      {showBottomNav && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          isAssociation={isAssociation}
          onToggleRole={handleToggleRole}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
