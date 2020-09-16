import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Picker ,FlatList,TextInput,AsyncStorage,Button,ActivityIndicator} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const PopupScreen = props =>{
    const [date, setData] = useState();
    const [amount, setAmount] = useState();
    const [type, setType] = useState();
    const [isLoading, setisLoading] = useState(true);
    const productId = props.navigation.getParam('productId');

    useEffect(() => {
        async function fetchData() {
          const jsonToken = await AsyncStorage.getItem("userData");
          const transformedData = JSON.parse(jsonToken);
          console.log("popup token : "+transformedData);
    
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

const submitDonation = async (id) => {

  const jsonToken = await AsyncStorage.getItem('userData');
  const transformedData = JSON.parse(jsonToken);

   
   const response = await fetch(`https://arts.graystork.co/api/technician-charges/${id}`,
     {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + transformedData.token
       },
       body: JSON.stringify({
         
         'payment_type':type,
         'techncian_charges': amount,
       })
     }
     )
     if (!response.ok) {
      console.log("Something went wrong");
    }
    const resData = await response.json();
    alert(resData.message.body);
    console.log(resData.message);
    console.log(resData.message.body);

};

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
    <View style={styles.container} >
      
    <View style={{alignSelf:'center'}} >
      
    
<View >
      <Picker
          selectedValue={type}
          onValueChange={(e) => {setType(e)}}
          style={{ width: 300,marginHorizontal: 14, }}
          required
          errorText="Please Choose a Fund!"
          mode="dropdown">
          <Picker.Item label="Choose type of amount" />
          <Picker.Item label="ATM" value="ATM" />
          <Picker.Item label="CASH" value="CASH" />
      </Picker>
      <Text style={styles.text1}>Paid Amount</Text>
      <View style={{ marginHorizontal: 25, width: 180 ,flexDirection:'row'}}>
          
          <TextInput style={styles.input} placeholder="$ 00.0"  keyboardType="default"  autoCapitalize="none" required  errorText="Please enter a valid amount!"  
          value={amount}  onChangeText={(e) => {setAmount(e)}} placeholderTextColor="black" returnKeyType="next"/>        
      </View>
      
</View>          
          
    </View>

<TouchableOpacity style={{alignSelf:'center',top:20}} onPress={()=>{submitDonation(item.charge.job_id);}}>
        <LinearGradient colors={["#0168f8", "#0168f8", "#0168f8"]} style={{ padding: 15, marginTop: 10, alignItems: "center", borderRadius: 5, width: 300,}}>
          <Text style={styles.text}>SAVE</Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
    );
}}
/>
  );

};
PopupScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Payment type',
    };
  };

const styles = StyleSheet.create({
  container: {
    paddingTop:"30%"
  },
  fe:{
    borderColor:"blue",borderWidth:1,width:100
  },
  map: {
    height: 250,
  },
  text:{
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#FFF',
    fontWeight: "bold",
    alignSelf:'center'
  },
  text1:{
    backgroundColor: 'transparent',
    fontSize: 15,
    color: 'black',
    fontWeight: "bold",
    //alignSelf:'center'
    paddingHorizontal: 25,
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,paddingRight:90,

  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: '#FC5B57',
    fontSize: 13
  },
  detailItems: {
    width: '100%'
  },
  containerRecurr: {
    flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width:"100%",
      padding:10,
      paddingTop:30,
  },
  inputRecurr: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width:250
  },
  detailItems: {
    width: '100%'
  }
});
export default PopupScreen;

