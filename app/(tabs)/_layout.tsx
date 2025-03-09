import React, { useState, useCallback } from "react";
import { Stack } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 

/* INTERFACES */
interface HeaderProps {
  onToggleMenu: () => void;  // Função que não retorna nada
}

interface FooterProps {
  onWhatsAppPress: () => void;  // Função que não retorna nada
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleWhatsApp = useCallback(() => {
    const phone = "5583986326676";
    const url = `whatsapp://send?phone=${phone}&text=Olá!`;
    Linking.openURL(url).catch(() => {
      alert("Não foi possível abrir o WhatsApp");
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Header onToggleMenu={handleToggleMenu} />

      {/* MENU DROPDOWN */}
      {menuOpen && <MenuDropdown />}

      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} /> {/* Desabilita o header da navegação */}
      </View>

      {/* FOOTER */}
      <Footer onWhatsAppPress={handleWhatsApp} />
    </View>
  );
}

/* COMPONENTES SEPARADOS */

// Header
const Header: React.FC<HeaderProps> = ({ onToggleMenu }) => (
  <LinearGradient colors={["red", "#F9d428"]} style={styles.header}>
    <Image
      source={require("../../assets/images/LogoJapastel.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <TouchableOpacity onPress={onToggleMenu} style={styles.menuButton}>
      <MaterialIcons name="more-vert" size={30} color="#FFF" />
    </TouchableOpacity>
  </LinearGradient>
);

// Menu Dropdown
const MenuDropdown = () => (
  <View style={styles.menuDropdown}>
    {["Início", "Cardápio", "Pedidos"].map((item, index) => (
      <TouchableOpacity key={index} onPress={() => alert(`Ir para ${item}`)}>
        <Text style={styles.menuItem}>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
);   

// Footer
const Footer: React.FC<FooterProps> = ({ onWhatsAppPress }) => (
  <View style={styles.footer}>
    <Text style={styles.footerText}> Dúvidas? Nos chame no WhatsApp </Text>
    <TouchableOpacity onPress={onWhatsAppPress} style={styles.whatsAppButton}>
      <FontAwesome name="whatsapp" size={30} color="#25D366" />
    </TouchableOpacity>
    <MaterialIcons name="delivery-dining" size={30} color="red" style={{ marginLeft: 15 }} />
  </View>
);
  

/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menuButton: {
    marginLeft: "auto",
  },

  // MENU DROPDOWN
  menuDropdown: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    zIndex: 999,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: "#333",
  },

  // CONTEÚDO
  content: {
    flex: 1,
  },

  // FOOTER
  footer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#DDD",
  },
  whatsAppButton: {
    marginLeft: 10,
  },
});
