

import React, { useState } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, ScrollView, Image, Text, TouchableOpacity } from 'react-native';

const AppScreen = () => {
  const [activeTopTab, setActiveTopTab] = useState(0);

  const handleTopTabPress = (index) => {
    setActiveTopTab(index);
  };

  const renderProducts = () => {
    if (activeTopTab === 0) {
      return (
        <>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: 'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85OTYwZTA3ZGRmOGZjMGJkMmI0ZjdkZGE1M2YwZjQ5Nj9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.N05uRublKfWPdz2n6rTbdljKwYMJzif6XnKVApil9F8' }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>Product 1</Text>
          </View>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: 'https://blog.logrocket.com/wp-content/uploads/2022/09/logrocket-logo-frontend-analytics.png' }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>Product 2</Text>
          </View>
        </>
      );
    } else if (activeTopTab === 1) {
      return (
        <>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: 'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85NjM1NDA4OWJiODJkYWI4NDc0MjdlZGRhZDg2YzQ5Yj9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.qXBGkyX_16bCvEPkYM-FeU9E4dd7X8WHhDV2sS3j-0o' }}
              style={styles.productImage}
              resizeMode="stretch"
            />
            <Text style={styles.productTitle}>Product 3</Text>
          </View>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: 'https://reqres.in/img/faces/2-image.jpg' }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>Product 4</Text>
          </View>
        </>
      );
    } else if (activeTopTab === 2) {
      return (
        <>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: 'https://avatars3.githubusercontent.com/u/868803?v=4' }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.productTitle}>Product 5</Text>
          </View>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAoCAYAAAB99ePgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFqSURBVHgB7ZdBTsJAFED/TEEgYcERJAGNO7iBnEDZKHUj3EBPoJxAb6AuDCEu5Ag9AmuU0CM0MYakzcx3StKGEgt10lZN/lvN/P7Jf/kzbToABEH8D9h3weeZ2+IALcikIrPNZtFKlLoZGM+9O0C8ggxRRR8/P4rXgzZztuXx9clotuxnLeaDAP1y1d1ZJyJncOMScoJztrMWhz8MyelCcrqQnC4kpwvJ6UJyupCcLgX4LRD2x+8uRkNg9Rp7nWD+k86pX2qcQI4klbOlJ9rnjVJXouhATkS2VaAYqt4++WPOCyeqU6erBwiOeVSx/aHZrFhqO8I1ElGtkTakAEceufCwuET/ssO58RDMhcDuxWFp8jL3bpTQbSjniXognjaxcq8LrLnSW6iu1eJyNg9w2sSeuW6dOSjlEOJx0BMDyJCtL0SvWb6XciVgr8f9jjHpdrLazgCWNHH0tjz2v00GiOnZQXUKBEEQIV+vWHgAupTaQgAAAABJRU5ErkJggg==' }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productTitle}>Product 6</Text>
          </View>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci85OTYwZTA3ZGRmOGZjMGJkMmI0ZjdkZGE1M2YwZjQ5Nj9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.N05uRublKfWPdz2n6rTbdljKwYMJzif6XnKVApil9F8' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <TextInput
          style={styles.notificationInput}
          placeholder="Search"
        />
        <Image
          source={{ uri: 'https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAAcHTte4WAusk7fXIeZwCI1RMD2dOfOc3aK-AV3hcp46fQ%3Ds96-c&w=96&q=75' }}
          style={styles.cartIcon}
          resizeMode="contain"
        />
      </View>

      {/* Body */}
      <ScrollView style={styles.body}>
        {/* Top Tabs */}
        <View style={styles.topTabs}>
          <TouchableOpacity
            style={[styles.tab, activeTopTab === 0 && styles.activeTab]}
            onPress={() => handleTopTabPress(0)}
          >
            <Text style={[styles.tabText, activeTopTab === 0 && styles.activeTabText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTopTab === 1 && styles.activeTab]}
            onPress={() => handleTopTabPress(1)}
          >
            <Text style={[styles.tabText, activeTopTab === 1 && styles.activeTabText]}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTopTab === 2 && styles.activeTab]}
            onPress={() => handleTopTabPress(2)}
          >
            <Text style={[styles.tabText, activeTopTab === 2 && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
        </View>

        {/* Products */}
        {renderProducts()}
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <Text style={styles.tabText}>Home</Text>
        <Text style={styles.tabText}>Categories</Text>
        <Text style={styles.tabText}>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF4081',
  },
  logo: {
    width: 100,
    height: 40,
  },
  notificationInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 30,
    height: 30
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  body: {
    flex: 1,
    padding: 20,
  },
  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  activeTab: {
    backgroundColor: '#FF4081',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  productContainer: {
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
});

export default AppScreen;
