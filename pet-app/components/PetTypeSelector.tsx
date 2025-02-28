import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { FontAwesome5 } from "@expo/vector-icons"

interface PetType {
  id: string
  name: string
  icon: string
}

const petTypes: PetType[] = [
  { id: "dog", name: "Cachorro", icon: "dog" },
  { id: "cat", name: "Gato", icon: "cat" },
  { id: "bird", name: "Pássaro", icon: "dove" },
  { id: "rabbit", name: "Coelho", icon: "rabbit" },
  { id: "fish", name: "Peixe", icon: "fish" },
  { id: "other", name: "Outro", icon: "paw" },
]

interface PetTypeSelectorProps {
  selectedType: string
  onSelectType: (type: string) => void
}

const PetTypeSelector: React.FC<PetTypeSelectorProps> = ({ selectedType, onSelectType }) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      {petTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.typeButton,
            { borderColor: theme.colors.primary },
            selectedType === type.id && { backgroundColor: theme.colors.primary },
          ]}
          onPress={() => onSelectType(type.id)}
        >
          <FontAwesome5
            name={type.icon}
            size={24}
            color={selectedType === type.id ? theme.colors.background : theme.colors.primary}
          />
          <Text
            style={[
              styles.typeName,
              { color: selectedType === type.id ? theme.colors.background : theme.colors.primary },
            ]}
          >
            {type.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  typeButton: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  typeName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
})

export default PetTypeSelector

