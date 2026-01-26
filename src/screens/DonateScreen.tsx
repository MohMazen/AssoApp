import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, Spacing } from '../constants/colors';
import { mockCards } from '../constants/mockData';

interface DonateScreenProps {
  onConfirm?: (amount: number) => void;
}

const quickAmounts = [5, 10, 20, 50, 100];

export const DonateScreen: React.FC<DonateScreenProps> = ({ onConfirm }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const featuredCauses = mockCards.slice(0, 3);

  const getCurrentAmount = (): number => {
    if (customAmount) {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount || 0;
  };

  const handleQuickAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (text: string) => {
    // Only allow numbers and one decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    const parts = filtered.split('.');
    if (parts.length > 2) return;
    if (parts[1]?.length > 2) return;
    
    setCustomAmount(filtered);
    setSelectedAmount(null);
  };

  const handleConfirmDonation = () => {
    const amount = getCurrentAmount();
    if (amount <= 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner ou entrer un montant valide.');
      return;
    }

    Alert.alert(
      'Confirmer le don',
      `Vous allez effectuer un don de ${amount}€. Souhaitez-vous continuer ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Confirmer',
          onPress: () => {
            Alert.alert(
              'Merci ! 💚',
              `Votre don de ${amount}€ a été enregistré. Un grand merci pour votre générosité !`,
              [{ text: 'OK', onPress: () => onConfirm?.(amount) }]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Faire un don</Text>
        <Text style={styles.headerSubtitle}>
          Chaque euro compte pour changer des vies
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quick amount selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Montant rapide</Text>
          <View style={styles.quickAmountsGrid}>
            {quickAmounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.quickAmountButton,
                  selectedAmount === amount && styles.quickAmountButtonActive,
                ]}
                onPress={() => handleQuickAmountSelect(amount)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    selectedAmount === amount && styles.quickAmountTextActive,
                  ]}
                >
                  {amount}€
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom amount */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Montant personnalisé</Text>
          <View style={styles.customAmountContainer}>
            <TextInput
              style={styles.customAmountInput}
              placeholder="Entrez un montant"
              placeholderTextColor={Colors.lightGray}
              value={customAmount}
              onChangeText={handleCustomAmountChange}
              keyboardType="decimal-pad"
            />
            <View style={styles.currencyBadge}>
              <Text style={styles.currencyText}>€</Text>
            </View>
          </View>
        </View>

        {/* Featured causes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Causes en vedette</Text>
          <Text style={styles.sectionSubtitle}>
            Découvrez des projets qui ont besoin de vous
          </Text>
          <View style={styles.causesContainer}>
            {featuredCauses.map((cause) => (
              <TouchableOpacity
                key={cause.id}
                style={styles.causeCard}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: cause.coverImage }}
                  style={styles.causeImage}
                />
                <View style={styles.causeOverlay} />
                <View style={styles.causeContent}>
                  <Text style={styles.causeName} numberOfLines={1}>
                    {cause.associationName}
                  </Text>
                  <Text style={styles.causeProject} numberOfLines={1}>
                    {cause.projectTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Impact info */}
        <View style={styles.impactSection}>
          <Ionicons name="heart" size={32} color={Colors.primary} />
          <Text style={styles.impactTitle}>Votre impact</Text>
          <View style={styles.impactItem}>
            <Text style={styles.impactAmount}>5€</Text>
            <Text style={styles.impactText}>= 1 repas distribué</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactAmount}>20€</Text>
            <Text style={styles.impactText}>= 1 kit d&apos;hygiène</Text>
          </View>
          <View style={styles.impactItem}>
            <Text style={styles.impactAmount}>50€</Text>
            <Text style={styles.impactText}>= 1 semaine de soutien</Text>
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed CTA */}
      <View style={styles.ctaContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>{getCurrentAmount()}€</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            getCurrentAmount() <= 0 && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirmDonation}
          activeOpacity={0.8}
          disabled={getCurrentAmount() <= 0}
        >
          <Ionicons name="heart" size={20} color={Colors.white} />
          <Text style={styles.confirmButtonText}>Confirmer le don</Text>
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
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    marginTop: -Spacing.xs,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: Colors.background,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  quickAmountButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  quickAmountText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  quickAmountTextActive: {
    color: Colors.primary,
  },
  customAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customAmountInput: {
    flex: 1,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: 18,
    color: Colors.text,
  },
  currencyBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: 12,
    marginLeft: Spacing.sm,
  },
  currencyText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  causesContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  causeCard: {
    flex: 1,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
  },
  causeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  causeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  causeContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
  },
  causeName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  causeProject: {
    color: Colors.white,
    fontSize: 10,
    opacity: 0.9,
  },
  impactSection: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  impactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  impactAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    width: 50,
  },
  impactText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  bottomSpacer: {
    height: 120,
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  totalLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  confirmButtonDisabled: {
    backgroundColor: Colors.lightGray,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
