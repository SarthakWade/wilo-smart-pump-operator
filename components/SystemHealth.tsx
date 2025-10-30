import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

interface SystemHealthProps {
  status: "excellent" | "good" | "warning" | "critical";
  message: string;
  lastUpdated?: string;
}

const SystemHealth: React.FC<SystemHealthProps> = ({
  status,
  message,
  lastUpdated,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "excellent":
        return {
          color: Colors.statusSuccess,
          icon: "checkmark-circle" as const,
          label: "System Optimal",
        };
      case "good":
        return {
          color: Colors.blue,
          icon: "information-circle" as const,
          label: "All Systems Normal",
        };
      case "warning":
        return {
          color: Colors.statusWarning,
          icon: "warning" as const,
          label: "Attention Required",
        };
      case "critical":
        return {
          color: Colors.statusCritical,
          icon: "alert-circle" as const,
          label: "Critical Alert",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.container, { borderLeftColor: config.color }]}>
      <View style={styles.header}>
        <Ionicons name={config.icon} size={24} color={config.color} />
        <View style={styles.headerText}>
          <Text style={[styles.statusLabel, { color: config.color }]}>
            {config.label}
          </Text>
          {lastUpdated && (
            <Text style={styles.lastUpdated}>Updated {lastUpdated}</Text>
          )}
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  lastUpdated: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default SystemHealth;
