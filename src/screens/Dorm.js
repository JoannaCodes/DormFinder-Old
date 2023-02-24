import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Dorm = ({route}) => {
  const { dormKey } = route.params;
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={{uri: 'https://picsum.photos/seed/picsum/200/300'}}
        />
        <View style={styles.infoContainer}>
          <Text fontSize="3xl" fontWeight="bold">Dorm Name</Text>
          <Text fontSize="lg" fontWeight="bold">$$$$$</Text>
          <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id justo id erat sodales consequat. Vivamus purus felis, suscipit ut dolor et, vehicula volutpat sapien. Sed ac mollis ante. Etiam molestie nulla eros, in feugiat nunc commodo non. Integer blandit a mi sed mattis. Suspendisse egestas ullamcorper malesuada</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dorm

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
})