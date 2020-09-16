import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,AsyncStorage,TouchableOpacity, Platform,SafeAreaView ,FlatList} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constant/Colors';
import Card from '../components/UI/Card';
import CardNoShadow from '../components/UI/cardNoShadow';
import { MaterialCommunityIcons,MaterialIcons,FontAwesome } from '@expo/vector-icons'; 
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from '../components/ResponsiveLayout'

 const HomeScreen = (props) => {
  const [date, setData] = useState();
  const [date1, setData1] = useState();

  useEffect(() => {
    async function fetchData() {
      const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
      //console.log(transformedData);

      fetch("https://arts.graystork.co/api/total-balance", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + transformedData.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.total_balance);
          //console.log(" job "+ data.total_balance);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    async function fetchData1() {
      const jsonToken = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(jsonToken);
      //console.log(transformedData);

      fetch("https://arts.graystork.co/api/count-accepted-jobs", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + transformedData.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData1(data.total_accepted_jobs);
          //console.log(" job "+ data.total_accepted_jobs);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchData1();
    fetchData();
    
  }, []);
  
    return (
      
        <SafeAreaView style={styles.contaier}>
          <View style={{flexDirection:'row',padding:0}} >
            <View style={styles.cardView} >
                <Card style={styles.summary} >
                    <View style={{alignSelf:'center'}} >
                        <Text style={{alignSelf:'center',fontWeight:'bold'}} >Accepted Jobs</Text>
                        <Text style={{top:10,alignSelf:'center'}} >{date1}</Text>
                    </View >
                </Card>
            </View>
            <View style={styles.cardView} >
                <Card style={styles.summary} >
                  <View style={{alignSelf:'center'}} >
                    <Text style={{fontWeight:'bold',alignSelf:'center'}} >Balance</Text>
                    <Text style={{top:10,alignSelf:'center'}}>${date}</Text>
                  </View>
                </Card>
            </View>
          </View>
            
            <View style={{paddingTop:hp('3%')}} >
              <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{props.navigation.navigate('Search')}}>
                <CardNoShadow style={styles.buttonCard} >
                    <View >
                        <MaterialCommunityIcons name="feature-search" size={35} color="black" style={{alignSelf:'center',color:"#0168f8"}} />
                        <Text style={{top:10,alignSelf:'center'}} >Search</Text>
                        <Text style={{top:10,alignSelf:'center'}} >Jobs</Text>
                    </View >
                </CardNoShadow>
              </TouchableOpacity>
            </View>
          <View style={{paddingTop:hp('3%')}} >
              <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{props.navigation.navigate('Accepted')}}>
                <CardNoShadow style={styles.buttonCard} >
                    <View >
                        <FontAwesome name="check" size={35} color="black" style={{alignSelf:'center',color:"#0168f8"}} />
                        <Text style={{top:10,alignSelf:'center'}} >Accepted</Text>
                        <Text style={{top:10,alignSelf:'center'}} >Jobs</Text>
                    </View >
                </CardNoShadow>
              </TouchableOpacity>
          </View>
          <View style={{paddingTop:hp('3%')}} >
            <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>{props.navigation.navigate('Balance')}}>
              <CardNoShadow style={styles.buttonCard} >
                    <View>
                        <MaterialIcons name="account-balance-wallet" size={35} color="black" style={{alignSelf:'center',color:"#0168f8"}} />
                        <Text style={{top:10,alignSelf:'center'}} >Balance</Text>
                    </View >
                </CardNoShadow >
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        
    )
};

HomeScreen.navigationOptions = navData => {

    const isLogout= async ()=>{
      await AsyncStorage.clear();
      navData.navigation.navigate('Login');
   };
    return {
      headerRight: ()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
          color={Colors.primary}
            title="Sign out"
            onPress={isLogout}
          />
        </HeaderButtons>
      )
    };
  };

const styles = StyleSheet.create({
    contaier:{
        flex:1,
        alignItems:'center',
        //justifyContent:"center"
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp('43%'),
        height: hp('14%'),
        alignSelf:'center',
        justifyContent:'center'
      },
      buttonCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        width: Platform.OS === 'android' ? wp('33%'):wp('33%'),
        height: hp('17.5%'),
        alignSelf:'center',
        justifyContent:'center'
      },
      cardView:{
          marginTop:10,
          padding:10,
          width: wp('52%'),
      },
      text:{
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#FFF',
        fontWeight: "bold",
        alignSelf:'center',
      
      },
});
export default HomeScreen;