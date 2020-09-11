import React,{useState,useEffect} from 'react';
import {View,Text,Button,StyleSheet,Image,Alert,Platform} from 'react-native';
import Colors from '../constant/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';

const ImgPicker = (props) => {
const [img, setImg] = useState();
const [image,setPicker] = useState();

    const  verifyPermissions = async ()=>{
     const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);

     if(result.status !== 'granted'){
         Alert.alert('Insufficient Permissions! ','You need to grand camera permissions to use this app.',
         [{text:'OK'}]
         );
         return false;
     }
     return true;
    }

  const  takeImageHandler = async ()=>{
     const hasPermissions = await verifyPermissions();
     if(!hasPermissions)
     {
         return;
     }
     const image = await ImagePicker.launchCameraAsync({
         allowsEditing:true,
         //aspect:[16,9],
         quality:0.5,
     });
     setImg(image.uri);
  }
 

 const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

 const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setPicker(result.uri );
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
      getPermissionAsync
    }, []);

    return (
        <View style={styles.imagePicker} >
        <ScrollView>
        
            <View style={styles.imagePreview } >
                { !img ? (<Text>Not image pick yet</Text>
                 ) : ( <Image style={styles.image} source={{uri:img}} />)}
            </View> 
            <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />

      <View style={{ top:4, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={_pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

        
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        alignSelf:'center',
        top:20,
        flex:1,

    },
    imagePreview:{
        width:300,
        height:300,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1,
    },
    image:{
        width:'100%',
        height:'100%',
    },
});

export default ImgPicker;
