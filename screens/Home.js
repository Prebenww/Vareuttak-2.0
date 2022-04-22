import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Pressable,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { useState } from 'react';

const Home = ({navigation}) => {

	const [user, setUser] = useState("");

	 const getUser = async (e) => {
		const userObject = await fetch("https://vareuttak.getsandbox.com/users/" + e.nativeEvent.text)
		const userJson = await userObject.json()

		setUser(userJson.name)
	}

    return (
        <SafeAreaView>

            <StatusBar barStyle="light-content"/>

            <View style={styles.margin}>
                <Text style={styles.p}>Fyll ut nødvendig informasjon for å fortsette til uttak av varer</Text>
            </View>

            <View style={styles.textInputWrapper}>
                <Text style={styles.p2}>Ansattnummer</Text>
                <TextInput style={styles.textInput} placeholder='Ansattnummer' onChange={getUser} keyboardType='default'/>
            </View>

            <View style={styles.margin}>
                <Text style={styles.p3}>Ansattnavn</Text>
                <Text style={styles.p4}>{user}</Text>
            </View>

            <View>
                <Pressable
                    onPress={() => navigation.navigate('Scanner')}
                    style={({pressed}) => [
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '5%',
                            margin: 80,
                            borderRadius: 8,
                            elevation: 3,
                            backgroundColor: '#011B4D',
                            opacity: pressed ? 0.5 : 1.0
                        }]}

                    title='Bekreft ansatt'
                    color="#011B4D">
                    <Text
                        style={styles.btnText}>
                        Bekreft ansatt
                    </Text>

                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    margin: {
        margin: '15%'
    },
    p: {
        fontSize: 20
    },
    p2: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: '2%'
    },
    p3: {
        fontSize: 20,
        fontWeight: '500'
    },
    p4: {
        fontSize: 20
    },
    textInputWrapper: {
        marginLeft: "15%",
        marginRight: "10%"
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    btnText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

});