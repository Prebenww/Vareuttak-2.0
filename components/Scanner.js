import {Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Switch, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {MaterialIcons} from '@expo/vector-icons';

import {BarCodeScanner} from "expo-barcode-scanner";
import LottieView from "lottie-react-native";

import {Picker} from '@react-native-picker/picker';

import {FontAwesome} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';


import {app} from '../firebase/firebase';
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";

const Scanner = ({type, data}) => {

    //Switch to manual mode
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    //State for å vise manuelle valg.

    //Leverandør
    const [showLeverandor, setShowLeverandor] = useState(false);
    const toggleLeverandor = () => {
        showLeverandor ? setShowLeverandor(false) : setShowLeverandor(true);
    }

    //Varelager
    const [showVarelager, setShowVarelager] = useState(false);
    const toggleVarelager = () => {
        showVarelager ? setShowVarelager(false) : setShowVarelager(true);
    }

    //Artikkelnummer
    const [showArtikkelnummer, setShowArtikkelnummer] = useState(false);
    const toggleArtikkelnummer = () => {
        showArtikkelnummer ? setShowArtikkelnummer(false) : setShowArtikkelnummer(true);
    }

    const [selectedLeverandor, setSelectedLeverandor] = useState();
    const [selectedVarelager, setSelectedVarelager] = useState();
    const [selectedArtikkelnummer, setSelectedArtikkelnummer] = useState();
    const [selectedBeskrivelse, setSelectedBeskrivelse] = useState();


    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const [qrData, setQrData] = useState(null)
    const [qrType, setQrType] = useState(null)
    const [id, setId] = useState("")


    const db = getFirestore(db)

    // Egen state for varen
    const [vare, setVare] = useState()


    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const getData = async (id) => {
        const docRef = doc(db, "vare", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setVare(docSnap.data())
        } else {
            console.error(`Finner ikke vare med ID: ${id}`)
            setVare()
        }
    }

    const withdrawItems = async (e) => {
        const docRef = doc(db, "vare", id)
        const antall = vare.antallPåLager - e.nativeEvent.text

        if (antall < 0) {
            console.error("Du registrerer uttak av flere varer enn det som er registrert på lager")
        } else {
            await updateDoc(docRef, {
                antallPåLager: antall
            })
            // Henter varen på nytt, for å ha oppdaterte verdier
            getData(id)
        }
    }


    const handleBarCodeScanned = ({data, type}) => {
        setScanned(true);
        setQrData(data);
        //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setShowQr(false)
        // Kan byttes ut med useEffect med listener på qrData
        getData(data)
        setId(data)
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
                <View style={styles.switch}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, paddingBottom: 4}}>Manuelt uttak</Text>
                    <View style={{display: 'flex', flexDirection: 'row',}}>
                        <Switch

                            trackColor={{false: '#767577', true: '#2770C2'}}

                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={{padding: 5, fontSize: 16}}>{
                            isEnabled ? 'På' : 'Av'
                        }</Text>
                    </View>
                </View>


                {!isEnabled && <View>

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

                            <View style={styles.textView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={"Antall " + vare?.enhet}
                                    onSubmitEditing={withdrawItems}
                                />
                                <MaterialIcons onPress={() => {
                                }} name="navigate-next" size={35} color="black"/>
                            </View>

                        </View>
                    </View>
                </View>}


                {isEnabled &&
                    <View>

                        <View style={styles.container}>
                            <View style={styles.itemContainer}>

                                <TouchableOpacity onPress={toggleLeverandor}
                                                  style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.h1}>Leverandør</Text>
                                    <View style={styles.dropdown}>
                                        <MaterialCommunityIcons style={{paddingLeft: 5}} name="arrow-down-bold-box"
                                                                size={24} color="#2770C2"/>
                                    </View>

                                </TouchableOpacity>

                                {showLeverandor && <Picker selectedValue={selectedLeverandor}
                                                       onValueChange={(itemValue, itemIndex) =>
                                                           setSelectedLeverandor(itemValue)
                                                       }>
                                    <Picker.Item label="item 1" value="item 1"/>
                                    <Picker.Item label="item 2" value="item 2"/>
                                    <Picker.Item label="item 3" value="item 3"/>
                                    <Picker.Item label="item 4" value="item 4"/>
                                    <Picker.Item label="item 5" value="item 5"/>
                                </Picker>}

                            </View>

                            <View style={styles.itemContainer}>

                                <TouchableOpacity onPress={toggleVarelager}
                                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.h1}>Varelager</Text>
                                    <View style={styles.dropdown}>

                                        <MaterialCommunityIcons style={{paddingLeft: 5}} name="arrow-down-bold-box"
                                                                size={24} color="#2770C2"/>
                                    </View>

                                </TouchableOpacity>


                                {showVarelager && <Picker selectedValue={selectedVarelager}
                                                          onValueChange={(itemValue, itemIndex) =>
                                                              setSelectedVarelager(itemValue)
                                                          }>
                                    <Picker.Item label="item 1" value="item 1"/>
                                    <Picker.Item label="item 2" value="item 2"/>
                                    <Picker.Item label="item 3" value="item 3"/>
                                    <Picker.Item label="item 4" value="item 4"/>
                                    <Picker.Item label="item 5" value="item 5"/>
                                </Picker>}

                            </View>

                            <View style={styles.itemContainer}>

                                <TouchableOpacity onPress={toggleArtikkelnummer}
                                                  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={styles.h1}>Artikkelnummer</Text>
                                    <View style={styles.dropdown}>

                                        <MaterialCommunityIcons style={{paddingLeft: 5}} name="arrow-down-bold-box"
                                                                size={24} color="#2770C2"/>
                                    </View>

                                </TouchableOpacity>

                                {showArtikkelnummer && <Picker selectedValue={selectedArtikkelnummer}
                                                               onValueChange={(itemValue, itemIndex) =>
                                                                   setSelectedArtikkelnummer(itemValue)
                                                               }>
                                    <Picker.Item label="item 1" value="item 1"/>
                                    <Picker.Item label="item 2" value="item 2"/>
                                    <Picker.Item label="item 3" value="item 3"/>
                                    <Picker.Item label="item 4" value="item 4"/>
                                    <Picker.Item label="item 5" value="item 5"/>
                                </Picker>}

                            </View>

                            <View style={styles.itemContainer}>

                                <TouchableOpacity
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={styles.h1}>Beskrivelse:</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => setShowQr(true)}
                                style={{height: 80, marginTop: '20%'}}>

                                <View style={styles.buttonWrapper}>

                                    <Text style={styles.btnText}>
                                        Hent beskrivelse
                                    </Text>

                                </View>
                            </TouchableOpacity>

                            <View style={styles.textInputWrapper}>

                                <Text style={styles.h1}>
                                    Antall
                                </Text>

                                <View style={styles.textView}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder={"Antall " + vare?.enhet}
                                        onSubmitEditing={withdrawItems}
                                    />
                                    <MaterialIcons onPress={() => {
                                    }} name="navigate-next" size={35} color="black"/>
                                </View>

                            </View>
                        </View>
                    </View>
                }

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
    itemContainer: {
        paddingBottom: '10%',


    },
    textView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h1: {
        fontSize: 20,
        fontWeight: '500',
        display: 'flex',
        width: '55%',


    },
    dropdown: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'flex-end',


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
        borderRadius: 8,
        flex: 1
    },
    switch: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingTop: 20
    }

});