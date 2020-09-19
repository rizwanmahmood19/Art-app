import React,{useState,useEffect} from 'react';
import {View,Text,Button,StyleSheet,Image,Alert,Platform,SafeAreaView,TouchableOpacity,AsyncStorage,FlatList,ActivityIndicator} from 'react-native';
import Colors from '../constant/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";


const ImgPicker = (props) => {
//const [img, setImg] = useState();
const [image,setPicker] = useState(null);
//const [dateupload, setDataUpload] = useState();
const [date, setData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const productId = props.navigation.getParam('productId');

useEffect(() => {
  // async function fetchData() {
  //   const jsonToken = await AsyncStorage.getItem("userData");
  //     const transformedData = JSON.parse(jsonToken);
  //   console.log("Accepted job token : " +transformedData);

  //   fetch("https://arts.graystork.co/api/acceptedjobs", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + transformedData.token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDataUpload(data.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  async function fetchData1(id) {
    const jsonToken = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(jsonToken);
    console.log(transformedData);

    fetch(`https://arts.graystork.co/api/jobs_details/${productId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + transformedData.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setisLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  fetchData1();
  //fetchData();
}, []);

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
  setPicker(image.uri);
}

if(isLoading){
  return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
          <ActivityIndicator/>
      </View>
  );
}


 const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
if (!result.cancelled) {
      setPicker(result.uri);
    }
  };

   

const postPicture = async(id) => {
      const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
      console.log(" Get token accepted uri "+transformedData);

  const uri = image;
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();
      formData.append('invoice_image', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
  const options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + transformedData.token,
        },
      };
  return fetch(`https://arts.graystork.co/api/upload-invoice/${id}`, options);
    }

    return (
        
      <FlatList
      data={date}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (

        <View style={styles.imagePicker} >

          <View key={item.id} style={styles.contaier}>
            <SafeAreaView style={{right:70,paddingBottom:100}} >
              
              <View>
                <Text style={{fontSize:20,fontWeight:'bold',paddingVertical:2,paddingBottom:10}} >Details</Text>
              </View>
                <Text style={{paddingVertical:2}}>Job No : {item.job_reference_number}</Text>
                <Text style={{paddingVertical:2}}>Appliances : {item.appliances}</Text>
                
                
                <Text style={{paddingVertical:2}}>Brand  : {item.brand}</Text> 
                <Text style={{paddingVertical:2}}>Model : {item.model}</Text>
                
                
                <Text style={{paddingVertical:2}}>Job Type  : {item.job_type}</Text>
                <Text style={{paddingVertical:2}}>Schedule Date : {item.schedule_date}</Text>
                
                <Text style={{paddingVertical:2}}>Schedule Time  : {item.schedule_time}</Text>
                
                <Text style={{paddingVertical:2,fontWeight:'bold',fontSize:20,paddingBottom:10,paddingTop:10}}>Customer details</Text>
                <Text style={{paddingVertical:2}}>Name : {item.customer.name}</Text>
                <Text style={{paddingVertical:2}}>street : {item.customer.street1}</Text>
                
                <Text style={{paddingVertical:2}}>Mobile No  : {item.customer.mobile_no}</Text>

                <Text style={{paddingVertical:2,fontWeight:'bold',fontSize:20,paddingBottom:10,paddingTop:10}}>Charges</Text>
                <Text style={{paddingVertical:2}}>Mode Of Payment : {item.charge.mode_of_payment}</Text>
                
                <Text style={{paddingVertical:2}}>Schedule Date : {item.charge.service_charges}</Text>
                <Text style={{paddingVertical:2}}>job id : {item.charge.job_id}</Text>
                
              </SafeAreaView>
              </View>

              <View style={styles.imagePreview } >
                { !image ? (<Text>Not image pick yet</Text>
                 ) : ( <Image style={styles.image} source={{uri:image}} />)}
            </View> 
            <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />

      <View style={{ top:4, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>

      <TouchableOpacity style={{alignSelf:'center',left:10}} onPress={() => {postPicture(item.charge.job_id)}}>
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

