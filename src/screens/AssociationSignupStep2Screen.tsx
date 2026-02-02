import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Shadows } from '../constants/colors';
import { AssociationSignupStep1Data } from '../types/Association';

interface AssociationSignupStep2ScreenProps {
  onComplete: (documents?: string[]) => void;
  onBack: () => void;
  signupData: AssociationSignupStep1Data;
}

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: 'statuts',
    name: 'Statuts de l\'association',
    description: 'Document officiel définissant les règles de fonctionnement',
    icon: 'document-text-outline',
  },
  {
    id: 'recepisse',
    name: 'Récépissé de déclaration',
    description: 'Preuve de déclaration en préfecture',
    icon: 'shield-checkmark-outline',
  },
  {
    id: 'dirigeants',
    name: 'Liste des dirigeants',
    description: 'Liste officielle des membres du bureau',
    icon: 'people-outline',
  },
];

export const AssociationSignupStep2Screen: React.FC<AssociationSignupStep2ScreenProps> = ({
  onComplete,
  onBack,
  signupData,
}) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const handleUploadDocument = (documentType: DocumentType) => {
    // Placeholder for document upload functionality
    Alert.alert(
      'Upload de document',
      `Fonctionnalité d'upload à venir pour: ${documentType.name}`,
      [{ text: 'OK' }]
    );
    // For now, just simulate an upload
    // setUploadedDocuments([...uploadedDocuments, documentType.id]);
  };

  const handleRemoveDocument = (documentId: string) => {
    setUploadedDocuments(uploadedDocuments.filter(id => id !== documentId));
  };

  const handleComplete = () => {
    onComplete(uploadedDocuments.length > 0 ? uploadedDocuments : undefined);
  };

  const handleAddLater = () => {
    onComplete(undefined);
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
          <Text style={styles.stepIndicator}>Étape 2/2</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subtitle */}
        <Text style={styles.subtitle}>Documents justificatifs (optionnel)</Text>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressLine, styles.progressLineActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
        </View>

        {/* Info message */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={Colors.primary} />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              📄 Ces documents nous permettront de vérifier votre association.
            </Text>
            <Text style={styles.infoText}>
              Vous pouvez terminer l'inscription maintenant et les ajouter plus tard.
            </Text>
          </View>
        </View>

        {/* Documents section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Documents recommandés</Text>
          
          {DOCUMENT_TYPES.map((docType) => {
            const isUploaded = uploadedDocuments.includes(docType.id);
            
            return (
              <View key={docType.id} style={styles.documentCard}>
                <View style={styles.documentInfo}>
                  <Ionicons
                    name={docType.icon}
                    size={24}
                    color={isUploaded ? Colors.success : Colors.textSecondary}
                  />
                  <View style={styles.documentText}>
                    <Text style={styles.documentName}>{docType.name}</Text>
                    <Text style={styles.documentDescription}>
                      {docType.description}
                    </Text>
                  </View>
                </View>
                
                {isUploaded ? (
                  <View style={styles.uploadedContainer}>
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={Colors.success}
                    />
                    <TouchableOpacity
                      onPress={() => handleRemoveDocument(docType.id)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="trash-outline" size={20} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => handleUploadDocument(docType)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cloud-upload-outline" size={20} color={Colors.primary} />
                    <Text style={styles.uploadButtonText}>Ajouter</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        {/* Helper text */}
        <View style={styles.helperCard}>
          <Ionicons name="bulb-outline" size={20} color={Colors.textSecondary} />
          <Text style={styles.helperText}>
            Vous pourrez ajouter ces documents depuis votre profil
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.laterButton}
            onPress={handleAddLater}
            activeOpacity={0.8}
          >
            <Text style={styles.laterButtonText}>Ajouter plus tard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>Terminer l'inscription</Text>
            <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
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
  progressLineActive: {
    backgroundColor: Colors.primary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primary,
    ...Shadows.card,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  documentText: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  documentDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  uploadedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  removeButton: {
    padding: Spacing.xs,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Spacing.xs,
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  helperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: Spacing.sm,
    marginBottom: Spacing.lg,
    gap: Spacing.xs,
  },
  helperText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    flex: 1,
  },
  buttonContainer: {
    gap: Spacing.sm,
  },
  laterButton: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  laterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  completeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
