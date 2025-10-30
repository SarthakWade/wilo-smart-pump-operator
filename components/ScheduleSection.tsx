import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface ScheduleSectionProps {
  isScheduleOn: boolean;
  nextRunTime?: string;
  runsToday?: number;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  isScheduleOn,
  nextRunTime = "9:00 AM",
  runsToday = 3,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <View style={styles.headerLeft}>
            <Ionicons name="calendar-outline" size={20} color={Colors.white} />
            <Text style={styles.scheduleTitle}>AI Schedule</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isScheduleOn
                  ? "rgba(255, 255, 255, 0.25)"
                  : "rgba(255, 68, 68, 0.3)",
              },
            ]}
          >
            <Text style={styles.scheduleStatusText}>
              {isScheduleOn ? "ACTIVE" : "PAUSED"}
            </Text>
          </View>
        </View>

        {isScheduleOn && (
          <View style={styles.scheduleDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color={Colors.white} />
              <Text style={styles.scheduleDetailText}>
                Next run: {nextRunTime} (1.20 mins)
              </Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{runsToday}</Text>
                <Text style={styles.statLabel}>Runs Today</Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>87%</Text>
                <Text style={styles.statLabel}>Efficiency</Text>
              </View>
            </View>
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
  },
  scheduleStatusText: {
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
    fontSize: 13,
    color: Colors.white,
    marginLeft: 8,
    flex: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexShrink: 0,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
  },
  dividerVertical: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default ScheduleSection;
