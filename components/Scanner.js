import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState, useEffect} from 'react';

import {BarCodeScanner} from "expo-barcode-scanner";
import LottieView from "lottie-react-native";


const Scanner = ({navigation, type, data}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const [qrData, setQrData] = useState(null)
    const [qrType, setQrType] = useState(null)




    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

  /*  const formattedData = ({data}) => {
        return(
            data.split(/\r?\n/).splice(2,0, "SPLICE", "TEST")
        )
    }*/

    const handleBarCodeScanned = ({data, type}) => {
        setScanned(true);
        setQrData(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setShowQr(false)
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    const renderPage = () => {

        return (
            <View>
                <View style={{padding: '15%', display: 'flex', justifyContent: 'center'}}>

                    <View>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Leverandør</Text>
                        <Text style={{fontSize: 15}}>{}</Text>
                    </View>

                    <View>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Varelager</Text>
                        <Text>{qrData}</Text>
                    </View>

                    <View>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Artikkelnummer</Text>
                        <Text>{type} {data}</Text>
                    </View>

                    <View>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Beskrivelse</Text>
                        <Text>{}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => setShowQr(true)}
                        style={{
                            justifyContent: 'center',
                            backgroundColor: "#2770C2",
                            borderRadius: '15%',
                            paddingTop: '0%',
                            height: '40%',

                        }}>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: "#2770C2",
                            borderRadius: '15%',
                            paddingTop: '0%',
                            height: '70%',


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
                    </TouchableOpacity>

                    <View style={{marginTop: '15%'}}>
                        <Text style={{fontSize: 20, fontWeight: '500'}}>Antall</Text>
                        <TextInput style={{borderWidth: 1, padding: 10, borderRadius: 8}} placeholder='Antall'/>
                    </View>
                </View>
            </View>
        )
    }
    {
    }

    const renderQr = () => {
        return (
            <>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />

                    <LottieView
                        source={require('../assets/animations/qr-scanner.json')}  autoPlay loop
                    />
                </>


        )
    }

    return (
        <>
          { showQr ? renderQr()  : renderPage()}
        </>
    )

}


export default Scanner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});