import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Shadows } from '../constants/colors';
import { AssociationSignupStep1Data } from '../types/Association';

interface AssociationSignupStep1ScreenProps {
  onContinue: (data: AssociationSignupStep1Data) => void;
  onBack: () => void;
}

export const AssociationSignupStep1Screen: React.FC<AssociationSignupStep1ScreenProps> = ({
  onContinue,
  onBack,
}) => {
  const [formData, setFormData] = useState<AssociationSignupStep1Data>({
    associationName: '',
    rnaNumber: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AssociationSignupStep1Data, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRnaNumber = (rna: string): boolean => {
    // Format: W followed by 9 digits
    const rnaRegex = /^W\d{9}$/;
    return rnaRegex.test(rna);
  };

  const validatePhone = (phone: string): boolean => {
    // French phone format: 10 digits starting with 0
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const updateField = (field: keyof AssociationSignupStep1Data, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AssociationSignupStep1Data, string>> = {};

    // Association name
    if (!formData.associationName.trim()) {
      newErrors.associationName = 'Le nom de l\'association est requis';
    }

    // RNA number
    if (!formData.rnaNumber.trim()) {
      newErrors.rnaNumber = 'Le numéro RNA est requis';
    } else if (!validateRnaNumber(formData.rnaNumber)) {
      newErrors.rnaNumber = 'Format invalide (W suivi de 9 chiffres)';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Format invalide (ex: 0123456789)';
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 caractères requis';
    }

    // Confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue(formData);
    }
  };

  const isFormValid = () => {
    return (
      formData.associationName.trim() &&
      formData.rnaNumber.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.address.trim() &&
      formData.password.trim() &&
      formData.confirmPassword.trim() &&
      formData.password === formData.confirmPassword &&
      validateEmail(formData.email) &&
      validateRnaNumber(formData.rnaNumber) &&
      validatePhone(formData.phone) &&
      formData.password.length >= 8
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Inscription Association</Text>
          <Text style={styles.stepIndicator}>Étape 1/2</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subtitle */}
        <Text style={styles.subtitle}>Informations essentielles</Text>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressDot} />
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Association Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom de l'association *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="business-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Association des bénévoles"
                placeholderTextColor={Colors.textSecondary}
                value={formData.associationName}
                onChangeText={(text) => updateField('associationName', text)}
              />
            </View>
            {errors.associationName ? (
              <Text style={styles.errorText}>{errors.associationName}</Text>
            ) : null}
          </View>

          {/* RNA Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Numéro RNA *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="W123456789"
                placeholderTextColor={Colors.textSecondary}
                value={formData.rnaNumber}
                onChangeText={(text) => updateField('rnaNumber', text.toUpperCase())}
                maxLength={10}
                autoCapitalize="characters"
              />
            </View>
            {errors.rnaNumber ? (
              <Text style={styles.errorText}>{errors.rnaNumber}</Text>
            ) : (
              <Text style={styles.helpText}>
                Le numéro RNA commence par W suivi de 9 chiffres
              </Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="contact@association.fr"
                placeholderTextColor={Colors.textSecondary}
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Téléphone *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="0123456789"
                placeholderTextColor={Colors.textSecondary}
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
                keyboardType="phone-pad"
              />
            </View>
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adresse complète *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="location-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="123 rue de la Paix, 75000 Paris"
                placeholderTextColor={Colors.textSecondary}
                value={formData.address}
                onChangeText={(text) => updateField('address', text)}
                multiline
              />
            </View>
            {errors.address ? (
              <Text style={styles.errorText}>{errors.address}</Text>
            ) : null}
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Minimum 8 caractères"
                placeholderTextColor={Colors.textSecondary}
                value={formData.password}
                onChangeText={(text) => updateField('password', text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmer le mot de passe *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Retapez votre mot de passe"
                placeholderTextColor={Colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={(text) => updateField('confirmPassword', text)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            ) : null}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              !isFormValid() && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
            disabled={!isFormValid()}
          >
            <Text
              style={[
                styles.continueButtonText,
                !isFormValid() && styles.continueButtonTextDisabled,
              ]}
            >
              Continuer
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={isFormValid() ? Colors.white : Colors.textSecondary}
            />
          </TouchableOpacity>
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
    padding: Spacing.xs,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  stepIndicator: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
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
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.lightGray,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.lightGray,
    marginHorizontal: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
  },
  inputIcon: {
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: Spacing.sm + 4,
  },
  eyeIcon: {
    padding: Spacing.xs,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  helpText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    gap: Spacing.xs,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.lightGray,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  continueButtonTextDisabled: {
    color: Colors.textSecondary,
  },
});
