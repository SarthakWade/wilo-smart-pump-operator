import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ManualScheduleSection from "../components/ManualScheduleSection";
import PumpAndModeSection from "../components/PumpAndModeSection";
import ScheduleSection from "../components/ScheduleSection";
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
}

const Dashboard = () => {
  const [pumpData, setPumpData] = useState<PumpData>({
    isOn: true,
    pressure: "0 bar",
    flow: "0 L/min",
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
      name: "Upper tank(s)",
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

  const toggleSchedule = () => {
    setIsScheduleOn(!isScheduleOn);
  };

  const toggleManualSchedule = () => {
    setIsManualScheduleOn(!isManualScheduleOn);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Ved Vihar</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
        />

        {/* Schedule Section */}
        <ScheduleSection
          isScheduleOn={isScheduleOn}
          toggleSchedule={toggleSchedule}
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
    backgroundColor: Colors.lightGrey,
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

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Dashboard;
