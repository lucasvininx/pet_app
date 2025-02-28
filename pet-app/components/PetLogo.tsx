import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { FontAwesome5 } from "@expo/vector-icons"

interface PetLogoProps {
  size?: "small" | "medium" | "large"
}

const PetLogo: React.FC<PetLogoProps> = ({ size = "medium" }) => {
  const theme = useTheme()

  const getSize = () => {
    switch (size) {
      case "small":
        return { iconSize: 30, fontSize: 20 }
      case "medium":
        return { iconSize: 50, fontSize: 28 }
      case "large":
        return { iconSize: 70, fontSize: 36 }
      default:
        return { iconSize: 50, fontSize: 28 }
    }
  }

  const { iconSize, fontSize } = getSize()

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
        <FontAwesome5 name="paw" size={iconSize} color={theme.colors.primary} />
      </View>
      <Text style={[styles.text, { color: theme.colors.primary, fontSize }]}>PetAmigos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    padding: 16,
    borderRadius: 100,
    marginBottom: 8,
  },
  text: {
    fontWeight: "bold",
  },
})

export default PetLogo

