import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Card, Need } from '../types/Association';
import { Colors, Shadows, Spacing, CardDimensions } from '../constants/colors';
import { mockCards } from '../constants/mockData';

const { CARD_WIDTH, CARD_HEIGHT, SWIPE_THRESHOLD, SCREEN_WIDTH } = CardDimensions;

interface SwipeFeedScreenProps {
  onInfo?: (card: Card) => void;
  onMatch?: (card: Card) => void;
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
      return 'Dons';
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

export const SwipeFeedScreen: React.FC<SwipeFeedScreenProps> = ({
  onInfo,
  onMatch,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards] = useState<Card[]>(mockCards);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  const handleSwipeComplete = useCallback((direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (onMatch && currentCard) {
        onMatch(currentCard);
      }
    }
    setCurrentIndex((prev) => prev + 1);
    translateX.value = 0;
    translateY.value = 0;
    rotation.value = 0;
    scale.value = 1;
  }, [currentCard, onMatch, translateX, translateY, rotation, scale]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 20;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        translateX.value = withTiming(
          direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5,
          { duration: 300, easing: Easing.ease },
          () => {
            runOnJS(handleSwipeComplete)(direction);
          }
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  const likeOverlayStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? Math.min(translateX.value / 100, 1) : 0,
  }));

  const nopeOverlayStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? Math.min(-translateX.value / 100, 1) : 0,
  }));

  const handleLike = useCallback(() => {
    translateX.value = withTiming(
      SCREEN_WIDTH * 1.5,
      { duration: 300 },
      () => {
        runOnJS(handleSwipeComplete)('right');
      }
    );
  }, [translateX, handleSwipeComplete]);

  const handleDislike = useCallback(() => {
    translateX.value = withTiming(
      -SCREEN_WIDTH * 1.5,
      { duration: 300 },
      () => {
        runOnJS(handleSwipeComplete)('left');
      }
    );
  }, [translateX, handleSwipeComplete]);

  const handleInfoPress = useCallback(() => {
    if (onInfo && currentCard) {
      onInfo(currentCard);
    }
  }, [onInfo, currentCard]);

  if (!currentCard) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🎉</Text>
        <Text style={styles.emptyTitle}>Plus de cartes !</Text>
        <Text style={styles.emptySubtitle}>
          Vous avez vu toutes les associations disponibles.
        </Text>
        <Text style={styles.emptySubtitle}>
          Revenez bientôt pour en découvrir de nouvelles.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>💚 CoeurMatch</Text>
        <Text style={styles.subtitle}>
          Connectez-vous aux causes qui vous tiennent à cœur
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Next card preview */}
        {nextCard && (
          <View style={[styles.card, styles.nextCard]}>
            <Image source={{ uri: nextCard.coverImage }} style={styles.cardImage} />
            <View style={styles.cardOverlay} />
          </View>
        )}

        {/* Current card */}
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.card, cardStyle]}>
            {/* Like overlay */}
            <Animated.View style={[styles.stampOverlay, styles.likeStamp, likeOverlayStyle]}>
              <Text style={styles.stampText}>LIKE</Text>
            </Animated.View>

            {/* Nope overlay */}
            <Animated.View style={[styles.stampOverlay, styles.nopeStamp, nopeOverlayStyle]}>
              <Text style={styles.stampText}>NOPE</Text>
            </Animated.View>

            <Image source={{ uri: currentCard.coverImage }} style={styles.cardImage} />
            <View style={styles.cardOverlay} />

            {/* Info button */}
            <TouchableOpacity
              style={styles.infoButton}
              onPress={handleInfoPress}
              activeOpacity={0.8}
            >
              <Ionicons name="information-circle" size={28} color={Colors.white} />
            </TouchableOpacity>

            {/* Video placeholder */}
            <View style={styles.videoPlaceholder}>
              <Ionicons name="play-circle" size={40} color={Colors.white} />
              <Text style={styles.videoText}>Vidéo 16:9</Text>
            </View>

            {/* Card content */}
            <View style={styles.cardContent}>
              <View style={styles.locationBadge}>
                <Ionicons name="location" size={14} color={Colors.white} />
                <Text style={styles.locationText}>{currentCard.location}</Text>
              </View>

              <Text style={styles.associationName}>{currentCard.associationName}</Text>
              <Text style={styles.projectTitle}>{currentCard.projectTitle}</Text>

              {/* Tags */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tagsContainer}
              >
                {currentCard.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Needs icons */}
              <View style={styles.needsContainer}>
                {(['donations', 'volunteers', 'equipment', 'employees'] as Need[]).map(
                  (need) => (
                    <View
                      key={need}
                      style={[
                        styles.needIcon,
                        currentCard.needs.includes(need) && styles.needIconActive,
                      ]}
                    >
                      <Text style={styles.needEmoji}>{getNeedIcon(need)}</Text>
                      <Text
                        style={[
                          styles.needLabel,
                          currentCard.needs.includes(need) && styles.needLabelActive,
                        ]}
                      >
                        {getNeedLabel(need)}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.dislikeButton]}
          onPress={handleDislike}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={32} color={Colors.danger} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={32} color={Colors.success} />
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
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingTop: Spacing.lg,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...Shadows.card,
    overflow: 'hidden',
  },
  nextCard: {
    transform: [{ scale: 0.95 }],
    top: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  stampOverlay: {
    position: 'absolute',
    top: 50,
    zIndex: 10,
    padding: Spacing.md,
    borderWidth: 4,
    borderRadius: 8,
    transform: [{ rotate: '-25deg' }],
  },
  likeStamp: {
    right: 20,
    borderColor: Colors.success,
  },
  nopeStamp: {
    left: 20,
    borderColor: Colors.danger,
  },
  stampText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  infoButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: Spacing.xs,
  },
  videoPlaceholder: {
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: Spacing.sm,
    borderRadius: 12,
  },
  videoText: {
    color: Colors.white,
    fontSize: 12,
    marginTop: Spacing.xs,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  projectTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  tag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    marginRight: Spacing.xs,
  },
  tagText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  needsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.xs,
  },
  needIcon: {
    alignItems: 'center',
    opacity: 0.4,
  },
  needIconActive: {
    opacity: 1,
  },
  needEmoji: {
    fontSize: 20,
  },
  needLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  needLabelActive: {
    color: Colors.text,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  actionButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.card,
    borderWidth: 2,
  },
  dislikeButton: {
    borderColor: Colors.danger,
  },
  likeButton: {
    borderColor: Colors.success,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
