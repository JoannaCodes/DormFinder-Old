import { Button, Box, Center, FormControl, Icon, IconButton, Input, HStack, Select, TextArea, VStack, Popover } from 'native-base'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
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
  price: '',
  property_name: ''
};

function DormListingForm() {
  // States
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState(initialState);
  const [images, setImages] = React.useState([]);

  // Form Submission
  const onSubmit = () => {
    // firebase
  };

  const onReset = () => {

  };

  // Image Picker
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: true,
        maxVideo: 1,
        maxSelectedAssets: 5,
        mediaType: 'images',
        usedCameraButton: true,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  const onDelete = (value) => {
    const data = images.filter(
      (item) =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier
    );
    setImages(data);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => onDelete(item)}
        activeOpacity={0.9}
      >
        <Box style={styles.card}>
          <Image
            source={{ uri: 'file://' + (item.realPath)}}
            style={styles.media}
          />
        </Box>
      </TouchableOpacity>
    );
  };

  // Display
  return (
    <VStack w='100%' p='5' space={5} alignItems='center' justifyContent='center'>
      {/* Form */}
      <FormControl isRequired>
        <FormControl.Label _text={{ bold: true }} alignItems="center">
          <Popover 
            placement={'right'}
            trigger={triggerProps => {
            return (
              <IconButton
                {...triggerProps} 
                icon={<Icon as={<MatIcons name="help-outline" />} />}
                _icon={{
                  color: "teal.700",
                  size: "md"
                }}
                p="0"
                mr="1"
              />
            )}}
          >
            <Popover.Content accessibilityLabel="Help" w="56">
              <Popover.Arrow />
              <Popover.Body>Tap image to remove it.</Popover.Body>
            </Popover.Content>
          </Popover>
          Property Images
        </FormControl.Label>
        <View style={styles.container}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatList}
            horizontal={true}
            data={images}
            keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
            renderItem={renderItem}
          />
        </View>
        <Button mt='5' colorScheme='teal' onPress={openPicker}>
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
        <Input 
          onChangeText={value => setFormData(key => { return { ...key, location: { ...key.location, address:value } } })}
          InputLeftElement={<Icon as={<MatIcons name="my-location" />} size={5} color={'teal.700'} ml="2"/>}
        />
        {/* <Text>{`[value: ${formData.location.address}]`}</Text> */}
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ bold: true }} alignItems="center">
          <Popover 
            placement={'right'}
            trigger={triggerProps => {
            return (
              <IconButton
                {...triggerProps} 
                icon={<Icon as={<MatIcons name="help-outline" />} />}
                _icon={{
                  color: "teal.700",
                  size: "md"
                }}
                p="0"
                mr="1"
              />
            )}}
          >
            <Popover.Content accessibilityLabel="Help" w="56">
              <Popover.Arrow />
              <Popover.Body>Only Manila Based Higher Education Institutions</Popover.Body>
            </Popover.Content>
          </Popover>
          Nearby Universities/Colleges
        </FormControl.Label>
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

const IMAGE_WIDTH = (width - 24) / 3;

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
    height: width * 0.5,
  },
  cardContainer: {
    height: '100%',
    marginRight: 8,
    width: width * 0.5,
  },
  card: {
    height: '100%',
    width: width * 0.5,
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: 'teal',
  },
})
