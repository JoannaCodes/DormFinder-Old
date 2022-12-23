import { StyleSheet, Text, View } from 'react-native';
import { Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
import React from 'react';

function InboxContent() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Inbox!</Text>
      <Button onPress={() => navigation.navigate('Chat')}>Go to Chat Room</Button>
    </View>
  );
}

const Inbox = () => {
  return (
    <InboxContent/>
  )
}

export default Inbox

const styles = StyleSheet.create({})