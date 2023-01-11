import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput, View } from 'react-native'
import { Button, Center, ChevronRightIcon, Divider, FormControl, Heading, Input, Modal, HStack, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

function SettingsScreen() {
  const navigation = useNavigation();
  const [showContact, setShowContact] = React.useState(false);
  const [showAbout, setShowAbout] = React.useState(false);

  return (
    <VStack>
      {/* Screens */}
      <VStack space={5} p={5}>
        <TouchableOpacity onPress={() => navigation.navigate('Account Information')}>
          <HStack alignItems="center" justifyContent="space-between">
            <Text fontSize="lg">Account Information</Text>
            <ChevronRightIcon size="5" />
          </HStack>
        </TouchableOpacity>
        <Divider _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />

        <TouchableOpacity onPress={() => navigation.navigate('Change Password')}>
          <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize="lg">Change Password</Text>
              <ChevronRightIcon size="5" />
          </HStack>
        </TouchableOpacity>
      </VStack>

      <Divider _light={{ bg: "muted.300" }} _dark={{ bg: "muted.50" }} height={1}/>

      {/* Modals */}
      <VStack space={5} p={5}>
        <TouchableOpacity onPress={() => setShowContact(true)}>
          <Text fontSize="lg">Contact Us</Text>
        </TouchableOpacity>
        <Divider _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />

        <TouchableOpacity onPress={() => setShowAbout(true)}>
          <Text fontSize="lg">About Us</Text>
        </TouchableOpacity>
        <Divider _light={{ bg: "muted.800" }} _dark={{ bg: "muted.50" }} />

        <TouchableOpacity>
          <Text fontSize="lg" color={"danger.600"} bold={true}>Log Out</Text>
        </TouchableOpacity>
      </VStack>

      <Modal isOpen={showContact} onClose={() => setShowContact(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <Text>Need to get in touch with us? Kindly email us at <Text color="teal.700" underline>developer@email.com</Text></Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>About Us</Modal.Header>
          <Modal.Body>
          <View>
            <Heading color="teal.700" textAlign={'center'}>
              BSCpE Design and Practice 1-2
            </Heading>
            <Text pt="3" bold={true} textAlign={'center'}>
              The Development of an Android-based Dormitory Finder System in Higher Education Institutions of Manila
            </Text>
            <Text pt="3" textAlign={'justify'}>
              A Dissertation Presented to the Faculty of the Department of Computer Engineering Polytechnic University of the Philippines Sta. Mesa, Manila
            </Text>
            <Text pt="3" textAlign={'justify'}>
              In Partial Fulfilment of the Requirements for the Degree in Bachelor of Science in Computer Engineering
            </Text>
            <Text pt="3" textAlign={'center'}> By Tricia C. Gilo and Joanna Marie B. Lara </Text>
          </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}

const userInitial = {
  email: 'user@email.com',
  name: 'User Name',
  phone: '12345',
  username: 'userName',
};

function AccountInfoScreen() {
  const [userInfo, setUserInfo] = React.useState(userInitial);
  
  return (
    <VStack p={5} space={5}>
      <FormControl>
        <FormControl.Label _text={{ bold: true }}>Name</FormControl.Label>
        <Input
          onChangeText={value => setUserInfo({ ...userInfo, name:value})}
          value={userInfo.name}
          placeholder={'Name'}
          variant="underlined"
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ bold: true }}>Username</FormControl.Label>
        <Input
          onChangeText={value => setUserInfo({ ...userInfo, username:value})}
          value={userInfo.username}
          placeholder={'Username'}
          variant="underlined"
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
        <Input
          onChangeText={value => setUserInfo({ ...userInfo, email:value})}
          value={userInfo.email}
          placeholder={'Email'}
          variant="underlined"
        />
      </FormControl>

      <FormControl>
        <FormControl.Label _text={{ bold: true }}>Phone</FormControl.Label>
        <Input
          onChangeText={value => setUserInfo({ ...userInfo, phone:value})}
          value={userInfo.phone}
          placeholder={'Phone'}
          variant="underlined"
        />
        {/* <Text>{`[value: ${userInfo.phone}]`}</Text> */}
      </FormControl>

      <Button mt="5" colorScheme="teal">
        Update
      </Button>
    </VStack>
  );
}

function ChangePasswordScreen() {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');
  
  return (
    <VStack p={5} space={5}>
      <FormControl>
        <FormControl.Label>New Password</FormControl.Label>
        <Input
          onChangeText={value => setPassword({ ...password, newPassword:value})}
          value={password.newPassword}
          variant="underlined"
          type='password'
        />
        <FormControl.HelperText>At least 8 characters</FormControl.HelperText>
      </FormControl>

      <FormControl>
        <FormControl.Label>Confirm Password</FormControl.Label>
        <Input
          onChangeText={value => setPassword({ ...password, confirmPassword:value})}
          value={password.confirmPassword}
          variant="underlined"
          type='password'
        />
        <FormControl.HelperText>At least 8 characters</FormControl.HelperText>
      </FormControl>

      <Button mt="5" colorScheme="teal">
        Update Password
      </Button>
      <TouchableOpacity>
        <Text textAlign={'center'}>Forgot Password?</Text>
      </TouchableOpacity>
    </VStack>
  );
}

const Stack = createStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator initialRouteName="UserSettings" >
      <Stack.Screen name="UserSettings" component={SettingsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Account Information" component={AccountInfoScreen}/>
      <Stack.Screen name="Change Password" component={ChangePasswordScreen}/>
    </Stack.Navigator>
  );
}

export default Settings

const styles = StyleSheet.create({})