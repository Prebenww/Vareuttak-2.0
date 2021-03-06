import React, { useState, useEffect } from 'react';
import {Modal, Text, View, StyleSheet, Button, TouchableOpacity, Image, TextInput} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import LottieView from 'lottie-react-native';
import Scanner from "./Scanner";


const QrScan = ({navigation}) =>  {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    /*modal*/
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data, navigation }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        navigation.goBack()

    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (


        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            <LottieView
                source={require('../assets/animations/qr-scanner.json')}  autoPlay loop
            />
        </View>

    );
}

export default QrScan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

