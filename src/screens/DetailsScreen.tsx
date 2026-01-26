import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Need } from '../types/Association';
import { Colors, Shadows, Spacing } from '../constants/colors';
import { mockCards } from '../constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DetailsScreenProps {
  card?: Card;
  onBack: () => void;
  onDonate: () => void;
}

const getNeedIcon = (need: Need): string => {
  switch (need) {
    case 'donations':
      return '💰';
    case 'volunteers':
      return '🙋';
    case 'equipment':
      return '📦';
    case 'employees':
      return '👔';
    default:
      return '❓';
  }
};

const getNeedLabel = (need: Need): string => {
  switch (need) {
    case 'donations':
      return 'Dons financiers';
    case 'volunteers':
      return 'Bénévoles';
    case 'equipment':
      return 'Équipement';
    case 'employees':
      return 'Employés';
    default:
      return need;
  }
};

const getSocialIcon = (key: string): keyof typeof Ionicons.glyphMap => {
  switch (key) {
    case 'website':
      return 'globe-outline';
    case 'facebook':
      return 'logo-facebook';
    case 'instagram':
      return 'logo-instagram';
    case 'donationPage':
      return 'heart-outline';
    default:
      return 'link-outline';
  }
};

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  card = mockCards[0],
  onBack,
  onDonate,
}) => {
  const handleOpenLink = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch((err) =>
        console.error('Error opening link:', err)
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détails</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Video/Image section */}
        <View style={styles.mediaContainer}>
          <Image source={{ uri: card.coverImage }} style={styles.coverImage} />
          <View style={styles.videoOverlay}>
            <View style={styles.playButton}>
              <Ionicons name="play" size={32} color={Colors.white} />
            </View>
            <Text style={styles.videoLabel}>Voir la vidéo</Text>
          </View>
        </View>

        {/* Association info */}
        <View style={styles.contentSection}>
          <View style={styles.locationBadge}>
            <Ionicons name="location" size={14} color={Colors.white} />
            <Text style={styles.locationText}>{card.location}</Text>
          </View>

          <Text style={styles.associationName}>{card.associationName}</Text>
          <Text style={styles.projectTitle}>{card.projectTitle}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {card.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>À propos du projet</Text>
          <Text style={styles.description}>{card.description}</Text>
        </View>

        {/* Needs section */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Nos besoins</Text>
          <View style={styles.needsList}>
            {card.needs.map((need) => (
              <View key={need} style={styles.needItem}>
                <View style={styles.needHeader}>
                  <Text style={styles.needEmoji}>{getNeedIcon(need)}</Text>
                  <Text style={styles.needTitle}>{getNeedLabel(need)}</Text>
                </View>
                {card.needsDetails?.[need] && (
                  <Text style={styles.needDescription}>
                    {card.needsDetails[need]}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Social links */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Nous suivre</Text>
          <View style={styles.socialGrid}>
            {Object.entries(card.socialLinks).map(([key, url]) => {
              if (!url) return null;
              return (
                <TouchableOpacity
                  key={key}
                  style={styles.socialButton}
                  onPress={() => handleOpenLink(url)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={getSocialIcon(key)}
                    size={24}
                    color={Colors.primary}
                  />
                  <Text style={styles.socialLabel}>
                    {key === 'donationPage' ? 'Don' : key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Bottom spacing for CTA button */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed CTA button */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onDonate}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={20} color={Colors.white} />
          <Text style={styles.ctaText}>Faire un don</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl + Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.sm,
    marginLeft: -Spacing.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  mediaContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.5625, // 16:9 aspect ratio
    backgroundColor: Colors.black,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabel: {
    color: Colors.white,
    fontSize: 14,
    marginTop: Spacing.sm,
    fontWeight: '500',
  },
  contentSection: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    marginBottom: Spacing.sm,
  },
  locationText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: Spacing.xs,
    fontWeight: '500',
  },
  associationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  projectTitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  tag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  tagText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  needsList: {
    gap: Spacing.md,
  },
  needItem: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: 12,
  },
  needHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  needEmoji: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  needTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  needDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 36,
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  socialLabel: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: Spacing.sm,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.card,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  ctaText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
