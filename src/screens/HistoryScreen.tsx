import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Match } from '../types/Association';
import { Colors, Shadows, Spacing } from '../constants/colors';
import { mockMatches } from '../constants/mockData';

interface HistoryScreenProps {
  onSelectMatch: (cardId: string) => void;
  matches?: Match[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Aujourd'hui";
  } else if (diffDays === 1) {
    return 'Hier';
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jours`;
  } else {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  }
};

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onSelectMatch,
  matches = mockMatches,
}) => {
  if (matches.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mes Matchs</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color={Colors.lightGray} />
          <Text style={styles.emptyTitle}>Pas encore de matchs</Text>
          <Text style={styles.emptySubtitle}>
            Swipez à droite pour matcher avec des associations qui vous intéressent !
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Matchs</Text>
        <Text style={styles.headerSubtitle}>
          {matches.length} association{matches.length > 1 ? 's' : ''} sauvée{matches.length > 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {matches.map((match) => (
          <TouchableOpacity
            key={match.id}
            style={styles.matchCard}
            onPress={() => onSelectMatch(match.cardId)}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: match.card.coverImage }}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.associationName} numberOfLines={1}>
                  {match.card.associationName}
                </Text>
                {match.donated && (
                  <View style={styles.donatedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                    <Text style={styles.donatedText}>Don effectué</Text>
                  </View>
                )}
              </View>
              <Text style={styles.projectTitle} numberOfLines={2}>
                {match.card.projectTitle}
              </Text>
              <View style={styles.cardFooter}>
                <View style={styles.dateContainer}>
                  <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.dateText}>{formatDate(match.matchedAt)}</Text>
                </View>
                {match.donationAmount && (
                  <Text style={styles.donationAmount}>
                    {match.donationAmount}€
                  </Text>
                )}
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.lightGray}
              style={styles.chevron}
            />
          </TouchableOpacity>
        ))}
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
    paddingTop: Spacing.xl + Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
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
    padding: Spacing.md,
    gap: Spacing.md,
  },
  matchCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    ...Shadows.card,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  associationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  donatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 184, 148, 0.1)',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  donatedText: {
    fontSize: 10,
    color: Colors.success,
    fontWeight: '500',
  },
  projectTitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginVertical: Spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  donationAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  chevron: {
    alignSelf: 'center',
    marginRight: Spacing.sm,
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
    lineHeight: 22,
  },
});
