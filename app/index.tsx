import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  SwipeFeedScreen, 
  DetailsScreen, 
  HistoryScreen, 
  AdminPostScreen, 
  DonateScreen,
  ProfileScreen,
  PaymentScreen 
} from '../src/screens';
import { BottomNav } from '../src/navigation';
import { Screen, Card, PaymentContext } from '../src/types/Association';
import { mockCards } from '../src/constants/mockData';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);
  const [isAssociation, setIsAssociation] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<Screen>('feed');
  const [paymentContext, setPaymentContext] = useState<PaymentContext | null>(null);

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
      setPreviousScreen(currentScreen);
      setCurrentScreen('details');
    }
  }, [currentScreen]);

  const handleBack = useCallback(() => {
    setCurrentScreen(previousScreen);
    setSelectedCard(undefined);
    setPaymentContext(null);
  }, [previousScreen]);

  const handleDonateToAssociation = useCallback((card: Card) => {
    setPaymentContext({ type: 'association', card });
    setPreviousScreen(currentScreen);
    setCurrentScreen('payment');
  }, [currentScreen]);

  const handleDonateToDevPage = useCallback(() => {
    setPaymentContext({ type: 'developer' });
    setPreviousScreen(currentScreen);
    setCurrentScreen('payment');
  }, [currentScreen]);

  const handlePaymentComplete = useCallback((amount: number) => {
    // Log ou logique future
    console.log('Payment completed:', amount);
    // Retourner à l'écran précédent
    setCurrentScreen(previousScreen);
    setPaymentContext(null);
  }, [previousScreen]);

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
            onDonate={handleDonateToAssociation}
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
          <DonateScreen 
            onSelectAssociation={handleSelectMatch}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            isAssociation={isAssociation}
            onToggleRole={handleToggleRole}
            onDonateToDevPage={handleDonateToDevPage}
          />
        );
      case 'payment':
        if (!paymentContext) return null;
        
        const recipient = paymentContext.type === 'association' 
          ? {
              type: 'association' as const,
              name: paymentContext.card?.associationName || '',
              description: paymentContext.card?.projectTitle || '',
              image: paymentContext.card?.coverImage,
            }
          : {
              type: 'developer' as const,
              name: 'Développement CoeurMatch',
              description: 'Soutenez le développement et l\'amélioration de l\'application',
            };
        
        return (
          <PaymentScreen 
            recipient={recipient}
            onBack={handleBack}
            onPaymentComplete={handlePaymentComplete}
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

  // Don't show BottomNav on details screen and payment screen
  const showBottomNav = currentScreen !== 'details' && currentScreen !== 'payment';

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
