import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface ScheduleSectionProps {
  isScheduleOn: boolean;
  toggleSchedule: () => void;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  isScheduleOn,
  toggleSchedule,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>Schedule</Text>
          <Pressable
            style={[
              styles.scheduleButton,
              {
                backgroundColor: isScheduleOn
                  ? Colors.statusOn
                  : Colors.statusOff,
              },
            ]}
            onPress={toggleSchedule}
          >
            <Text style={styles.scheduleButtonText}>
              {isScheduleOn ? "ON" : "OFF"}
            </Text>
          </Pressable>
        </View>

        {isScheduleOn && (
          <View style={styles.scheduleDetails}>
            <Text style={styles.scheduleDetailText}>
              until 9:00 am (1.20 mins)
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  scheduleContainer: {
    backgroundColor: Colors.scheduleBackground,
    borderRadius: 12,
    padding: 16,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    flex: 1,
  },
  scheduleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  scheduleButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
  scheduleDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  scheduleDetailText: {
    fontSize: 12,
    color: Colors.white,
  },
});

export default ScheduleSection;
