import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface ScheduleSectionProps {
  isScheduleOn: boolean;
  // toggleSchedule prop removed since we're not using a button anymore
}


const ScheduleSection: React.FC<ScheduleSectionProps> = ({ isScheduleOn }) => {
    console.log("isScheduleOn:", isScheduleOn);
  return (
    <View style={styles.section}>
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleTitle}>Schedule</Text>
          <Text
            style={[
              styles.scheduleStatusText,
              {
                color: Colors.white, // Always white for good contrast against green background
              },
            ]}
          >
            {isScheduleOn ? "ON" : "OFF"}
          </Text>
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
  scheduleStatusText: {
    fontSize: 16, // Increased font size for better visibility
    fontWeight: "bold",
    // Color is dynamically set based on status
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
