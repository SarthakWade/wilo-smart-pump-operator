import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface PumpData {
  isOn: boolean;
  pressure: string;
  flow: string;
  runtime?: string;
  nextRun?: string;
}

interface PumpAndModeSectionProps {
  pumpData: PumpData;
  isAutoMode: boolean;
  togglePump: () => void;
  toggleAutoMode: () => void;
  aiConfidence?: number;
}

const PumpAndModeSection: React.FC<PumpAndModeSectionProps> = ({
  pumpData,
  isAutoMode,
  togglePump,
  toggleAutoMode,
  aiConfidence = 85,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.pumpModeContainer}>
        {/* Pump Section */}
        <View style={styles.pumpSection}>
          <View style={styles.pumpHeader}>
            <Image
              source={require("../assets/images/icons/pump-icon.png")}
              style={[
                styles.pumpIcon,
                {
                  tintColor: pumpData.isOn ? Colors.statusOn : Colors.statusOff,
                },
              ]}
              contentFit="contain"
            />
            <Text style={styles.pumpTitle}>Pump</Text>
          </View>

          <Pressable style={styles.statusButton} onPress={togglePump}>
            <Text
              style={[
                styles.statusText,
                {
                  color: pumpData.isOn ? Colors.statusOn : Colors.statusOff,
                },
              ]}
            >
              {pumpData.isOn ? "ON" : "OFF"}
            </Text>
          </Pressable>

          <View style={styles.pumpDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.pumpDetailLabel}>Pressure</Text>
              <Text style={styles.pumpDetailValue}>{pumpData.pressure}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.pumpDetailLabel}>Flow</Text>
              <Text style={styles.pumpDetailValue}>{pumpData.flow}</Text>
            </View>
            {pumpData.runtime && (
              <View style={styles.detailRow}>
                <Text style={styles.pumpDetailLabel}>Runtime Today</Text>
                <Text style={styles.pumpDetailValue}>{pumpData.runtime}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Mode Section */}
        <View style={styles.modeSection}>
          <Text style={styles.modeTitle}>Mode</Text>

          <Pressable style={styles.modeToggle} onPress={toggleAutoMode}>
            <View style={styles.modeIndicator}>
              <Text style={styles.modeIndicatorText}>A</Text>
            </View>
            <Text style={styles.modeText}>Automatic</Text>
          </Pressable>

          {isAutoMode && pumpData.nextRun && (
            <View style={styles.nextRunContainer}>
              <Ionicons
                name="time-outline"
                size={14}
                color={Colors.wiloGreen}
              />
              <Text style={styles.nextRunText}>Next: {pumpData.nextRun}</Text>
            </View>
          )}
          {isAutoMode && (
            <View style={styles.aiConfidenceContainer}>
              <Text style={styles.aiLabel}>AI Learning</Text>
              <View style={styles.confidenceBar}>
                <View
                  style={[
                    styles.confidenceProgress,
                    { width: `${aiConfidence}%` },
                  ]}
                />
              </View>
              <Text style={styles.aiConfidenceText}>{aiConfidence}%</Text>
            </View>
          )}
          {!isAutoMode && (
            <Text style={styles.manualModeText}>Manual mode active</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  pumpModeContainer: {
    flexDirection: "row",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pumpSection: {
    flex: 1,
    alignItems: "center",
  },
  pumpHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pumpIcon: {
    width: 24,
    height: 24,
  },
  pumpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  pumpDetails: {
    alignItems: "center",
  },
  pumpDetailLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  pumpDetailValue: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: "600",
    marginBottom: 4,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: 16,
  },
  modeSection: {
    flex: 1,
    alignItems: "center",
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  modeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  modeIndicatorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  modeText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  manualModeText: {
    fontSize: 10,
    color: Colors.red,
    textAlign: "center",
  },
  detailRow: {
    marginBottom: 6,
    alignItems: "center",
  },
  nextRunContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: Colors.wiloGreenOpacity10,
    borderRadius: 12,
  },
  nextRunText: {
    fontSize: 11,
    color: Colors.wiloGreen,
    marginLeft: 6,
    fontWeight: "600",
  },
  aiConfidenceContainer: {
    marginTop: 12,
    width: "100%",
    paddingHorizontal: 8,
  },
  aiLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 6,
    textAlign: "center",
  },
  confidenceBar: {
    height: 6,
    backgroundColor: Colors.lightGrey,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 4,
  },
  confidenceProgress: {
    height: "100%",
    backgroundColor: Colors.wiloGreen,
    borderRadius: 3,
  },
  aiConfidenceText: {
    fontSize: 10,
    color: Colors.wiloGreen,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default PumpAndModeSection;
