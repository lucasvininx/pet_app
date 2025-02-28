import type React from "react"
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, type StyleProp, type ViewStyle } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  loading?: boolean
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style,
}) => {
  const theme = useTheme()

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        }
      case "secondary":
        return {
          backgroundColor: theme.colors.primaryLight,
          borderColor: theme.colors.primaryLight,
        }
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.colors.primary,
        }
      default:
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        }
    }
  }

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return { color: theme.colors.primary }
      default:
        return { color: "#FFFFFF" }
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" ? theme.colors.primary : "#FFFFFF"} />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
})

export default Button

