import React from 'react'
import { Text, View} from 'react-native'
import StyleSheet from 'react-native-gesture-handler'

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
