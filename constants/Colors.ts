/**
 * Color constants for the Wilo Smart Pump Operator app
 */
export const Colors = {
  // Primary brand colors
  wiloGreen: '#009C82',
  wiloGreenLight: '#00B899',
  wiloGreenDark: '#007A67',
  teal: '#008B8B',
  
  // Common colors
  white: '#ffffff',
  black: '#000000',
  lightGrey: '#f5f5f5',
  grey: '#e0e0e0',
  darkGrey: '#888888',
  red: '#ff4444',
  blue: '#2196F3',
  orange: '#FF9800',
  yellow: '#FFC107',
  
  // Text colors
  textPrimary: '#000000',
  textSecondary: '#888888',
  textLight: '#ffffff',
  textMuted: '#AAAAAA',
  
  // Background colors
  background: '#F8F9FA',
  cardBackground: '#ffffff',
  headerBackground: '#009C82',
  scheduleBackground: '#4CAF50',
  
  // Status colors
  statusOn: '#4CAF50',
  statusOff: '#ff4444',
  statusWarning: '#FF9800',
  statusInfo: '#2196F3',
  statusSuccess: '#4CAF50',
  statusLow: '#FF9800',
  statusCritical: '#ff4444',
  
  // Border colors
  border: '#e0e0e0',
  divider: '#cccccc',
  
  // Opacity variants
  wiloGreenOpacity10: 'rgba(0, 156, 130, 0.1)',
  wiloGreenOpacity20: 'rgba(0, 156, 130, 0.2)',
  blackOpacity05: 'rgba(0, 0, 0, 0.05)',
  blackOpacity10: 'rgba(0, 0, 0, 0.1)',
} as const;

export default Colors;