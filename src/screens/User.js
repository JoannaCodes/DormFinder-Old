import { Avatar, Button, Box, Icon,  IconButton, HStack, Heading, Select, Text, VStack } from 'native-base'
import { ActivityIndicator, Alert, AspectRatio, Dimensions, FlatList, Image, StyleSheet, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'
import { useNavigation } from '@react-navigation/native'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import React from 'react'

import { firebase } from '../../environment/config'

const reviewData = [
  {
    id: 1,
    username: "User Name",
    avatar: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    rating: '5',
    createdAt: '12/4/22',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum enim, suscipit faucibus ante. Duis placerat massa id lectus ultrices, ultrices interdum odio viverra. Praesent finibus tortor felis, nec elementum libero fermentum vel. Proin quis pharetra erat tincidunt.'
  },
];

function Listing() {
  const [dorm, setdorm] = React.useState([]);
  const [url, setUrl] = React.useState();
  const [loading, setLoading] = React.useState(false);
  var uid = 12345;

  React.useEffect(()=>{
    setLoading(true);
    const dormsRef = firebase.database().ref('dorms');

    dormsRef.on('value', (datasnap) => {
      var dorms = [];
      if (datasnap.exists()) {
        datasnap.forEach(childsnap => {
          if (childsnap.exists()){
            const authorId = childsnap.val().authorId;
            if (authorId === uid){
              dorms.push({
                key: childsnap.key,
                value: childsnap.val(),
              });
            }
          }
        })
        setdorm(dorms);
        setLoading(false);
      } else {
        console.log("No data available");
      }
    });
  },[]);

  const onDelete = () => {
    // firebase 
    Alert.alert(
      "Warning",
      "This will remove data of the dorm. This action cannot be reversed. Deleted data can not be recovered.",
      [
        { text: "Delete", onPress: () => Alert.alert("Message", "Information Deleted") },
        { text: "Cancel", onPress: () => console.log("Cancel Pressed") }
      ]
    );
  };

  return (
    <View style={styles.cardContainer} alignItems={'flex-start'}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" visible={loading} color="#0f766e"/>
        </View>
      ):(
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          horizontal={false}
          numColumns={2}
          data={dorm}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Box style={styles.dormCard} shadow='9'>
              <VStack width={'100%'} height={'100%'}>
                <Image style={{ borderRadius: 2, }} width={'100%'} height={'50%'}
                  source={{uri: 'https://firebasestorage.googleapis.com/v0/b/dormfinder-5e354.appspot.com/o/dorm-images%2Fdefault-image.jpg?alt=media&token=34123c4a-03f9-4988-a888-b82dfe935f0c'}}
                />
                <VStack width={'100%'} height={'35%'}>
                  <Heading size="md" isTruncated>{item.value.property_name}</Heading>
                  <Text fontWeight="400">{item.value.price}</Text>
                  <Text fontWeight="400">5 Star</Text>
                </VStack>
                <HStack width={'100%'} height={'15%'} alignItems={'center'} justifyContent={"space-between"}>
                  <TouchableOpacity onPress={onDelete}><MatIcons name={'delete'} size={24} color={"red"}/></TouchableOpacity>
                  <TouchableOpacity><MatIcons name={'mode-edit'} size={24} color={"teal"}/></TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          )}
        />
      )}
    </View>
  );
}

function Reviews() {
  const [listing, setListing] = React.useState('');
  const [reviews, setReviews] = React.useState(reviewData);
  
  return (
    <View style={styles.cardContainer} alignItems={'center'}>
      <Select placeholder="Choose Dorm" width={'100%'} marginX={5} marginTop={3}>
        <Select.Item label="Dorm 1" value="dorm1" />
        <Select.Item label="Dorm 2" value="dorm2" />
        <Select.Item label="Dorm 3" value="dorm3" />
        <Select.Item label="Dorm 4" value="dorm4" />
        <Select.Item label="Dorm 5" value="dorm5" />
      </Select>
      <FlatList
        contentContainerStyle={styles.flatList}
        horizontal={false}
        ItemSeparatorComponent={() => (<View style={{ backgroundColor: "teal", height: 1 }} />)}
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Box style={[styles.reviewCard, ]}>
            <VStack space={3} width={'100%'} height={'100%'}>
              <HStack space={3} height={'20%'} alignItems={'center'}>
                <Avatar bg="teal.700" alignSelf="center" size="md" source={{ uri: item.avatar }}></Avatar>
                <Text>{item.username}</Text>
              </HStack>
              <HStack space={3} height={'10%'}>
                <Text>{item.rating} Star</Text>
                <Text>{item.createdAt}</Text>
              </HStack>
              <HStack height={'70%'}>
                <Text>{item.review}</Text>
              </HStack>
            </VStack>
          </Box>
        )}
      />
    </View>
  )
}

function UserTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'listing', title: 'Listing' },
    { key: 'reviews', title: 'Reviews' },
  ]);

  const renderScene = SceneMap({
    listing: Listing,
    reviews: Reviews,
  });  

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#0f766e' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black' }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
    />
  );
}

function UserProfile() {
  const navigation = useNavigation();

  return (
    <HStack p="5" space={5} alignItems={'center'} justifyContent={'space-between'}>
      <HStack space={4} alignItems={'center'} justifyContent={'flex-start'}>
        <Avatar bg="teal.700" alignSelf="center" size="2xl" source={{ uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80" }}></Avatar>
        <View>
          <Text fontSize="2xl" fontWeight="bold">Full name</Text>
          <Text>@username</Text>
        </View>
      </HStack>
      <IconButton 
        icon={<Icon as={<MatIcons name="settings" size={30} />} 
        name="settings" />} 
        onPress={() => navigation.navigate('Settings')}
        _icon={{
          color: "teal.700",
          size: "xl"
        }}
        alignSelf={'flex-start'}
        p="0"
      />
    </HStack>
  );
}

const User = () => {
  return (
    <VStack style={{flex: 1}}>
      <UserProfile/>
      <UserTabs/>
    </VStack>
  )
}

export default User

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  reviewCard: {
    borderRadius: 10,
    height: 250,
    padding: 12,
    marginBottom: 8,
    width: width - 32,
  },
  dormCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 250,
    padding: 12,
    margin: 8,
    width: (width - 64) * 0.5,
  },
  flatList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
