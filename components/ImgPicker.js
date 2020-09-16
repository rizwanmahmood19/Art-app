import React,{useState,useEffect} from 'react';
import {View,Text,Button,StyleSheet,Image,Alert,Platform,TouchableOpacity,AsyncStorage,FlatList} from 'react-native';
import Colors from '../constant/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";


const ImgPicker = (props) => {
const [img, setImg] = useState();
const [image,setPicker] = useState(null);
const [date, setData] = useState();
const [type,setType] = useState(null);
const [extention, setExtention] = useState(null);

useEffect(() => {
  async function fetchData() {
    const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
    console.log("Accepted job token : " +transformedData);

    fetch("https://arts.graystork.co/api/acceptedjobs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + transformedData.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  fetchData();
}, []);


//     const  verifyPermissions = async ()=>{
//      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);

//      if(result.status !== 'granted'){
//          Alert.alert('Insufficient Permissions! ','You need to grand camera permissions to use this app.',
//          [{text:'OK'}]
//          );
//          return false;
//      }
//      return true;
//     }

//   const  takeImageHandler = async ()=>{
//      const hasPermissions = await verifyPermissions();
//      if(!hasPermissions)
//      {
//          return;
//      }
//      const image = await ImagePicker.launchCameraAsync({
//          allowsEditing:true,
//          //aspect:[16,9],
//          quality:0.5,
//      });
//      setImg(image.uri);
//   }

//  const getPermissionAsync = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   };

 const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All,allowsEditing: true,aspect: [4, 3],quality: 1,});
      if (!result.cancelled) 
      {
        setPicker(result.uri)
        setType(result.type)
      }

      console.log("hellloooo   "+result);
      alert(result);
    } 
    catch (E) {
      console.log(E);
    }
  };

//   useEffect(() => {
//       getPermissionAsync
//     }, []);

    const Accept = async (id)=>{
  
      const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
      console.log(" Get token accepted uri "+transformedData);
      
    
//  let upload = new FormData();
//   upload.append('file',{type:'image',uri:image,cancelled:0,height:548,width:824});

const formData = new FormData();
formData.append('invoice_image', {
	uri: image, 			// this is the path to your file. see Expo ImagePicker or React Native ImagePicker
	type: 'image/jpeg',  // example: image/jpg
	name:'photo.jpg',
});

      try {
        const res = await fetch(`https://arts.graystork.co/api/upload-invoice/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data; ',
            Accept: "application/json",
            Authorization: "Bearer " + transformedData.token,
          },
          body: JSON.stringify({
                  'data': formData,
                  })                
          })
          const response = await res.json();
          console.log(image);
            console.log( response.message);
            

          
      } 
      catch (error) {
        console.error(error);
      }
    
  }

    return (
        
      <FlatList
      data={date}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
        <View style={styles.imagePicker} >

      <View style={{ top:4, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={_pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>

      <Text style={{paddingVertical:2}}>id  : {item.job.id}</Text>

      <TouchableOpacity style={{alignSelf:'center',left:10}} onPress={() => {Accept(item.job.id)}}>
        <LinearGradient colors={["#0168f8", "#0168f8", "#0168f8"]} style={{ padding: 10, marginTop: 20,alignItems: "center",borderRadius: 5,width: 300,}}>
          <Text style={styles.text}>Submit</Text>
        </LinearGradient>
      </TouchableOpacity>
      </View>
    );
  }}
/>
        
    )
}

const styles = StyleSheet.create({
    imagePicker:{
        alignItems:'center',
        alignSelf:'center',
        top:20,paddingBottom:100,
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
    text: {
      backgroundColor: "transparent",
      fontSize: 15,
      color: "#FFF",
      fontWeight: "bold",
      alignSelf: "center",
    },
});

export default ImgPicker;
