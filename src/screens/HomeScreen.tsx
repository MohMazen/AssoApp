import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { SwipeCard } from '../components/SwipeCard';
import { ActionButtons } from '../components/ActionButtons';
import { mockAssociations } from '../constants/mockData';
import { Colors } from '../constants/colors';

export const HomeScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAssociation = mockAssociations[currentIndex];

  const handleNext = () => {
    if (currentIndex < mockAssociations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentAssociation) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>🎉</Text>
          <Text style={styles.emptyText}>
            Vous avez vu toutes les associations !
          </Text>
          <Text style={styles.emptySubtext}>
            Revenez bientôt pour en découvrir de nouvelles.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>AssoSwipe</Text>
        <Text style={styles.subtitle}>Découvrez des associations près de chez vous</Text>
      </View>

      <View style={styles.cardContainer}>
        <SwipeCard association={currentAssociation} />
      </View>

      <ActionButtons
        onDislike={handleNext}
        onLike={handleNext}
        onSuperLike={handleNext}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
  },
});
