import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera'
import { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Modal, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EvilIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'
import * as Permission from 'expo-permissions'


export default function App() {

  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturaFoto, setCapturaFoto] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();


    (async () => {
      const { status } = MediaLibrary.requestPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>Acesso negado</Text>
  }

  async function tirarFoto() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturaFoto(data.uri);
      console.log(data);
      setOpen(true);
    }
  }

  async function salvarFoto() {
    const arquivo = await MediaLibrary.createAssetAsync(capturaFoto)
      .then(() => {
        alert('Salvo com sucesso');
      })
      .catch(error => {
        console.log('erro', error);
      })
  }


  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={camRef}
      >
        <View style={{ flex: 1 }} >
        </View>

        <TouchableOpacity style={{ flexDirection: 'row', top: -25 }}>

          <EvilIcons name="image" size={50} color="#FFF" onPress={tirarFoto} style={{ marginRight: "34%" }} />

          <EvilIcons name="camera" size={50} color="#FFF" onPress={tirarFoto} style={{ marginRight: "30%" }} />

          <EvilIcons name="redo" size={50} color="#FFF" onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }} />

        </TouchableOpacity>


      </Camera>


      {capturaFoto &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View style={{ flex: 1, top: 10 }}>
            <Image
              style={{ width: '95%', height: '90%', borderRadius: 20, left: 10 }}
              source={{ uri: capturaFoto }}
            />

            <TouchableOpacity style={{ flexDirection: 'row',height:50 }}>
              <EvilIcons name="close" size={50} onPress={() => setOpen(false)} style={{ marginLeft: '20%', marginRight: '40%' }} />
              <EvilIcons name="arrow-up" size={50} onPress={salvarFoto} />
            </TouchableOpacity>


          </View>
        </Modal>

      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#121212',
    margin: 10,
    borderRadius: 10,
    height: 50,
    width: '15%',
    alignItems: 'center'
  }
});
