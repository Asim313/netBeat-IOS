import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, hp, Images } from '../../assets/index';
import { REGISTER } from '../../graphql/mutations';
import styles from './styles';
import { handleFormValidation, validateEmail } from '../../utils/handleLogic';
import Toast from 'react-native-simple-toast';
import { _retrieveData, _storeData } from '../../asyncStorage/AsyncFuncs';



const Register = (props) => {

    const { lang, selectedLangVal } = useSelector(state => state.language);
    const { DARK } = useSelector(state => state.dark);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    
    const [createUser, {data : data }] = useMutation(REGISTER)


    const register = () => {
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
                isValid: password.length >= 6,
                message: lang.passwordLength,
            },
            {
                isValid: password == cpassword,
                message: lang.passwordNotMatch,
            }
        ];
        handleFormValidation(
            rules,
            () => {
                setLoader(true)
                createUser({ variables: {username: email.split('@')[0] , email: email.trim(), password: password } })
                .then(res => {
                    props.navigation.replace('login')
                    Toast.show(lang?.register_done)
                    setLoader(false)
                }).catch(i => {
                    console.log(i.message)
                    setLoader(false)
                    if (i.message == 'Cannot return null for non-nullable field UsersPermissionsUser.id.')
                        //setErrorMessage(lang.userAlreadyExist);
                        Toast.show(lang.userAlreadyExist)
                    else
                        Toast.show(i.message)
                })
            },
            (rule) => {
                { Toast.show(rule.message) }
            }
        )
    }


    return(
    //    <View style = {styles.mainContainer}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
        >
          <ScrollView style = {styles.scroll}>
           <View style = {styles.logoContainer}>
               <Image source = {Images.logo} style = {styles.logo}/>
               <View style = {styles.logoTitleContainer}>
                   <View style = {{ flexDirection : 'row' , alignItems : 'flex-end'}}>
                    <Text style = {styles.netbeat}>netbeat</Text>
                    <Text style = {styles.live}>.live</Text>
                   </View>
                   {/* <Text style = {styles.netbeat}>netbeat<Text style = {styles.live}>.live</Text></Text> */}
               </View>
           </View>
           <View style = {styles.titleContainer}>
               <Text style = {styles.title}>{lang?.register_title1}</Text>
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
           placeholderTextColor = {'#ffffff73'}
           onChangeText = {(txt) => setPassword(txt)}
           />
           <TextInput
           style = {styles.input}
           placeholder = {lang?.confirm_password}
           placeholderTextColor = {'#ffffff73'}
           onChangeText = {(txt) => setCPassword(txt)}
           />
           <TouchableOpacity
           disabled = {loader}
           onPress = {() => {
            register()
            }}
           style = {styles.button}
           >
           {loader?
            <ActivityIndicator size = {'small'} color = {Colors.white}/>
            :
            <Text style = {styles.buttonText}>{lang?.register_now}</Text> }   
           </TouchableOpacity>
           <Text 
           onPress = {() => {props.navigation.pop()}}
           style = {[styles.bottomText, {marginBottom : hp(3)}]}>{lang?.have_account}</Text>
           </ScrollView>
           </KeyboardAvoidingView>
    //    </View>
    ) 
}

export default Register
