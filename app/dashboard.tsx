import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ManualScheduleSection from "../components/ManualScheduleSection";
import PumpAndModeSection from "../components/PumpAndModeSection";
import QuickStats from "../components/QuickStats";
import ScheduleSection from "../components/ScheduleSection";
import SystemHealth from "../components/SystemHealth";
import TanksSection from "../components/TanksSection";
import { Colors } from "../constants/Colors";

interface TankData {
  id: string;
  name: string;
  percentage: number;
  capacity: string;
  temperature: string;
  currentVolume: number;
}

interface PumpData {
  isOn: boolean;
  pressure: string;
  flow: string;
  runtime?: string;
  nextRun?: string;
}

const Dashboard = () => {
  const [pumpData, setPumpData] = useState<PumpData>({
    isOn: true,
    pressure: "2.5 bar",
    flow: "45 L/min",
    runtime: "2.5 hrs",
    nextRun: "3:30 PM",
  });

  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isScheduleOn, setIsScheduleOn] = useState(true);
  const [isManualScheduleOn, setIsManualScheduleOn] = useState(false);
  const [currentUpperTankIndex, setCurrentUpperTankIndex] = useState(0);

  // Multiple upper tanks data
  const upperTanks: TankData[] = [
    {
      id: "1",
      name: "Upper tank(s)",
      percentage: 70,
      capacity: "10000 L",
      temperature: "22°C",
      currentVolume: 7000,
    },
    {
      id: "2",
      name: "Upper tank(s)",
      percentage: 85,
      capacity: "8000 L",
      temperature: "21°C",
      currentVolume: 6800,
    },
    {
      id: "3",
      name: "Upper tanks",
      percentage: 45,
      capacity: "12000 L",
      temperature: "23°C",
      currentVolume: 5400,
    },
  ];

  // Main tank data
  const mainTank: TankData = {
    id: "main",
    name: "Main tank",
    percentage: 50,
    capacity: "10000 L",
    temperature: "22°C",
    currentVolume: 8000,
  };

  const togglePump = () => {
    setPumpData((prev) => ({ ...prev, isOn: !prev.isOn }));
  };

  const toggleAutoMode = () => {
    const newAutoMode = !isAutoMode;
    setIsAutoMode(newAutoMode);

    // Automatically turn on manual override when switching from auto to manual
    if (!newAutoMode) {
      setIsManualScheduleOn(true);
    }
  };

  const toggleManualSchedule = () => {
    setIsManualScheduleOn(!isManualScheduleOn);
  };

  // Quick stats data
  const quickStats = [
    {
      icon: "water" as const,
      label: "Water Pumped Today",
      value: "1,250 L",
      color: Colors.blue,
    },
    {
      icon: "flash" as const,
      label: "Power Saved",
      value: "18%",
      color: Colors.wiloGreen,
    },
    {
      icon: "speedometer" as const,
      label: "Avg Pressure",
      value: "2.3 bar",
      color: Colors.orange,
    },
    {
      icon: "trending-up" as const,
      label: "Efficiency",
      value: "87%",
      color: Colors.statusSuccess,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Ved Vihar</Text>
        <Text style={styles.headerSubtext}>Facility Dashboard</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* System Health Status */}
        <SystemHealth
          status="excellent"
          message="All systems operating normally. AI is learning your usage patterns."
          lastUpdated="2 mins ago"
        />

        {/* Quick Stats */}
        <QuickStats stats={quickStats} />

        {/* Tank Info Cards */}
        <TanksSection
          upperTanks={upperTanks}
          mainTank={mainTank}
          currentUpperTankIndex={currentUpperTankIndex}
          setCurrentUpperTankIndex={setCurrentUpperTankIndex}
        />

        {/* Pump & Mode Section */}
        <PumpAndModeSection
          pumpData={pumpData}
          isAutoMode={isAutoMode}
          togglePump={togglePump}
          toggleAutoMode={toggleAutoMode}
          aiConfidence={87}
        />

        {/* Schedule Section */}
        <ScheduleSection
          isScheduleOn={isScheduleOn}
          nextRunTime="9:00 AM"
          runsToday={3}
        />

        {/* Manual Schedule Toggle */}
        <ManualScheduleSection
          isManualScheduleOn={isManualScheduleOn}
          toggleManualSchedule={toggleManualSchedule}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.headerBackground,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  headerText: {
    fontSize: 24,
    marginTop: 28,
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "left",
  },
  headerSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "left",
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Dashboard;
