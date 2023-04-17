import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable, Text } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{top:40}}>
                <Pressable style={styles.botao} onPress={() => navigation.navigate('CameraApp')}>
                    <Text style={styles.texto}>TIRAR FOTO</Text>
                </Pressable>

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#993399",

    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: 'white',
        marginTop:'70%',
        width: 200,
        left: '25%'
    },
    texto: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },

});