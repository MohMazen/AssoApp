import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, Spacing } from '../constants/colors';
import { Match } from '../types/Association';
import { mockMatches } from '../constants/mockData';

interface DonateScreenProps {
  onSelectAssociation: (cardId: string) => void;
  matches?: Match[];
}

export const DonateScreen: React.FC<DonateScreenProps> = ({ 
  onSelectAssociation,
  matches = mockMatches 
}) => {
  if (matches.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Faire un don</Text>
          <Text style={styles.headerSubtitle}>
            Soutenez les associations qui vous tiennent à cœur
          </Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={Colors.lightGray} />
          <Text style={styles.emptyTitle}>Pas encore de matchs</Text>
          <Text style={styles.emptySubtitle}>
            Swipez à droite pour matcher avec des associations et pouvoir leur faire un don !
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Faire un don</Text>
        <Text style={styles.headerSubtitle}>
          Soutenez les associations qui vous tiennent à cœur
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Matches section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💖 Vos associations sauvegardées</Text>
          <Text style={styles.sectionSubtitle}>
            {matches.length} association{matches.length > 1 ? 's' : ''} matchée{matches.length > 1 ? 's' : ''}
          </Text>

          <View style={styles.matchesGrid}>
            {matches.map((match) => (
              <TouchableOpacity
                key={match.id}
                style={styles.matchCard}
                onPress={() => onSelectAssociation(match.cardId)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: match.card.coverImage }}
                  style={styles.matchImage}
                />
                <View style={styles.matchOverlay} />
                <View style={styles.matchContent}>
                  <Text style={styles.matchName} numberOfLines={2}>
                    {match.card.associationName}
                  </Text>
                  <Text style={styles.matchProject} numberOfLines={1}>
                    {match.card.projectTitle}
                  </Text>
                  <View style={styles.donateButton}>
                    <Ionicons name="heart" size={16} color={Colors.white} />
                    <Text style={styles.donateButtonText}>Donner</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info section */}
        <View style={styles.infoSection}>
          <Ionicons name="information-circle" size={24} color={Colors.secondary} />
          <Text style={styles.infoText}>
            Cliquez sur une association pour accéder à sa page et faire un don directement
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  section: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  matchesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  matchCard: {
    width: '47%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    ...Shadows.card,
  },
  matchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  matchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  matchContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
  },
  matchName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  matchProject: {
    color: Colors.white,
    fontSize: 11,
    opacity: 0.9,
    marginBottom: Spacing.sm,
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 8,
    gap: 6,
  },
  donateButtonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginHorizontal: Spacing.sm,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.text,
    lineHeight: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
