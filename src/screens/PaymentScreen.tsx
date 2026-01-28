import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows, Spacing } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PaymentScreenProps {
  recipient: {
    type: 'association' | 'developer';
    name: string;
    description: string;
    image?: string;
  };
  onBack: () => void;
  onPaymentComplete: (amount: number) => void;
}

const QUICK_AMOUNTS = [5, 10, 20, 50, 100];
const MAX_DONATION_AMOUNT = 10000; // Maximum donation of 10,000€

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  recipient,
  onBack,
  onPaymentComplete,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickAmountPress = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (text: string) => {
    // Only allow numbers and one decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    
    // Limit to 2 decimal places for currency
    if (parts.length === 2 && parts[1].length > 2) {
      return;
    }
    
    setCustomAmount(cleaned);
    setSelectedAmount(null);
  };

  const getTotalAmount = (): number => {
    if (selectedAmount !== null) return selectedAmount;
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const handleConfirmPayment = () => {
    const total = getTotalAmount();
    
    if (total < 1) {
      Alert.alert(
        'Montant invalide',
        'Le montant minimum est de 1€',
        [{ text: 'OK' }]
      );
      return;
    }

    if (total > MAX_DONATION_AMOUNT) {
      Alert.alert(
        'Montant trop élevé',
        `Le montant maximum est de ${MAX_DONATION_AMOUNT.toLocaleString('fr-FR')}€`,
        [{ text: 'OK' }]
      );
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        '💚 Merci !',
        `Votre don de ${total.toFixed(2)}€ a été effectué avec succès.`,
        [
          {
            text: 'OK',
            onPress: () => onPaymentComplete(total),
          },
        ]
      );
    }, 1500);
  };

  const total = getTotalAmount();
  const isValidAmount = total >= 1;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Faire un don</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Recipient Card */}
        <View style={styles.recipientCard}>
          {recipient.type === 'association' && recipient.image ? (
            <Image
              source={{ uri: recipient.image }}
              style={styles.recipientImage}
            />
          ) : (
            <View style={styles.recipientIconContainer}>
              <Ionicons
                name="code-slash"
                size={48}
                color={Colors.primary}
              />
            </View>
          )}
          <Text style={styles.recipientName}>{recipient.name}</Text>
          <Text style={styles.recipientDescription}>{recipient.description}</Text>
        </View>

        {/* Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Montant du don</Text>
          
          <View style={styles.quickAmountsGrid}>
            {QUICK_AMOUNTS.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.quickAmountButton,
                  selectedAmount === amount && styles.quickAmountButtonSelected,
                ]}
                onPress={() => handleQuickAmountPress(amount)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    selectedAmount === amount && styles.quickAmountTextSelected,
                  ]}
                >
                  {amount}€
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Amount Input */}
          <View style={styles.customAmountContainer}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="logo-euro"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Montant personnalisé"
                placeholderTextColor={Colors.textSecondary}
                value={customAmount}
                onChangeText={handleCustomAmountChange}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Résumé</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Montant du don</Text>
            <Text style={styles.summaryValue}>
              {total > 0 ? `${total.toFixed(2)}€` : '0,00€'}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frais de traitement</Text>
            <Text style={styles.summaryValue}>0,00€</Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>
              {total > 0 ? `${total.toFixed(2)}€` : '0,00€'}
            </Text>
          </View>
        </View>

        {/* Payment Button */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            (!isValidAmount || isProcessing) && styles.paymentButtonDisabled,
          ]}
          onPress={handleConfirmPayment}
          disabled={!isValidAmount || isProcessing}
          activeOpacity={0.8}
        >
          <Ionicons
            name="shield-checkmark"
            size={20}
            color={Colors.white}
          />
          <Text style={styles.paymentButtonText}>
            {isProcessing ? 'Traitement...' : 'Confirmer le paiement'}
          </Text>
        </TouchableOpacity>

        {/* Security Notice */}
        <View style={styles.securityNotice}>
          <Ionicons
            name="lock-closed"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.securityText}>
            Paiement sécurisé et crypté
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  recipientCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  recipientImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: Spacing.md,
  },
  recipientIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  recipientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  recipientDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  quickAmountButton: {
    flex: 1,
    minWidth: (SCREEN_WIDTH - Spacing.md * 2 - Spacing.md * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.background,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  quickAmountButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  quickAmountText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  quickAmountTextSelected: {
    color: Colors.white,
  },
  customAmountContainer: {
    marginTop: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
  summaryCard: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
    ...Shadows.card,
  },
  paymentButtonDisabled: {
    backgroundColor: Colors.lightGray,
    opacity: 0.6,
  },
  paymentButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  securityText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
