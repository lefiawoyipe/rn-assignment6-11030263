import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from './Images/Logo.png'; // Import the logo image
import searchIcon from './Images/Search.png'; // Import the search image
import removeIcon from './Images/remove.png'; // Import the remove image

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    fetchCart();
  }, []);

  const removeFromCart = async (product) => {
    const newCart = cart.filter(item => item.id !== product.id);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image source={logo} style={styles.logo} />
          <TouchableOpacity onPress={() => {/* Add search functionality here */}}>
            <Image source={searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Ensure unique keys
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productSubtitle}>{item.subtitle}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <View style={styles.removeButtonContainer}>
              <TouchableOpacity onPress={() => removeFromCart(item)}>
                <Image source={removeIcon} style={styles.removeButtonImage} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={() => {/* Add checkout functionality here */}}>
        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cartButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  searchIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  cartItem: {
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  removeButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  removeButtonImage: {
    width: 30,
    height: 30,
  },
  checkoutButton: {
    backgroundColor: '#000', // Black background for the checkout button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cartButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
