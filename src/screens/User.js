import { Avatar, Button, Box, Icon,  IconButton, HStack, Heading, Select, Text, VStack } from 'native-base'
import { Alert, AspectRatio, Dimensions, FlatList, Image, StyleSheet, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'
import { useNavigation } from '@react-navigation/native'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import React from 'react'

const NBText = props => {
  return <Text m="1" {...props} />;
};

const dormData = [
  {
    id: 1,
    name: 'Property 1',
    price: '$1000',
    rating: '5',
    color: 'black',
  },
  {
    id: 2,
    name: 'Property 2',
    price: '$1000',
    rating: '5',
    color: 'black',
  },
];

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
  const [dorm, setdorm] = React.useState(dormData);

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
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        horizontal={false}
        numColumns={2}
        data={dorm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box style={styles.dormCard} shadow='9'>
            <VStack width={'100%'} height={'100%'}>
              <Box style={{ backgroundColor: item.color, borderRadius: 2, }} width={'100%'} height={'50%'}></Box>
              <VStack width={'100%'} height={'35%'}>
                <Heading size="md" isTruncated>{item.name}</Heading>
                <Text fontWeight="400">{item.price}</Text>
                <Text fontWeight="400">{item.rating} Star</Text>
              </VStack>
              <HStack width={'100%'} height={'15%'} alignItems={'center'} justifyContent={"space-between"}>
                <TouchableOpacity onPress={onDelete}><MatIcons name={'delete'} size={24} color={"red"}/></TouchableOpacity>
                <TouchableOpacity><MatIcons name={'mode-edit'} size={24} color={"teal"}/></TouchableOpacity>
              </HStack>
            </VStack>
          </Box>
        )}
      />
    </View>
  )
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
          <NBText fontSize="2xl" fontWeight="bold">Full name</NBText>
          <NBText>@username</NBText>
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
})
