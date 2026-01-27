import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Need } from '../types/Association';
import { Colors, Shadows, Spacing } from '../constants/colors';

interface AdminPostScreenProps {
  onPublish: () => void;
}

interface FormData {
  projectTitle: string;
  location: string;
  videoUrl: string;
  description: string;
  needs: {
    donations: boolean;
    volunteers: boolean;
    equipment: boolean;
    employees: boolean;
  };
  website: string;
  facebook: string;
  instagram: string;
}

interface FormErrors {
  projectTitle?: string;
  location?: string;
  videoUrl?: string;
  description?: string;
  needs?: string;
}

const validateYouTubeUrl = (url: string): boolean => {
  if (!url) return true;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

export const AdminPostScreen: React.FC<AdminPostScreenProps> = ({ onPublish }) => {
  const [form, setForm] = useState<FormData>({
    projectTitle: '',
    location: '',
    videoUrl: '',
    description: '',
    needs: {
      donations: false,
      volunteers: false,
      equipment: false,
      employees: false,
    },
    website: '',
    facebook: '',
    instagram: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleNeed = (need: Need) => {
    setForm((prev) => ({
      ...prev,
      needs: {
        ...prev.needs,
        [need]: !prev.needs[need],
      },
    }));
    if (errors.needs) {
      setErrors((prev) => ({ ...prev, needs: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.projectTitle.trim()) {
      newErrors.projectTitle = 'Le titre du projet est requis';
    }

    if (!form.location.trim()) {
      newErrors.location = 'La localisation est requise';
    }

    if (form.videoUrl && !validateYouTubeUrl(form.videoUrl)) {
      newErrors.videoUrl = 'URL YouTube invalide';
    }

    if (!form.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (form.description.trim().length < 50) {
      newErrors.description = 'La description doit faire au moins 50 caractères';
    }

    const hasNeed = Object.values(form.needs).some((v) => v);
    if (!hasNeed) {
      newErrors.needs = 'Sélectionnez au moins un besoin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (validate()) {
      Alert.alert(
        'Succès !',
        'Votre projet a été publié avec succès.',
        [{ text: 'OK', onPress: onPublish }],
        { cancelable: false }
      );
    }
  };

  const needsOptions: { key: Need; label: string; icon: string }[] = [
    { key: 'donations', label: 'Dons financiers', icon: '💰' },
    { key: 'volunteers', label: 'Bénévoles', icon: '🙋' },
    { key: 'equipment', label: 'Équipement', icon: '📦' },
    { key: 'employees', label: 'Employés', icon: '👔' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Publier un projet</Text>
        <Text style={styles.headerSubtitle}>
          Partagez votre cause avec des milliers de donateurs
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Project title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Titre du projet <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.projectTitle && styles.inputError]}
            placeholder="Ex: Distribution alimentaire hiver 2024"
            placeholderTextColor={Colors.lightGray}
            value={form.projectTitle}
            onChangeText={(text) => updateField('projectTitle', text)}
          />
          {errors.projectTitle && (
            <Text style={styles.errorText}>{errors.projectTitle}</Text>
          )}
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Localisation <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.location && styles.inputError]}
            placeholder="Ex: Paris, France"
            placeholderTextColor={Colors.lightGray}
            value={form.location}
            onChangeText={(text) => updateField('location', text)}
          />
          {errors.location && (
            <Text style={styles.errorText}>{errors.location}</Text>
          )}
        </View>

        {/* Video URL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>URL YouTube (max 30s)</Text>
          <TextInput
            style={[styles.input, errors.videoUrl && styles.inputError]}
            placeholder="https://youtube.com/watch?v=..."
            placeholderTextColor={Colors.lightGray}
            value={form.videoUrl}
            onChangeText={(text) => updateField('videoUrl', text)}
            autoCapitalize="none"
            keyboardType="url"
          />
          {errors.videoUrl && (
            <Text style={styles.errorText}>{errors.videoUrl}</Text>
          )}
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError,
            ]}
            placeholder="Décrivez votre projet en détail (minimum 50 caractères)"
            placeholderTextColor={Colors.lightGray}
            value={form.description}
            onChangeText={(text) => updateField('description', text)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>
            {form.description.length}/50 caractères minimum
          </Text>
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        {/* Needs */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Besoins <Text style={styles.required}>*</Text>
          </Text>
          <Text style={styles.sublabel}>
            Sélectionnez ce dont vous avez besoin
          </Text>
          <View style={styles.needsGrid}>
            {needsOptions.map(({ key, label, icon }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.needOption,
                  form.needs[key] && styles.needOptionActive,
                ]}
                onPress={() => toggleNeed(key)}
                activeOpacity={0.7}
              >
                <Text style={styles.needIcon}>{icon}</Text>
                <Text
                  style={[
                    styles.needLabel,
                    form.needs[key] && styles.needLabelActive,
                  ]}
                >
                  {label}
                </Text>
                {form.needs[key] && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={Colors.primary}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
          {errors.needs && <Text style={styles.errorText}>{errors.needs}</Text>}
        </View>

        {/* Social links */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Liens sociaux (optionnel)</Text>

          <View style={styles.socialInput}>
            <Ionicons name="globe-outline" size={20} color={Colors.gray} />
            <TextInput
              style={styles.socialTextInput}
              placeholder="Site web"
              placeholderTextColor={Colors.lightGray}
              value={form.website}
              onChangeText={(text) => updateField('website', text)}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.socialInput}>
            <Ionicons name="logo-facebook" size={20} color={Colors.gray} />
            <TextInput
              style={styles.socialTextInput}
              placeholder="Page Facebook"
              placeholderTextColor={Colors.lightGray}
              value={form.facebook}
              onChangeText={(text) => updateField('facebook', text)}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.socialInput}>
            <Ionicons name="logo-instagram" size={20} color={Colors.gray} />
            <TextInput
              style={styles.socialTextInput}
              placeholder="Compte Instagram"
              placeholderTextColor={Colors.lightGray}
              value={form.instagram}
              onChangeText={(text) => updateField('instagram', text)}
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>
        </View>

        {/* Image picker placeholder */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image de couverture</Text>
          <TouchableOpacity style={styles.imagePicker} activeOpacity={0.7}>
            <Ionicons name="image-outline" size={32} color={Colors.gray} />
            <Text style={styles.imagePickerText}>
              Appuyez pour ajouter une image
            </Text>
          </TouchableOpacity>
        </View>

        {/* Publish button */}
        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublish}
          activeOpacity={0.8}
        >
          <Ionicons name="paper-plane" size={20} color={Colors.white} />
          <Text style={styles.publishButtonText}>Publier</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
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
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  required: {
    color: Colors.primary,
  },
  sublabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    marginTop: -Spacing.xs,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    fontSize: 16,
    color: Colors.text,
  },
  inputError: {
    borderColor: Colors.error,
  },
  textArea: {
    height: 120,
    paddingTop: Spacing.md,
  },
  charCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'right',
  },
  errorText: {
    fontSize: 13,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  needsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  needOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: '45%',
    flex: 1,
  },
  needOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
  },
  needIcon: {
    fontSize: 20,
    marginRight: Spacing.sm,
  },
  needLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  needLabelActive: {
    color: Colors.text,
    fontWeight: '500',
  },
  checkIcon: {
    marginLeft: Spacing.xs,
  },
  socialInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  socialTextInput: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.sm,
    fontSize: 16,
    color: Colors.text,
  },
  imagePicker: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    gap: Spacing.sm,
    ...Shadows.card,
  },
  publishButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: Spacing.xl,
  },
});
