import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  FlatList,ActivityIndicator
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from '../components/ResponsiveLayout';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constant/Colors";
import Card from "../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";

const SearchJobScreen = () => {
  const [date, setData] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
      console.log(transformedData);

      fetch("https://arts.graystork.co/api/searchjob", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + transformedData.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.date);
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
  if (!isLoading && date.length === 0) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>No search job found!</Text>
      </View>
    );
  }

  const Accept = async (id)=>{
  
    const jsonToken = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(jsonToken);
    console.log(" Get token accepted "+transformedData);

    try {
      let response = await fetch(`https://arts.graystork.co/api/accept_job/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + transformedData.token,
      },
    })
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  
}

  return (
    <FlatList
      data={date}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <View key={item.id} style={styles.contaier}>
            <Card style={styles.summary}>

            <SafeAreaView style={{right:10}} >
              <View>
                <Text style={{fontSize:18,fontWeight:'bold',width:60}} >Details</Text>
              </View>

              <View style={{ left:"75%",bottom:30 }}>
                <TouchableOpacity onPress={() => {}} style={{ padding: 10,  borderRadius: 5, width: 100,  backgroundColor: "#FECC50",}}>
                  <Text style={styles.text}>{item.job_status}</Text>
                </TouchableOpacity>
              </View>

                
                <Text style={{paddingVertical:2}}>Job No : {item.job_reference_number}</Text>
                <Text style={{paddingVertical:2}}>Appliances : {item.appliances}</Text>
                
                
                <Text style={{paddingVertical:2}}>Brand  : {item.brand}</Text>
                <Text style={{paddingVertical:2}}>Model : {item.model}</Text>
                
                
                <Text style={{paddingVertical:2}}>Job Type  : {item.job_type}</Text>
                <Text style={{paddingVertical:2}}>Schedule Date : {item.schedule_date}</Text>
                
                <Text style={{paddingVertical:2}}>Schedule Time  : {item.schedule_time}</Text>
                
      <TouchableOpacity style={{alignSelf:'center',left:10}} onPress={() => {Accept(item.id)}}>
        <LinearGradient colors={["#0168f8", "#0168f8", "#0168f8"]} style={{ padding: 10, marginTop: 20,alignItems: "center",borderRadius: 5,width: 300,}}>
          <Text style={styles.text}>Accept</Text>
        </LinearGradient>
      </TouchableOpacity>
              </SafeAreaView>

            </Card>
          </View>
        );
      }}
    />
  );
};

SearchJobScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Search Jobs",
  };
};

const styles = StyleSheet.create({
  contaier: {
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding:30,
    paddingHorizontal: Platform.OS === 'android' ? wp('11%'):wp('11%'),// 100,
    paddingVertical: 20,
  },

  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    alignSelf: "center",
  },
  
});
export default SearchJobScreen;
