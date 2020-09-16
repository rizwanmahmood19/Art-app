import React,{Component} from 'react';
import {View ,Text,StyleSheet,ActivityIndicator,AsyncStorage} from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
//import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "../Screens/Login";
import HomeScreen from '../Screens/HomeScreen';
import AcceptedScreen from '../Screens/AcceptedScreen'
import SearchJobScreen from '../Screens/SearchJobScreen'
import ImgPicker from '../components/ImgPicker'
import ImagePickerExample from '../Screens/JobViewCamera'
import PopupScreen from '../Screens/PopupScreen'
import BalanceScreen from '../Screens/BalanceScreen';
import Colors from '../constant/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Colors.white
};

const AppNavigate = createStackNavigator(
    {
        Login:Login,
        
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );
  const AcceptNavigate = createStackNavigator(
    {
        Accepted:AcceptedScreen,
        ImagePicker:ImagePickerExample,
        ImageScreen:ImgPicker,
        Popup:PopupScreen,
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );
  const BlanceNavigate = createStackNavigator(
    {
        Balance:BalanceScreen
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );
  const HomeNavigate = createStackNavigator(
    {
        Home: HomeScreen,
        Accepted:AcceptNavigate,
        Balance:BlanceNavigate,
        Search:SearchJobScreen,
        ImagePicker:ImagePickerExample,
    },
    {
      defaultNavigationOptions: defaultNavOptions
    }
  );

  class AuthLoadingScreen extends Component
  {
  constructor(props){
    super(props);
    this._loadData();
  }
  
    render(){
      return(
        <View style={{alignItems:'center',justifyContent:'center',flex:1}} >
          <ActivityIndicator/>
        </View>
      );
    };
  
  _loadData = async(props) =>{
    const isLoggedIn = await AsyncStorage.getItem('userData');
    if (!isLoggedIn) {
      this.props.navigation.navigate('Startup');
      return;
    }
    else{
      this.props.navigation.navigate('Home');
    }
  };
  
  }

  const MainNavigator = createSwitchNavigator({
    Auth:AuthLoadingScreen,
    Startup : AppNavigate,
    Home : HomeNavigate,
    
  });
export default createAppContainer(MainNavigator);