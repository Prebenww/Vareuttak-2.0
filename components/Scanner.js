import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from 'react-native';
import React, {useState, useEffect} from 'react';

import {BarCodeScanner} from "expo-barcode-scanner";
import LottieView from "lottie-react-native";


const Scanner = ({type, data}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const [qrData, setQrData] = useState(null)
    const [qrType, setQrType] = useState(null)

	 // Egen state for varen
	 const [vare, setVare] = useState()


    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


	 const getData = async (id) => {
		 const rawData = await fetch("https://vareuttak.getsandbox.com/vare/" + id)
		 const json = await rawData.json()

		 setVare(json)
	 }


    const handleBarCodeScanned = ({data, type}) => {
        setScanned(true);
        setQrData(data);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setShowQr(false)
		  // Kan byttes ut med useEffect med listener på qrData
			getData(data)
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
                <View style={styles.container}>
                    <View>
                        <Text style={styles.h1}>Leverandør</Text>
                        <Text style={styles.p}>{vare?.leverandør}</Text>
                    </View>

                    <View>
                        <Text style={styles.h1}>Varelager</Text>
                        <Text style={styles.p}>{vare?.lager}</Text>
                    </View>

                    <View>
                        <Text style={styles.h1}>Artikkelnummer</Text>
                        <Text style={styles.p}>{vare?.artikkelnummer}</Text>
                    </View>

                    <View>
                        <Text style={styles.h1}>Beskrivelse</Text>
                        <Text style={styles.p}>{vare?.beskrivelse}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => setShowQr(true)}
                        style={styles.button}>

                        <View style={styles.buttonWrapper}>


                            <Image
                                source={require('../assets/qr.png')}
                                resizeMode='contain'
                                style={styles.img}
                            />


                            <Text style={styles.btnText}>
                                Skann QR-kode
                            </Text>

                        </View>
                    </TouchableOpacity>

                    <View style={styles.textInputWrapper}>

                        <Text style={styles.h1}>
                            Antall
                        </Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder={"Antall " + vare?.enhet}
                        />

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
                    source={require('../assets/animations/qr-scanner.json')}
                    autoPlay
                    loop
                />
            </>


        )
    }

    return (
        <>
            {showQr ? renderQr() : renderPage()}
        </>
    )
}


export default Scanner;


const styles = StyleSheet.create({
    container: {
        padding: '15%',
        display: 'flex',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 20,
        fontWeight: '500'
    },
    p: {
        fontSize: 15
    },
    button: {
        justifyContent: 'center',
        backgroundColor: "#2770C2",
        borderRadius: 15,
        paddingTop: '0%',
        height: '40%',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2770C2",
        borderRadius: 15,
        paddingTop: '0%',
        height: '70%',
    },
    btnText: {
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    img: {
        width: '100%',
        height: '80%',
        margin: 0,
    },
    textInputWrapper: {
        marginTop: '15%',
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    }

});