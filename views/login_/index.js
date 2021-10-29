import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View , ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { useSelector } from 'react-redux';
import { hp, Images } from '../../assets/index';
import { handleFormValidation, validateEmail } from '../../utils/handleLogic';
import Toast from 'react-native-simple-toast';
import { _retrieveData, _storeData } from '../../asyncStorage/AsyncFuncs';
import { LOGIN, SAVEDEVICETOKEN } from '../../graphql/mutations';
import styles from './styles';
import { Colors } from '../../assets/colors';
import { GETUSERBYID } from '../../graphql/queries';
import { push } from './../../Services'
import { Shadow } from 'react-native-shadow-2';
import { SVGS } from '../../assets/images/config';



const Login = (props) => {

    const { lang, selectedLangVal } = useSelector(state => state.language);
    const { DARK } = useSelector(state => state.dark);
    const [email, setEmail] = useState('abc@netBeat.com');
    const [password, setPassword] = useState('123456');
    const [notFound, setNotFound] = useState(undefined);
    const [loader, setLoader] = useState(false);

    const [saveDeviceToken] = useMutation(SAVEDEVICETOKEN, {
        fetchPolicy: 'no-cache'
    });


    const getToken = async( id ) => {
        const token = await push.init()
        console.log(token)
        saveDeviceToken({ variables: { token : token , id : id } })
        .then( res => {
            //global.deviceToken = token
        })
    }


    useEffect(() => {
        const check = async () => {
            const a = await _retrieveData('firstTime');
            //console.log('retriveData:',a)
            if(!a)
            setNotFound(false)
            else
            setNotFound(true)
        }
        check()
    },[])


    const [login] = useMutation(LOGIN)

    const [user] = useLazyQuery(GETUSERBYID, {
      fetchPolicy : 'network-only',
      onCompleted: res => {
        if(!notFound)
        props.navigation.replace('home')
        else
        props.navigation.replace('walkThrough')
        _storeData('user',res?.user)  
        setLoader(false)
      },
      onError: err => {
          console.log(err)
      } 

    })



    const skipLogin = () => {
        if(!notFound)
        props.navigation.replace('home')
        else
        props.navigation.replace('walkThrough')
        const id = 'Guest' + Math.floor(Math.random() * 100)
        _storeData('user',{id : id,username : 'Guest',group : {id : -1}})

    }



    const signInRequest = () => {
        const rules = [
            {
                isValid: email != '',
                message: lang.emailEmpty,
            },
            {
                isValid: validateEmail(email.trim()),
                message: lang.emialFormat,
            },
            {
                isValid: password >= 6,
                message: lang.passwordLength,
            },
        ];
        handleFormValidation(
            rules,
            () => {
            setLoader(true)    
            login({ variables: { email: email.trim(), password: password } })
            .then(res => {
                //console.log("user=>",res?.data?.login?.user?.id)
                getToken(res?.data?.login?.user?.id)
                user({variables : { id : res?.data?.login?.user?.id }})
                
            })
            .catch(i => {
                setLoader(false)
                if (i?.graphQLErrors[0].extensions?.exception?.data?.message[0]?.messages[0]?.message == 'Identifier or password invalid.')
                    Toast.show(lang.login_fail)
                else{
                    alert('Error', i.message)
                }
                })

            },
            (rule) => {
                {Toast.show(rule.message)}
            }
        )
    }



   return(
    //    <View style = {styles.mainContainer}>
         <KeyboardAvoidingView
           behavior={Platform.OS === "ios" ? "padding" : "height"}
           style = {styles.mainContainer}
           >
          <ScrollView style = {styles.scroll}>
           <View style = {styles.logoContainer}>
               {/* <Image source = {Images.logo} style = {styles.logo}/> */}
               <View style = {styles.logo}>
                 <SVGS.logo_small />
               </View>
               
               <View style = {styles.logoTitleContainer}>
                   <View style = {{ flexDirection : 'row' , alignItems : 'flex-end'}}>
                    <Text style = {styles.netbeat}>netbeat</Text>
                    <Text style = {styles.live}>.live</Text>
                   </View>
                   {/* <Text style = {styles.netbeat}>netbeat<Text style = {styles.live}>.live</Text></Text> */}
               </View>
           </View>
           <View style = {styles.titleContainer}>
               <Text style = {styles.title}>{lang?.login_title1}</Text>
               <Text style = {styles.title}>{lang?.register_title2}</Text>
           </View>
           <TextInput
           style = {styles.input}
           placeholder = {lang?.your_email}
           placeholderTextColor = {'#ffffff73'}
           onChangeText = {(txt) => setEmail(txt)}
           keyboardType = 'email-address'
           textContentType = 'emailAddress'
           autoCapitalize = 'none'
           />
           <TextInput
           style = {styles.input}
           placeholder = {lang?.your_password}
           onChangeText = {(txt) => setPassword(txt)}
           placeholderTextColor = {'#ffffff73'}
           />
           
           <TouchableOpacity
           onPress = {() => {
               signInRequest()
            }}
           style = {styles.button}
           >
           {loader?
            <ActivityIndicator size = {'small'} color = {Colors.white}/>
            :
            <Text style = {styles.buttonText}>{lang?.login}</Text> }    
           </TouchableOpacity>
           <Text 
           onPress = {() => {skipLogin()}}
           style = {styles.bottomText}>{lang?.without_reg}</Text>
           <Text 
           onPress = {() => {props.navigation.navigate('register')}}
           style = {[styles.bottomText, {marginBottom : hp(3)}]}>{lang?.dont_have_account}</Text>
           </ScrollView>
           </KeyboardAvoidingView>
    //    </View>
   ) 
}

export default Login
