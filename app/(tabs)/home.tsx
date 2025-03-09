import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  const handleNavigateTo = (route: string) => {
    // Aqui você pode implementar a lógica de navegação para cada tela
    // Exemplo: router.push(route);
    alert(`Navegar para: ${route}`);
  };

  const handleWhatsApp = () => {
    // Exemplo de abertura do WhatsApp
    // Ajuste o "phone" para o número correto (com DDI e DDD)
    const phone = '5561999999999';
    const url = `whatsapp://send?phone=${phone}&text=Olá!`;
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o WhatsApp');
    });
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER (barra superior) */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/LogoJapastel.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => handleNavigateTo('Inicio')}>
            <Text style={styles.menuItem}>Início</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigateTo('Cardapio')}>
            <Text style={styles.menuItem}>Cardápio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigateTo('Pedidos')}>
            <Text style={styles.menuItem}>Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigateTo('Fidelizacao')}>
            <Text style={styles.menuItem}>Programa de Fidelização</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BANNER */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>
          ENTREGA GRÁTIS PARA TODA A CIDADE
        </Text>
      </View>

      {/* LISTA DE PRODUTOS */}
      <ScrollView style={styles.scrollContainer}>
        {/* Seção de pastéis */}
        <Text style={styles.sectionTitle}>Pastéis</Text>

        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/pastel_queijo.png')}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Pastel de Queijo</Text>
            <Text style={styles.itemDescription}>
              Pastel frito com recheio de queijo
            </Text>
            <Text style={styles.itemPrice}>R$ 16,00</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/pastel_camarao.png')}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Pastel de Camarão</Text>
            <Text style={styles.itemDescription}>
              Pastel frito com recheio de camarão
            </Text>
            <Text style={styles.itemPrice}>R$ 18,00</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/pastel_franpiry.png')}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Pastel de FranPiry</Text>
            <Text style={styles.itemDescription}>
              Pastel frito com frango desfiado e catupiry
            </Text>
            <Text style={styles.itemPrice}>R$ 16,00</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/pastel_carne.png')}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Pastel de Carne</Text>
            <Text style={styles.itemDescription}>
              Pastel frito com carne moida e bacon
            </Text>
            <Text style={styles.itemPrice}>R$ 16,00</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        {/* Exemplo de outra seção, como bebidas */}
        <Text style={styles.sectionTitle}>Bebidas</Text>

        <View style={styles.itemCard}>
          <Image
            source={require('../../assets/images/refrigerante.png')}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>Refrigerantes</Text>
            <Text style={styles.itemDescription}>
            Refrigerante de Melão, Mirtilo, Morango, Original, Laranja
            </Text>
            <Text style={styles.itemPrice}>R$ 5,00</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <FontAwesome name="shopping-cart" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BARRA INFERIOR */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Dúvidas? Nos chame no WhatsApp</Text>
        <TouchableOpacity onPress={handleWhatsApp} style={styles.whatsAppButton}>
          <FontAwesome name="whatsapp" size={30} color="#25D366" />
        </TouchableOpacity>
        {/* Ícone de motoboy, por exemplo */}
        <MaterialIcons name="delivery-dining" size={30} color="red" style={{ marginLeft: 15 }} />
      </View>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  // HEADER
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CE0000', // vermelho mais fechado
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flex: 1
  },
  menuItem: {
    color: '#FFF',
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 14
  },

  // BANNER
  bannerContainer: {
    backgroundColor: '#FFD700', // amarelo para destaque
    padding: 10,
    alignItems: 'center'
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CE0000'
  },

  // SCROLL (LISTA DE ITENS)
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CE0000',
    marginBottom: 5,
    marginTop: 10
  },

  // ITEM
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
    padding: 10
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  itemDescription: {
    fontSize: 14,
    color: '#666'
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#CE0000'
  },
  cartButton: {
    backgroundColor: '#CE0000',
    borderRadius: 25,
    padding: 10
  },

  // FOOTER
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD'
  },
  footerText: {
    fontSize: 14,
    color: '#333'
  },
  whatsAppButton: {
    marginLeft: 10
  }
});
