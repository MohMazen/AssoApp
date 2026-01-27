import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Association } from '../types/Association';
import { Colors, CardDimensions } from '../constants/colors';

const { CARD_WIDTH, CARD_HEIGHT } = CardDimensions;

interface SwipeCardProps {
  association: Association;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ association }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: association.imageUrl }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{association.category}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{association.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {association.description}
          </Text>
          <Text style={styles.members}>
            {association.memberCount.toLocaleString()} membres
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 8,
  },
  members: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
});
