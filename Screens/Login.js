import React,{useState,useCallback,useEffect,useReducer} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Platform,AsyncStorage,Alert
} from "react-native";
import Input from '../components/UI/input';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};


const Login = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

useEffect(() => {
  if (error) {
    Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
  }
}, [error]); 

const [formState, dispatchFormState] = useReducer(formReducer, {
  inputValues: {
    email: '',
    password: '',
    //role: '',
    
  },
  inputValidities: {
    email: false,
    password: false,
    //role: false,
  },
  formIsValid: false
});


useEffect(() => {
  if (error) {
    Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
  }
}, [error]);


const saveDataToStorage = (token) =>
{
  //console.log("login token :  " + token);
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token : token
    })
  );
};

  const searchLogin = async ()=>{
    const response = await fetch('https://arts.graystork.co/api/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "email":formState.inputValues.email,  
              "password":formState.inputValues.password
            })
          });

          if (!response.ok) {
            
            const errorResData = await response.json();
            const errorId = errorResData.message.body;
            
            Alert.alert('Invalid!', errorId, [{ text: 'Okay' }]);
            
          }
          else{
            setError(null);
  setIsLoading(true);

  try {
            //await AsyncStorage.setItem('isLoggedIn','1');

            const resData = await response.json();
            props.navigation.navigate("Home");
            
            saveDataToStorage(resData.message.token);
      } 
          catch (err) {
            setError(err.message);
            setIsLoading(false);
          }
    }
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
  

  return (
    <View style={styles.contaier}>
      <Text style={{fontWeight:'bold',top:150,fontSize:30}} >Welcome</Text>
      <View style={{alignItems:'center',top:Platform.OS === "android" ? 200 : 250}} >
        <View style={styles.email}>
          <Text style={styles.lableText}>Email</Text>
          <Input
              id="email"
              placeholder="enter email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
        />
        </View>
        <View style={styles.password}>
          <Text style={styles.lableText}>Password</Text>
          <Input
              id="password"
              placeholder="your password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
        />
        </View>
        <Button
        title="Sign In"
        onPress={searchLogin}
      />
      </View>

      
    </View>
  );
};
const styles = StyleSheet.create({
  contaier: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    width: 250,
    paddingLeft: 8,
    height: Platform.OS === "android" ? 30 : 30,
  },
  email: {
    padding: 10,
  },
  password: {
    padding: 10,
  },
  lableText: {
    top: 18,
  },
});
export default Login;
