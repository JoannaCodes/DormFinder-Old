import { Button, Box, Center, FormControl, Icon, IconButton, Input, HStack, Select, TextArea, VStack } from 'native-base'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import React from 'react'

const initialState = {
  amenities: {
    aircon: false,
    kitchen: false,
    laundromat: false,
    lounge: false,
    parking: false,
    refridgerator: false,
    sink: false,
    studyarea: false,
    wifi: false,
    // Add more amenities
  },
  author_id: '',
  description: '',
  location: {
    address: '',
    latitude: 0,
    longitude: 0,
  },
  nearby_school: {
    dlsu: false,
    feu: false,
    pup: false,
    up: false,
    ust: false,
    // Add more schools
  },
  price: '$1000',
  property_name: 'Holiday Inn'
};

const dummyData = [
  {
    id: 1,
    name: "image card",
    color: "orange",
  },
  {
    id: 2,
    name: "image card",
    color: "red",
  },
  {
    id: 3,
    name: "image card",
    color: "green",
  },
  {
    id: 4,
    name: "image card",
    color: "blue",
  },
  {
    id: 5,
    name: "image card",
    color: "teal",
  },
];

function DormListingForm() {
  // States
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState(initialState);
  const [images, setImages] = React.useState(dummyData);

  // Form Submission
  const onSubmit = () => {
    // firebase
  };

  const onReset = () => {

  };

  // Image Picker
  const removeItem = (id) => {
    let arr = images.filter(function(item) {
      return item.id !== id
    })
    setImages(arr);
  };
  //make flatlist container disapper when no images

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => removeItem(item.id)}
      >
        <Box style={[styles.card, {backgroundColor: item.color}]}>
          <Text style={styles.text}>{item.name}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  // Display
  return (
    <VStack w='100%' p='5' space={5} alignItems='center' justifyContent='center'>
      {/* Form */}
      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }}>Property Images</FormControl.Label>
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
            horizontal={true}
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
        <FormControl.HelperText>Tap image to remove it</FormControl.HelperText>
        <Button mt='5' colorScheme='teal'>
          Upload Image
        </Button>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }}>Property Name</FormControl.Label>
        <Input onChangeText={value => setFormData({ ...formData, property_name: value})}/>
        {/* <Text>{`[value: ${formData.property_name}]`}</Text> */}
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }}>Description</FormControl.Label>
        <TextArea 
          onChangeText={value => setFormData({ ...formData, description: value})}
          placeholder='Type all information that cannot be provided in the form'
        />
        {/* <Text>{`[value: ${formData.description}]`}</Text> */}
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ bold: true }}>Amenities</FormControl.Label>
        <HStack space={5}>
          <View>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.aircon} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, aircon:value } } })}/>
              <Text>Air Conditioning</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.kitchen} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, kitchen:value } } })}/>
              <Text>Kitchen</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.laundromat} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, laundromat:value } } })}/>
              <Text>Laundromat</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.lounge} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, lounge:value } } })}/>
              <Text>Lounge</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.parking} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, parking:value } } })}/>
              <Text>Parking</Text>
            </HStack>
          </View>

          <View>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.refridgerator} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, refridgerator:value } } })}/>
              <Text>Refridgerator</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.sink} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, sink:value } } })}/>
              <Text>Sink</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.studyarea} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, studyarea:value } } })}/>
              <Text>Study Area</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.amenities.wifi} onValueChange={value => setFormData(key => { return { ...key, amenities: { ...key.amenities, wifi:value } } })}/>
              <Text>WiFi</Text>
            </HStack>
          </View>
        </HStack>
      </FormControl>

      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }}>Location</FormControl.Label>
        <Input onChangeText={value => setFormData(key => { return { ...key, location: { ...key.location, address:value } } })}/>
        {/* <Text>{`[value: ${formData.location.address}]`}</Text> */}
        <FormControl.HelperText>Press 'Icon' to automaticaly detect address</FormControl.HelperText>
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ bold: true }}>Nearby Universities/Colleges</FormControl.Label>
        <HStack space={5}>
          <View>
            <HStack alignItems='center'>
              <CheckBox value={formData.nearby_school.dlsu} onValueChange={value => setFormData(key => { return { ...key, nearby_school: { ...key.nearby_school, dlsu:value } } })}/>
              <Text>DLSU</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.nearby_school.feu} onValueChange={value => setFormData(key => { return { ...key, nearby_school: { ...key.nearby_school, feu:value } } })}/>
              <Text>FEU</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.nearby_school.pup} onValueChange={value => setFormData(key => { return { ...key, nearby_school: { ...key.nearby_school, pup:value } } })}/>
              <Text>PUP</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.nearby_school.up} onValueChange={value => setFormData(key => { return { ...key, nearby_school: { ...key.nearby_school, up:value } } })}/>
              <Text>UP</Text>
            </HStack>
            <HStack alignItems='center'>
              <CheckBox value={formData.nearby_school.ust} onValueChange={value => setFormData(key => { return { ...key, nearby_school: { ...key.nearby_school, ust:value } } })}/>
              <Text>UST</Text>
            </HStack>
          </View>
        </HStack>
        <FormControl.HelperText>*Manila Based Higher Education Institutions</FormControl.HelperText>
      </FormControl>

      {/* Buttons */}
      <HStack p={3} space={5} alignItems='center' justifyContent='space-between'>
        <Button w='50%' colorScheme='teal'>
          Submit
        </Button>
        <Button w='50%' colorScheme="teal">
          Reset
        </Button>
      </HStack>
    </VStack>
  );
}

const Listing = () => {
  return (
    <KeyboardAwareScrollView>
      <Center flex={1}>
        <DormListingForm />
      </Center>
    </KeyboardAwareScrollView>
  )
}

export default Listing

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardContainer: {
    height: 150,
    marginRight: 8,
    width: width * 0.5,
  },
  card: {
    borderRadius: 6,
    height: 150,
    padding: 10,
    width: width * 0.5,
  },
  text: { color: 'white', fontWeight: 'bold' }
})
