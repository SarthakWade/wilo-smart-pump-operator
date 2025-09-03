import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { Colors } from "../constants/Colors";

interface Schedule {
  id: string;
  date: string;
  time: string;
  duration: string;
}

interface ManualScheduleSectionProps {
  isManualScheduleOn: boolean;
  toggleManualSchedule: () => void;
}

const ManualScheduleSection: React.FC<ManualScheduleSectionProps> = ({
  isManualScheduleOn,
  toggleManualSchedule,
}) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDuration, setSelectedDuration] = useState("30 mins");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddSchedule = () => {
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      time: selectedTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }), // Format as HH:MM
      duration: selectedDuration,
    };
    setSchedules([...schedules, newSchedule]);
    setShowAddPopup(false);
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateTitle}>No Schedules Added</Text>
      <Text style={styles.emptyStateSubtitle}>
        Tap + to add your first schedule
      </Text>
      <Pressable style={styles.addButton} onPress={() => setShowAddPopup(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </View>
  );

  const renderSchedulesList = () => (
    <View style={styles.schedulesContainer}>
      <View style={styles.schedulesHeader}>
        <Text style={styles.schedulesTitle}>Active Schedules</Text>
        <Pressable
          style={styles.addButtonSmall}
          onPress={() => setShowAddPopup(true)}
        >
          <Text style={styles.addButtonTextSmall}>+</Text>
        </Pressable>
      </View>
      {schedules.map((schedule) => (
        <View key={schedule.id} style={styles.scheduleItem}>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTime}>
              {schedule.date} at {schedule.time}
            </Text>
            <Text style={styles.scheduleDetails}>
              Duration: {schedule.duration}
            </Text>
          </View>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteSchedule(schedule.id)}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );

  const renderAddSchedulePopup = () => (
    <Modal
      transparent={true}
      visible={showAddPopup}
      animationType="fade"
      onRequestClose={() => setShowAddPopup(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header with Close Button */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Schedule</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setShowAddPopup(false)}
            >
              <Ionicons name="close" size={24} color={Colors.white} />
            </Pressable>
          </View>

          {/* Date Picker Section */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Date</Text>
            <Pressable
              style={styles.pickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.pickerButtonText}>
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={Colors.white}
              />
            </Pressable>
          </View>

          {/* Time Picker Section */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Time</Text>
            <Pressable
              style={styles.pickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.pickerButtonText}>
                {selectedTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
              <Ionicons name="time-outline" size={20} color={Colors.white} />
            </Pressable>
          </View>

          {/* Duration Section */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Duration</Text>
            <View style={styles.timeOptions}>
              {["15 mins", "30 mins", "1 hour", "2 hours", "4 hours"].map(
                (duration) => (
                  <Pressable
                    key={duration}
                    style={[
                      styles.timeOption,
                      selectedDuration === duration && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedDuration(duration)}
                  >
                    <Text
                      style={[
                        styles.timeOptionText,
                        selectedDuration === duration &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {duration}
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setShowAddPopup(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={handleAddSchedule}>
              <Text style={styles.confirmButtonText}>Add Schedule</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Date Picker Modal */}
      <DatePicker
        modal
        open={showDatePicker}
        date={selectedDate}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        theme="dark"
      />

      {/* Time Picker Modal */}
      <DatePicker
        modal
        open={showTimePicker}
        date={selectedTime}
        mode="time"
        onConfirm={(time) => {
          setSelectedTime(time);
          setShowTimePicker(false);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
        theme="dark"
      />
    </Modal>
  );
  return (
    <View style={styles.section}>
      {/* Toggle Header */}
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

      {/* Content Based on Toggle State */}
      {isManualScheduleOn && (
        <View style={styles.scheduleContent}>
          {schedules.length === 0 ? renderEmptyState() : renderSchedulesList()}
        </View>
      )}

      {/* Add Schedule Popup */}
      {renderAddSchedulePopup()}
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
    marginBottom: 12,
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
  scheduleContent: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Empty State Styles
  emptyStateContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    textAlign: "center",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.wiloGreen,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: "300",
  },
  // Schedules List Styles
  schedulesContainer: {},
  schedulesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  schedulesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  addButtonSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.wiloGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonTextSmall: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "300",
  },
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    marginBottom: 8,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTime: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  scheduleDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "bold",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#1A2A3A", // Dark popup background as requested
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.white,
    flex: 1,
  },
  closeButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  formSection: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    marginBottom: 12,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  pickerButtonText: {
    fontSize: 16,
    color: Colors.white,
    flex: 1,
  },
  timeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dateOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dateOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 80,
    alignItems: "center",
  },
  dateOptionText: {
    fontSize: 14,
    color: Colors.white,
    textAlign: "center",
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  selectedOption: {
    backgroundColor: Colors.wiloGreen,
    borderColor: Colors.wiloGreen,
  },
  timeOptionText: {
    fontSize: 14,
    color: Colors.white,
  },
  selectedOptionText: {
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: Colors.white,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.wiloGreen,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});

export default ManualScheduleSection;
