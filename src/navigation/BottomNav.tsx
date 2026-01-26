import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../constants/colors';
import { Screen } from '../types/Association';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isAssociation?: boolean;
  onToggleRole?: () => void;
}

interface TabItem {
  id: Screen;
  label: string;
  iconActive: keyof typeof Ionicons.glyphMap;
  iconInactive: keyof typeof Ionicons.glyphMap;
  condition?: 'association' | 'always';
}

const tabs: TabItem[] = [
  { id: 'feed', label: 'Découvrir', iconActive: 'home', iconInactive: 'home-outline', condition: 'always' },
  { id: 'history', label: 'Matchs', iconActive: 'heart', iconInactive: 'heart-outline', condition: 'always' },
  { id: 'admin', label: 'Poster', iconActive: 'add-circle', iconInactive: 'add-circle-outline', condition: 'association' },
  { id: 'donate', label: 'Donner', iconActive: 'gift', iconInactive: 'gift-outline', condition: 'always' },
  { id: 'profile', label: 'Profil', iconActive: 'person', iconInactive: 'person-outline', condition: 'always' },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  isAssociation = false,
  onToggleRole,
}) => {
  const visibleTabs = tabs.filter(
    (tab) => tab.condition === 'always' || (tab.condition === 'association' && isAssociation)
  );

  return (
    <View style={styles.container}>
      {visibleTabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        const iconName = isActive ? tab.iconActive : tab.iconInactive;

        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onNavigate(tab.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isActive ? Colors.primary : Colors.gray}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: 20,
    paddingTop: Spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
  },
  label: {
    fontSize: 10,
    color: Colors.gray,
    marginTop: 2,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
