import {Image, StyleSheet, Text, View, TextInput, Button, Pressable, SafeAreaView, StatusBar} from 'react-native';

const Home = ({navigation}) => {
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content"/>

            <View style={{margin: "15%"}}>
                <Text style={{fontSize: "20"}}>Fyll ut nødvendig informasjon for å fortsette til uttak av varer</Text>
            </View>

            <View style={{marginLeft: "15%", marginRight: "10%"}}>
                <Text style={{fontSize: 20, fontWeight: '500', marginBottom: '2%'}}>Ansattnummer</Text>
                <TextInput style={{borderWidth: 1, padding: 10, borderRadius: 8}} placeholder='Ansattnummer'/>
            </View>

            <View style={{margin: "15%"}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>Ansattnavn</Text>
                <Text style={{fontSize: "20"}}>{}</Text>
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
                        }
                    ]}

                    title='Bekreft ansatt'
                    color="#011B4D">
                    <Text
                        style={{
                            fontSize: 20,
                            lineHeight: 21,
                            fontWeight: 'bold',
                            letterSpacing: 0.25,
                            color: 'white',
                        }}>
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
});