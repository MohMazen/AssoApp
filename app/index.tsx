import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { 
  SwipeFeedScreen, 
  DetailsScreen, 
  HistoryScreen, 
  AdminPostScreen, 
  DonateScreen,
  ProfileScreen,
  PaymentScreen,
  LoginScreen,
  AssociationSignupStep1Screen,
  AssociationSignupStep2Screen,
} from '../src/screens';
import { BottomNav } from '../src/navigation';
import { Screen, Card, PaymentContext, AssociationSignupStep1Data, AssociationAccount } from '../src/types/Association';
import { mockCards } from '../src/constants/mockData';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [selectedCard, setSelectedCard] = useState<Card | undefined>(undefined);
  const [isAssociation, setIsAssociation] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<Screen>('feed');
  const [paymentContext, setPaymentContext] = useState<PaymentContext | null>(null);
  const [isAssociationLoggedIn, setIsAssociationLoggedIn] = useState(false);
  const [associationAccount, setAssociationAccount] = useState<AssociationAccount | undefined>(undefined);
  const [signupStep1Data, setSignupStep1Data] = useState<AssociationSignupStep1Data | undefined>(undefined);

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
    if (currentScreen === 'payment') {
      // When going back from payment, preserve selectedCard if it exists
      setPaymentContext(null);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen(previousScreen);
      setSelectedCard(undefined);
    }
  }, [previousScreen, currentScreen]);

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
    // Retourner à l'écran précédent
    setCurrentScreen(previousScreen);
    setPaymentContext(null);
  }, [previousScreen]);

  const handleToggleRole = useCallback(() => {
    if (!isAssociation) {
      // Tentative de passer en mode Association
      if (!isAssociationLoggedIn) {
        // Rediriger vers la page de connexion
        setPreviousScreen(currentScreen);
        setCurrentScreen('login');
        return;
      }
    }
    setIsAssociation(prev => !prev);
  }, [isAssociation, isAssociationLoggedIn, currentScreen]);

  const handleLoginSuccess = useCallback(() => {
    // Pour l'instant, créer un compte mock
    const mockAccount: AssociationAccount = {
      id: '1',
      associationName: 'Mon Association',
      rnaNumber: 'W123456789',
      email: 'contact@association.fr',
      phone: '0123456789',
      address: '123 rue de la Paix, 75000 Paris',
      isVerified: false,
    };
    setAssociationAccount(mockAccount);
    setIsAssociationLoggedIn(true);
    setIsAssociation(true);
    setCurrentScreen('profile');
  }, []);

  const handleSignupStep1Continue = useCallback((data: AssociationSignupStep1Data) => {
    setSignupStep1Data(data);
    setPreviousScreen('signup-step1');
    setCurrentScreen('signup-step2');
  }, []);

  const handleSignupStep2Complete = useCallback((documents?: string[]) => {
    if (!signupStep1Data) return;
    
    // Créer le compte association
    const newAccount: AssociationAccount = {
      id: Date.now().toString(),
      associationName: signupStep1Data.associationName,
      rnaNumber: signupStep1Data.rnaNumber,
      email: signupStep1Data.email,
      phone: signupStep1Data.phone,
      address: signupStep1Data.address,
      isVerified: false,
      documents,
    };
    
    setAssociationAccount(newAccount);
    setIsAssociationLoggedIn(true);
    setIsAssociation(true);
    setSignupStep1Data(undefined);
    setCurrentScreen('profile');
  }, [signupStep1Data]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: () => {
            setIsAssociationLoggedIn(false);
            setAssociationAccount(undefined);
            setIsAssociation(false);
            setCurrentScreen('profile');
          },
        },
      ]
    );
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
            isAssociationLoggedIn={isAssociationLoggedIn}
            associationAccount={associationAccount}
            onToggleRole={handleToggleRole}
            onDonateToDevPage={handleDonateToDevPage}
            onLogout={handleLogout}
          />
        );
      case 'payment':
        if (!paymentContext) return null;
        
        // Guard clause for association payments without card data
        if (paymentContext.type === 'association' && !paymentContext.card) {
          return null;
        }
        
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
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onSignupRedirect={() => {
              setPreviousScreen('login');
              setCurrentScreen('signup-step1');
            }}
            onBack={handleBack}
          />
        );
      case 'signup-step1':
        return (
          <AssociationSignupStep1Screen
            onContinue={handleSignupStep1Continue}
            onBack={handleBack}
          />
        );
      case 'signup-step2':
        return (
          <AssociationSignupStep2Screen
            onComplete={handleSignupStep2Complete}
            onBack={handleBack}
            signupData={signupStep1Data!}
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

  // Don't show BottomNav on details screen, payment screen, and auth screens
  const showBottomNav = 
    currentScreen !== 'details' && 
    currentScreen !== 'payment' &&
    currentScreen !== 'login' &&
    currentScreen !== 'signup-step1' &&
    currentScreen !== 'signup-step2';

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
