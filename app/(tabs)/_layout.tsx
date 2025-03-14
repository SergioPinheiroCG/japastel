import React, { useState, useCallback } from "react";
import { Stack } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import { CartProvider } from "../../context/CartContext";
import { Entypo } from '@expo/vector-icons';

interface FooterProps {
  onWhatsAppPress: () => void;
}

interface HeaderProps {
  onToggleMenu: () => void;
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
    <CartProvider>
      <View style={styles.container}>
        <Header onToggleMenu={handleToggleMenu} />
        {menuOpen && <MenuDropdown onCloseMenu={handleToggleMenu} />}
        <View style={styles.content}>
          <Stack>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="pedido" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
          </Stack>
        </View>
        <Footer onWhatsAppPress={handleWhatsApp} />
      </View>
    </CartProvider>
  );
}

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
const MenuDropdown = ({ onCloseMenu }: { onCloseMenu: () => void }) => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    if (route === "Início") {
      router.push('../welcome');
    } else if (route === "Pedidos") {
      router.push('/(tabs)/pedido');
    } else if (route === "Carrinho") {
      router.push('/(tabs)/cart');
    }
    onCloseMenu(); // Fechar o menu após a navegação
  };

  return (
    <View style={styles.menuDropdown}>
      {["Início", "Pedidos", "Carrinho"].map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleNavigation(item)}
        >
          <Text style={styles.menuItem}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  content: {
    flex: 1,
  },
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