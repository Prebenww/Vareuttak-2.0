import {Image, Pressable, StyleSheet, Text, View, TextInput} from 'react-native';


const Scanner = ({navigation}) => {
    return (
        <View style={{padding: '15%'}}>

            <View>
                <Text style={{fontSize: "20", fontWeight: '500'}}>Leverandør</Text>
                <Text>{}</Text>
            </View>

            <View>
                <Text style={{fontSize: 20, fontWeight: '500'}}>Varelager</Text>
                <Text> {}</Text>
            </View>

            <View>
                <Text style={{fontSize: 20, fontWeight: '500'}}>Artikkelnummer</Text>
                <Text>{}</Text>
            </View>

            <View>
                <Text style={{fontSize: 20, fontWeight: '500'}}>Beskrivelse</Text>
                <Text>{}</Text>
            </View>


            <Pressable
                style={({pressed}) => [
                    {
                        marginTop: '20%',
                        display: 'flex',
                        height: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        elevation: 3,
                        backgroundColor: '#2770C2',
                        opacity: pressed ? 0.5 : 1.0
                    }
                ]}
                color="#011B4D">
                <View style={{margin: 15, display: 'flex', flex: 'column'}}>
                    <Image
                        style={{
                            height: 250,
                            width: 250,
                            resizeMode: 'stretch',
                        }}
                        source={require('../assets/qr.png')}
                    />
                    <Text style={{
                        fontSize: 20,
                        lineHeight: 21,
                        fontWeight: 'bold',
                        color: 'white',
                    }}
                    >Scann QR-Kode</Text>
                </View>

            </Pressable>


            <View>
                <Text style={{fontSize: 20, fontWeight: '500'}}>Antall</Text>
                <TextInput style={{borderWidth: 1, padding: 10, borderRadius: 8}} placeholder='Antall'/>
            </View>
        </View>
    )
}

export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});