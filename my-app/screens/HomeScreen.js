import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import menuIcon from './Images/Menu.png';
import logo from './Images/Logo.png';
import searchIcon from './Images/Search.png';
import shoppingBagIcon from './Images/shoppingBag.png';
import listViewIcon from './Images/Listview.png';
import filterIcon from './Images/Filter.png';
import addCircle from './Images/add_circle.png'; // Import the add_circle image

import dress1 from './Images/dress1.png';
import dress2 from './Images/dress2.png';
import dress3 from './Images/dress3.png';
import dress4 from './Images/dress4.png';
import dress5 from './Images/dress5.png';
import dress6 from './Images/dress6.png';
import dress7 from './Images/dress7.png';
import dress8 from './Images/dress3.png';

const products = [
  { id: '1', name: 'Office Wear', subtitle: 'Professional and chic', price: 120, image: dress1 },
  { id: '2', name: 'Classic Black Dress', subtitle: 'Timeless elegance', price: 120, image: dress2 },
  { id: '3', name: 'Church Wear', subtitle: 'Soft and Comfy', price: 120, image: dress3 },
  { id: '4', name: 'Recycle Boucle Knit Cardigan Pink', subtitle: 'Eco-friendly fashion', price: 130, image: dress4 },
  { id: '5', name: 'Summer Floral Dress', subtitle: 'Fresh and vibrant', price: 110, image: dress5 },
  { id: '6', name: 'Elegant Evening Gown', subtitle: 'Glamorous nights', price: 150, image: dress6 },
  { id: '7', name: 'Casual Day Dress', subtitle: 'Relaxed and comfy', price: 100, image: dress7 },
  { id: '8', name: 'Church Wear', subtitle: 'Reversible angora cardigan', price: 120, image: dress3 },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={menuIcon} style={styles.icon} />
        <Image source={logo} style={styles.logo} />
        <View style={styles.rightIcons}>
          <Image source={searchIcon} style={styles.icon} />
          <Image source={shoppingBagIcon} style={styles.icon} />
        </View>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>OUR STORY</Text>
        <View style={styles.subHeaderIcons}>
          <Image source={listViewIcon} style={styles.subHeaderIcon} />
          <Image source={filterIcon} style={styles.subHeaderIcon} />
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2} // Add this line to display items side by side
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productSubtitle}>{item.subtitle}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Image source={addCircle} style={styles.addButtonImage} />
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeaderIcons: {
    flexDirection: 'row',
  },
  subHeaderIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  product: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
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
  addButtonImage: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
