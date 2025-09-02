import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface ManualScheduleSectionProps {
  isManualScheduleOn: boolean;
  toggleManualSchedule: () => void;
}

const ManualScheduleSection: React.FC<ManualScheduleSectionProps> = ({
  isManualScheduleOn,
  toggleManualSchedule,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.manualScheduleContainer}>
        <Text style={styles.manualScheduleTitle}>Manual Schedule</Text>
        <Pressable
          style={[
            styles.manualToggle,
            {
              backgroundColor: isManualScheduleOn
                ? Colors.statusOn
                : Colors.grey,
            },
          ]}
          onPress={toggleManualSchedule}
        >
          <View
            style={[
              styles.toggleDot,
              {
                transform: [{ translateX: isManualScheduleOn ? 20 : 2 }],
                backgroundColor: isManualScheduleOn ? Colors.white : Colors.red,
              },
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  manualScheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  manualScheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  manualToggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default ManualScheduleSection;
