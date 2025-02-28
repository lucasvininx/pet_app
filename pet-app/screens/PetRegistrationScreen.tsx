"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from "react-native"
import { useTheme } from "../context/ThemeContext"
import Input from "../components/Input"
import Button from "../components/Button"
import PetTypeSelector from "../components/PetTypeSelector"
import DateTimePicker from "@react-native-community/datetimepicker"
import * as ImagePicker from "expo-image-picker"
import { FontAwesome5 } from "@expo/vector-icons"

interface PetRegistrationScreenProps {
  onLogout: () => void
}

const PetRegistrationScreen: React.FC<PetRegistrationScreenProps> = ({ onLogout }) => {
  const theme = useTheme()
  const [petName, setPetName] = useState("")
  const [petType, setPetType] = useState("")
  const [birthDate, setBirthDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate
    setShowDatePicker(Platform.OS === "ios")
    setBirthDate(currentDate)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const handleSubmit = () => {
    // Aqui você implementaria a lógica para salvar os dados do pet
    console.log("Dados do pet:", { petName, petType, birthDate, profileImage })
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Cadastre seu Pet</Text>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={[styles.placeholderImage, { backgroundColor: theme.colors.primaryLight }]}>
            <FontAwesome5 name="camera" size={40} color={theme.colors.primary} />
            <Text style={[styles.placeholderText, { color: theme.colors.primary }]}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <Input label="Nome do Pet" value={petName} onChangeText={setPetName} placeholder="Ex: Totó" />

      <Text style={[styles.label, { color: theme.colors.text }]}>Tipo de Pet</Text>
      <PetTypeSelector selectedType={petType} onSelectType={setPetType} />

      <Text style={[styles.label, { color: theme.colors.text }]}>Data de Nascimento</Text>
      <TouchableOpacity
        style={[styles.dateButton, { borderColor: theme.colors.primary }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: theme.colors.text }}>{birthDate.toLocaleDateString("pt-BR")}</Text>
      </TouchableOpacity>

      {showDatePicker && <DateTimePicker value={birthDate} mode="date" display="default" onChange={handleDateChange} />}

      <Button title="Cadastrar Pet" onPress={handleSubmit} />

      <Button title="Sair" onPress={onLogout} variant="outline" style={styles.logoutButton} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 20,
  },
})

export default PetRegistrationScreen

