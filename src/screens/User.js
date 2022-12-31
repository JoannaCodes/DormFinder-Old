import { Avatar, Button, Box, Center, Icon, IconButton, HStack, Heading, Select, Text, VStack, ScrollView } from 'native-base'
import { AspectRatio, Dimensions, FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
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
    name: 'Property Name',
    price: '$1000',
    rating: '5',
    color: "red",
  },
  {
    id: 2,
    name: 'Property Name',
    price: '$1000',
    rating: '5',
    color: "red",
  },
];

const reviewData = [
  {
    id: 1,
    username: "User Name",
    avatar: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    rating: '5',
    createdAt: '12/4/22',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut auctor ipsum, vel tempor nisl. Proin sed leo placerat, tempus augue ut, ullamcorper felis. Nunc augue orci, varius at dictum vel, dictum at nulla. In hac habitasse platea dictumst. Aliquam lorem odio, pretium id mattis ac, vehicula ut dui. Integer tortor ante, feugiat non ipsum sit amet, interdum iaculis tellus.'
  },
  {
    id: 2,
    username: "User Name",
    avatar: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
    rating: '5',
    createdAt: '12/4/22',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut auctor ipsum, vel tempor nisl. Proin sed leo placerat, tempus augue ut, ullamcorper felis. Nunc augue orci, varius at dictum vel, dictum at nulla. In hac habitasse platea dictumst. Aliquam lorem odio, pretium id mattis ac, vehicula ut dui. Integer tortor ante, feugiat non ipsum sit amet, interdum iaculis tellus.'
  },
];

const renderDorm = ({ item }) => {
  return (
    <Box style={[styles.dormCard, {backgroundColor: '#d3d3d3'}]}>
      <VStack width={'100%'} height={'100%'}>
        <Box style={{ backgroundColor: item.color, borderRadius: 2, }} width={'100%'} height={'50%'}></Box>
        <VStack width={'100%'} height={'35%'}>
          <Heading size="md">{item.name}</Heading>
          <Text fontWeight="400">{item.price}</Text>
          <Text fontWeight="400">{item.rating} Star</Text>
        </VStack>
        <Button size="xs" height={'15%'}>Edit</Button>
      </VStack>
    </Box>
  );
};

const renderReviews = ({ item }) => {
  return (
    <Box style={[styles.reviewCard, ]}>
      <VStack width={'100%'} height={'100%'}>
        <HStack space={3} height={'30%'} alignItems={'center'}>
          <Avatar bg="teal.700" alignSelf="center" size="md" source={{ uri: item.avatar }}></Avatar>
          <Text>{item.username}</Text>
        </HStack>
        <HStack space={5} height={'10%'}>
          <Text>{item.rating} Star</Text>
          <Text>{item.createdAt}</Text>
        </HStack>
        <HStack height={'60%'} paddingTop={2}>
          <ScrollView height={'100%'}><Text>{item.review}</Text></ScrollView>
        </HStack>
      </VStack>
    </Box>
  );
};

function Listing() {
  const [dorm, setdorm] = React.useState(dormData);

  return (
    <View style={styles.cardContainer} alignItems={'center'} justifyContent={'flex-start'}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        data={dorm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDorm}
        numColumns={2}
      />
    </View>
  )
}

function Insights() {
  const [listing, setListing] = React.useState('');
  const [reviews, setReviews] = React.useState(reviewData);
  
  return (
    <View style={styles.cardContainer} alignItems={'center'} justifyContent={'flex-start'}>
      <Select placeholder="Choose Dorm" _selectedItem={{ bg: "teal.600" }} width={'95%'} marginTop={3}>
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
        horizontal={false}
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReviews}
        ItemSeparatorComponent={() => (<View style={{ backgroundColor: "teal", height: 1 }} />)}
      />
    </View>
  )
}

const renderScene = SceneMap({
  listing: Listing,
  insights: Insights,
});

function UserTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'listing', title: 'Listing' },
    { key: 'insights', title: 'Insights' },
  ]);

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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  cardContainer: {
    height: windowHeight,
    width: windowWidth,
    flex: 1,
    backgroundColor: 'white',
  },
  reviewCard: {
    borderRadius: 10,
    height: 200,
    padding: 12,
    marginBottom: 16,
    width: windowWidth - 24,
  },
  dormCard: {
    borderRadius: 10,
    height: 250,
    padding: 12,
    margin: 5,
    width: (windowWidth * 0.5) - 24,
  },
  flatList: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
})