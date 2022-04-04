import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';


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


            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: "#2770C2",
                borderRadius: '15%',
                paddingTop: '0%',
                height: '35%'


            }}>


                <Image
                    source={require('../assets/qr.png')}
                    resizeMode='contain'
                    style={{
                        width: '100%',
                        height: '80%',
                        margin: 0,
                    }}
                />
                <Text style={{
                    fontSize: 20,
                    lineHeight: 21,
                    fontWeight: 'bold',
                    letterSpacing: 0.25,
                    color: 'white',

                }}>Skann QR-kode</Text>
            </View>


            <View style={{marginTop: '15%'}}>
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