import React,{useState,useEffect} from 'react';
import { StyleSheet, View, ScrollView,AsyncStorage,Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
 
const BalanceScreen = props =>{
  
    const [totalBalance, setTotalBalance] = useState();
    const [service_charges, setService_charges] = useState();
    const [technician_charges,setTechnician_charges] = useState();
 
    const tableHead= [totalBalance, service_charges, technician_charges, 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'];
    const widthArr= [40, 60, 80, 100, 120, 140, 160, 180, 200];

    
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
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
            //console.log(" job "+ data.total_accepted_jobs);
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
            //console.log(" job "+ data.total_accepted_jobs);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      fetchData2();
      fetchData1();
      fetchData();
      
    }, []);

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
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
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
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,bottom:5
}
});

export default BalanceScreen;