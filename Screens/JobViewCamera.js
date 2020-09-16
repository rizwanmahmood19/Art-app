import React,{useEffect,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  FlatList,SafeAreaView,ActivityIndicator
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from '../components/ResponsiveLayout';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constant/Colors";
import Card from "../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";

const ImagePickerExample = (props) => {
  const [date, setData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const productId = props.navigation.getParam('productId');
  useEffect(() => {
    async function fetchData(id) {
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
    fetchData();
  }, []);

  if(isLoading){
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
            <ActivityIndicator/>
        </View>
    );
}

  return (
    <FlatList
      data={date}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View key={item.id} style={styles.contaier}>
            
              <SafeAreaView style={{right:70,paddingBottom:100}} >
              

              <View style={{ left:"130%",bottom:30 }}>
                <TouchableOpacity onPress={() => {}} style={{ padding: 10,  borderRadius: 5, width: 100,  backgroundColor: "#56C864",}}>
                  <Text style={styles.text}>{item.job_status}</Text>
                </TouchableOpacity>
              </View>

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
                <Text style={{paddingVertical:2}}>Technician Charges : {item.charge.technician_charges}</Text>
                <Text style={{paddingVertical:2}}>Schedule Date : {item.charge.service_charges}</Text>
                
                <Text style={{paddingVertical:2}}>Schedule Time  : {item.charge.total_amount}</Text>
              </SafeAreaView>

            
          </View>
        );
      }}
    />
  );

};

ImagePickerExample.navigationOptions = (navData) => {
  return {
    headerTitle: "Information Accepted Jobs",
  };
};

const styles = StyleSheet.create({
  contaier: {
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    alignSelf: "center",
  },
  
});
export default ImagePickerExample;


