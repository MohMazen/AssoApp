import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../constants/colors';

interface ProfileScreenProps {
  isAssociation: boolean;
  onToggleRole: () => void;
  onDonateToDevPage: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  isAssociation,
  onToggleRole,
  onDonateToDevPage,
}) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Ionicons
              name={isAssociation ? 'business' : 'person'}
              size={48}
              color={Colors.primary}
            />
          </View>
          <Text style={styles.userName}>
            {isAssociation ? 'Mon Association' : 'Utilisateur'}
          </Text>
          <Text style={styles.userType}>
            {isAssociation ? 'Compte Association' : 'Compte Donateur'}
          </Text>
        </View>

        {/* Role toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de l&apos;application</Text>
          <TouchableOpacity
            style={styles.roleToggle}
            onPress={onToggleRole}
            activeOpacity={0.7}
          >
            <View style={styles.roleInfo}>
              <Ionicons
                name={isAssociation ? 'business-outline' : 'heart-outline'}
                size={24}
                color={Colors.primary}
              />
              <View style={styles.roleText}>
                <Text style={styles.roleLabel}>
                  {isAssociation ? 'Mode Association' : 'Mode Donateur'}
                </Text>
                <Text style={styles.roleDescription}>
                  {isAssociation
                    ? 'Publiez des projets et recevez des dons'
                    : 'Découvrez et soutenez des associations'}
                </Text>
              </View>
            </View>
            <Ionicons
              name="swap-horizontal"
              size={24}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.text}
              />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingInfo}>
              <Ionicons name="lock-closed-outline" size={24} color={Colors.text} />
              <Text style={styles.settingLabel}>Confidentialité</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingInfo}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={Colors.text}
              />
              <Text style={styles.settingLabel}>Aide</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Support CoeurMatch - NOUVELLE SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soutenir CoeurMatch</Text>
          <TouchableOpacity 
            style={styles.supportButton} 
            activeOpacity={0.7}
            onPress={onDonateToDevPage}
          >
            <View style={styles.supportContent}>
              <Ionicons
                name="code-slash"
                size={32}
                color={Colors.primary}
              />
              <View style={styles.supportText}>
                <Text style={styles.supportTitle}>💚 Donner pour le développement</Text>
                <Text style={styles.supportDescription}>
                  Soutenez le développement et l&apos;amélioration de l&apos;application
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Matchs</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150€</Text>
              <Text style={styles.statLabel}>Donné</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Associations</Text>
            </View>
          </View>
        </View>

        {/* App info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>💚 CoeurMatch</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>
            Ensemble, changeons le monde ❤️
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  avatarSection: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.sm,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  userType: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  roleToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: 12,
  },
  roleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  roleText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  roleDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  supportButton: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supportText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  appTagline: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
});
