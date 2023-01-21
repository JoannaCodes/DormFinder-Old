import { ActivityIndicator, Alert, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, FormControl, HStack, Icon, IconButton, Input, Select, Text, TextArea, VStack } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker'
import React from 'react'

import { db, storage } from '../../environment/config'
import { ref as ref_db, push, set, child, update } from 'firebase/database'
import { ref as ref_storage, uploadBytes } from 'firebase/storage'

import * as Yup from 'yup'
import { Formik } from 'formik'

const DormForm = () => {
  const initialState = {
    address: '',
    amenities: {
      aircon: false,
      kitchen: false,
      cctv: false,
      security: false,
      parking: false,
      refridgerator: false,
      sink: false,
      studyarea: false,
      wifi: false,
      // Add more amenities
    },
    authorId: '2a26304e-0a4e-47a3-9cfb-69107a3174ce',
    description: '',
    schools: {
      dlsu: false,
      feu: false,
      pup: false,
      up: false,
      ust: false,
      // Add more schools
    },
    price: '',
    propertyName: '',
  };

  // States
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
      console.log(response);
      setImages(response);
      //.map((image) => { return image.fileName })
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

  // Flatlist Render
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => onDelete(item)}
        activeOpacity={0.9}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.path}}
            style={styles.media}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={styles.emptyComponent}>
        <View alignItems='center'>
          <Icon as={MatIcons} name='help-outline' size='2xl' color='muted.400'/>
          <Text color={'muted.400'}>Tap image to remove it from list.</Text>
          <Text color={'muted.400'} textAlign={'center'}>If no image is selected, the default image will be used.</Text>
        </View>
      </View>
    );
  };

  // Form Handlers
  const DormFormSchema = Yup.object().shape({
    propertyName: Yup.string().required('This is required'),
    price: Yup.string().required('This is required'),
    description: Yup.string().required('This is required'),
    address: Yup.string().required('This is required'),
  })

  const onSubmit = (values, actions) => {
    const dormListRef = ref_db(db, 'dorms');
    const newDormRef = push(dormListRef);
    const dormKey = newDormRef.key;

    setLoading(true);

    try {
      // Database
      set(newDormRef, {
        amenities: values.amenities,
        author_id: values.authorId,
        description: values.description,
        location: {
          address: values.address,
          longitude: 0,
          latitude: 0,
        },
        nearby_school: values.schools,
        price: values.price,
        property_name: values.propertyName,
      }).then((snapshot) => {
        // Storage
        images.map((image) => {
          const metadata = {
            contentType: image.mime,
          };

          const dormImagesRef = ref_storage(storage, `dorm-images/${dormKey}/${image.localIdentifier}`);
          uploadBytes(dormImagesRef, image.path, metadata).then((snapshot) => {
            console.log('Uploaded image');
          });
        });

        setLoading(false);
        Alert.alert('Message', 'Dorm Listed Successfully!', [
          {text: 'OK', onPress: () => {
            actions.resetForm();
            setImages([]);
          }},
        ]);
      });
    } catch (error) {
      Alert.alert('Message', 'An error occured. Please try again later.')
      console.log(error);
    };
  };

  return (
    <View>
      <KeyboardAwareScrollView>
        <Formik
          initialValues={initialState}
          onSubmit={onSubmit}
          onReset={() => { setImages([]); }}
          validateOnMount={true}
          validationSchema={DormFormSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, handleReset, setFieldValue, values, errors}) => (
            <VStack w='100%' p='5' space={5} alignItems='center' justifyContent='center'>
              <FormControl>
                <FormControl.Label _text={{ bold: true }} alignItems="flex-end">Property Images</FormControl.Label>
                <View style={styles.container} >
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                    horizontal={true}
                    data={images}
                    keyExtractor={(item, index) => (item?.fileName ?? item?.path) + index}
                    renderItem={renderItem}
                    ListEmptyComponent={emptyComponent}
                  />
                </View>
                <Button mt='5' colorScheme='teal' onPress={openPicker}>Select Images</Button>
              </FormControl>
              
              <FormControl isRequired isInvalid={'propertyName' in errors}>
                <FormControl.Label _text={{ bold: true }}>Property Name</FormControl.Label>
                <Input bg={'light.50'} 
                  value={values.propertyName} 
                  onBlur={handleBlur('propertyName')} 
                  onChangeText={handleChange('propertyName')}
                />
                <FormControl.ErrorMessage>{errors.propertyName}</FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'price' in errors}>
                <FormControl.Label _text={{ bold: true }}>Price</FormControl.Label>
                <Input bg={'light.50'} keyboardType='numeric'
                  value={values.price} 
                  onBlur={handleBlur('price')} 
                  onChangeText={handleChange('price')}
                />
                  <FormControl.ErrorMessage>{errors.price}</FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'description' in errors}>
                <FormControl.Label _text={{ bold: true }}>Description</FormControl.Label>
                <TextArea bg={'light.50'} placeholder='Type all information that cannot be provided in the form'
                  value={values.description}  
                  onBlur={handleBlur('description')} 
                  onChangeText={handleChange('description')}
                />
                <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'address' in errors}>
                <FormControl.Label _text={{ bold: true }}>Address</FormControl.Label>
                <Input bg={'light.50'}
                  value={values.address}  
                  onBlur={handleBlur('address')} 
                  onChangeText={handleChange('address')}
                />
                <FormControl.ErrorMessage>{errors.address}</FormControl.ErrorMessage>
              </FormControl>

              <FormControl>
                <FormControl.Label _text={{ bold: true }}>Amenities</FormControl.Label>
                <HStack space={5}>
                  <VStack>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.aircon} onValueChange={value => setFieldValue('amenities.aircon', value)}/>
                      Air Conditioning
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.cctv} onValueChange={value => setFieldValue('amenities.cctv', value)}/>
                      CCTV Coverage
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.kitchen} onValueChange={value => setFieldValue('amenities.kitchen', value)}/>
                      Kitchen
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.parking} onValueChange={value => setFieldValue('amenities.parking', value)}/>
                      Parking
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.refridgerator} onValueChange={value => setFieldValue('amenities.refridgerator', value)}/>
                      Refridgerator
                    </FormControl.Label>
                  </VStack>

                  <VStack>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.security} onValueChange={value => setFieldValue('amenities.security', value)}/>
                      Security Guard
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.sink} onValueChange={value => setFieldValue('amenities.sink', value)}/>
                      Sink
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.studyarea} onValueChange={value => setFieldValue('amenities.studyarea', value)}/>
                      Study Area
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.amenities.wifi} onValueChange={value => setFieldValue('amenities.wifi', value)}/>
                      Wifi
                    </FormControl.Label>
                  </VStack>
                </HStack>
              </FormControl>

              <FormControl>
                <FormControl.Label _text={{ bold: true }}>Nearby Universities and Colleges</FormControl.Label>
                <HStack space={5}>
                  <VStack>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.schools.dlsu} onValueChange={value => setFieldValue('schools.dlsu', value)}/>
                      DLSU
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.schools.feu} onValueChange={value => setFieldValue('schools.feu', value)}/>
                      FEU
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.schools.pup} onValueChange={value => setFieldValue('schools.pup', value)}/>
                      PUP - Manila
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.schools.up} onValueChange={value => setFieldValue('schools.up', value)}/>
                      UP - Manila
                    </FormControl.Label>
                    <FormControl.Label alignItems='center'>
                      <CheckBox value={values.schools.ust} onValueChange={value => setFieldValue('schools.ust', value)}/>
                      UST
                    </FormControl.Label>
                  </VStack>
                </HStack>
              </FormControl>

              <HStack p={3} space={5} alignItems='center' justifyContent='space-between'>
                <Button onPress={handleSubmit} w='50%' colorScheme='teal'>Submit</Button>
                <Button onPress={handleReset} w='50%' colorScheme="teal">Reset</Button>
              </HStack>
            </VStack>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" visible={loading} color="white"/>
          <Text color="white">Please Wait...</Text>
        </View>
      ) : null}
    </View>
    
  );
}

export default DormForm

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
  },
  emptyComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width - 64,
  },
  flatList: {
    padding: 10,
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
    borderRadius: 5,
    backgroundColor: 'teal',
  },
  loading: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})