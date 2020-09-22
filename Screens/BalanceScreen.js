import React,{useState,useEffect} from 'react';
import { StyleSheet, View, ScrollView,AsyncStorage,Text,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
 
const BalanceScreen = props =>{
  
    const [totalBalance, setTotalBalance] = useState();
    const [service_charges, setService_charges] = useState();
    const [technician_charges,setTechnician_charges] = useState();
    const [isLoading, setisLoading] = useState(true);

    const tableHead= ['Sno.', 'Job No.', 'Total Price', 'Service Fee', 'Paid Amount', 'Balance'];
    const widthArr= [40, 60, 80, 100, 120, 140];
    const productId = props.navigation.getParam('productId');
    console.log("first hello  : "+productId);
    
  
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
            setTotalBalance(data.total_balance);
            setisLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      async function fetchData1() {
        const jsonToken = await AsyncStorage.getItem("userData");
        const transformedData = JSON.parse(jsonToken);
        //console.log(transformedData);
  
        fetch("https://arts.graystork.co/api/service-charges", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + transformedData.token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setService_charges(data.service_charges);
            setisLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      async function fetchData2() {
        const jsonToken = await AsyncStorage.getItem("userData");
        const transformedData = JSON.parse(jsonToken);
        //console.log(transformedData);
  
        fetch("https://arts.graystork.co/api/technician-charges", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + transformedData.token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTechnician_charges(data.technician_charges);
            setisLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      fetchData2();
      fetchData1();
      fetchData();
      
    }, []);
    
    for (var i = 0; i < productId.length; i ++) {
      var subract = productId[i].total_amount - productId[i].service_charges - productId[i].technician_charges
    }

      const tableData = [];
    for (var i = 0; i < productId.length; i ++) {
      const rowData = [];
      rowData.push(i+1, productId[i].job.job_reference_number,productId[i].total_amount,productId[i].service_charges,productId[i].technician_charges,subract);
      tableData.push(rowData);
    }
    if(isLoading){
      return(
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
              <ActivityIndicator/>
          </View>
      );
  }
    return (
      <View style={styles.container}>
          <View  >
           <Text style={{fontWeight:'bold',paddingBottom:'5%'}} >TOTAL : ${totalBalance}</Text>
           <Text style={{fontWeight:'bold',paddingVertical:'5%'}} >ARTS : ${service_charges}</Text>
           <Text style={{fontWeight:'bold',paddingVertical:'5%'}} >BALANCE : ${technician_charges}</Text>
          </View>
          <View style = {styles.lineStyle} />
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text1}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>

                {tableData.map((rowData, index) => (
          <Row key={index} data={rowData} widthArr={widthArr} style={[styles.row, index%2 && {backgroundColor: '#FFF'}]} textStyle={styles.text}
          />
          ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
   
   )
  
}

BalanceScreen.navigationOptions = (navData) => {
    return {
      headerTitle: "Balance",
    };
  };
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#0168f8' },
  text: { textAlign: 'center', fontWeight: '200' },
  text1: { textAlign: 'center', fontWeight: 'bold',color:'#fff' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40,  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,bottom:5
}
});

export default BalanceScreen;

