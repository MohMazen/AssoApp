import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface ActionButtonsProps {
  onDislike: () => void;
  onLike: () => void;
  onSuperLike?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDislike,
  onLike,
  onSuperLike,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.dislikeButton]}
        onPress={onDislike}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={32} color={Colors.danger} />
      </TouchableOpacity>

      {onSuperLike && (
        <TouchableOpacity
          style={[styles.button, styles.superLikeButton]}
          onPress={onSuperLike}
          activeOpacity={0.8}
        >
          <Ionicons name="star" size={24} color={Colors.secondary} />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={onLike}
        activeOpacity={0.8}
      >
        <Ionicons name="heart" size={32} color={Colors.success} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  dislikeButton: {
    borderWidth: 2,
    borderColor: Colors.danger,
  },
  superLikeButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  likeButton: {
    borderWidth: 2,
    borderColor: Colors.success,
  },
});
