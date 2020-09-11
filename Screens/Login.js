import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Platform,AsyncStorage
} from "react-native";

const Login = (props) => {

const [email,setEmail] = useState();
const [password,setPassword] = useState();


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
              "email":email, 
              "password":password
            })
          });

          if (!response.ok) {
            
            //const errorResData = await response.json();
            //const errorId = errorResData.error.message;
alert('Something went wrong');
            /*let message = 'Something went wrong!';
            
            if (errorId === 'EMAIL_NOT_FOUND') {
              message = 'This email could not be found!';
              alert(message);
            } else if (errorId === 'INVALID_PASSWORD') {
              message = 'This password is not valid!';
              alert(message);
            }
            throw new Error(message);*/
          }
          else{
            //await AsyncStorage.setItem('isLoggedIn','1');

            const resData = await response.json();
            props.navigation.navigate("Home");
            
            saveDataToStorage(resData.message.token);
          }
  };
  

  return (
    <View style={styles.contaier}>
      <Text style={{fontWeight:'bold',top:100,fontSize:30}} >Welcome</Text>
      <View style={{alignItems:'center',top:Platform.OS === "android" ? 200 : 250}} >
        <View style={styles.email}>
          <Text style={styles.lableText}>Email</Text>
          <TextInput
            placeholder="your email"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={(value)=>{setEmail(value)}}
          />
        </View>
        <View style={styles.password}>
          <Text style={styles.lableText}>Password</Text>
          <TextInput
            placeholder="your password"
            autoCapitalize="none"
            secureTextEntry={true}
            style={styles.input}
            value={password}
            onChangeText={(password)=>{setPassword(password)}}
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
    paddingBottom: 5,
  },
});
export default Login;
