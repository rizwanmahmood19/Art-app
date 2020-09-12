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

  useEffect(() => {
    async function fetchData() {
      const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
      console.log(transformedData);

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

const productId = props.navigation.getParam('productId');
  // const selectedProduct = useSelector(state =>
  //   state.products.availableProducts.find(prod => prod.id === productId)
  // );

  return (
    <FlatList
      data={date}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View key={item.id} style={styles.contaier}>
            
              <SafeAreaView style={{right:70}} >
              <View>
                <Text style={{fontSize:18,fontWeight:'bold',width:60}} >Details</Text>
              </View>

              <View style={{ left:"130%",bottom:30 }}>
                <TouchableOpacity onPress={() => {}} style={{ padding: 10,  borderRadius: 5, width: 100,  backgroundColor: "#56C864",}}>
                  <Text style={styles.text}>{item.job.job_status}</Text>
                </TouchableOpacity>
              </View>

                
                <Text style={{paddingVertical:2}}>Job No : {item.job.job_reference_number}</Text>
                <Text style={{paddingVertical:2}}>Appliances : {item.job.appliances}</Text>
                
                
                <Text style={{paddingVertical:2}}>Brand  : {item.job.brand}</Text>
                <Text style={{paddingVertical:2}}>Model : {item.job.model}</Text>
                
                
                <Text style={{paddingVertical:2}}>Job Type  : {item.job.job_type}</Text>
                <Text style={{paddingVertical:2}}>Schedule Date : {item.job.schedule_date}</Text>
                
                <Text style={{paddingVertical:2}}>Schedule Time  : {item.job.schedule_time}</Text>
                
                
                
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
    top: 10,
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


