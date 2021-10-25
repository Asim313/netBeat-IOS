import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/core';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, hp, Images } from '../../assets/index';
import { REGISTER, UPDATEUSER } from '../../graphql/mutations';
import styles from './styles';
import { handleFormValidation, validateEmail } from '../../utils/handleLogic';
import Toast from 'react-native-simple-toast';
import { _retrieveData, _storeData } from '../../asyncStorage/AsyncFuncs';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Axios from './../../graphql/axios'
import { BaseUrl } from '../../graphql/baseUrl';



const Profile = (props) => {

    let options = {
        mediaType: 'photo',
        maxWidth: 1080,
        maxHeight: 1080,
        quality: 1,
        saveToPhotos: true,
      };

    let isFocus = useIsFocused()  

    const { lang, selectedLangVal } = useSelector(state => state.language);
    const { DARK } = useSelector(state => state.dark);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(props.route.params.user) 
    const [imageSource, setImageSource] = useState(null);
    const [loading, setLoading] = useState(true)

    
    const [createUser, {data : data }] = useMutation(REGISTER)
    const [updateUser] = useMutation(UPDATEUSER)


    useEffect(()=> {
        const getUser = async() => {
          const usr = await _retrieveData('user')
          setUser(usr)
          setUsername(usr.username)
          setEmail(usr.email)
          setImageSource(usr?.profile != null ? { uri: usr?.profile?.url } : { uri: '' })
          setLoading(false)
        }
        getUser()
     },[isFocus])


    const selectImage = () => {
         launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('Image Picker: Picking/capturing photo cancelled');
        } else if (response.errorCode) {
          console.error('ImagePicker Error Code: ', response.errorCode, response.errorMessage);
        } else {
           //   setImageModalStatus(!imageModalStatus)
          let imageData = {} 
          imageData['uri'] = response.assets[0].uri
          imageData['path'] = response.assets[0].uri
          imageData['name'] = response.assets[0].fileName
          imageData['size'] = response.assets[0].fileSize
          imageData['mimeType'] = response.assets[0].type

          console.log("response=>",imageData)  
          setImageSource(imageData)
        }
      });
    }

    


    const register = () => {
        const rules = [
            {
                isValid: username != '',
                message: lang.userNameEmpty,
            },
        ];
        handleFormValidation(
            rules,
            () => {
                if (!imageSource?.uri?.includes('/uploads/')) {
                    const formData = new FormData()
                    formData.append('files', imageSource)
                    setLoader(true)
                    Axios.post(`upload`, formData)
                    .then(res => {
                      updateUser({
                        variables: {
                          id : user?.id,  
                          profile : res?.data[0]?.id,
                          username : username,
                        }
                      })
                      .then(resResponse => {
                          //console.log('res of userData>>', JSON.stringify(resResponse))
                          _storeData('user', resResponse?.data?.updateUser?.user)
                          setLoader(false)
                          props.navigation.pop()
                      })
                      .catch((err) => console.log("err=>", err))
                    })
                    .catch(err => {
                    setLoader(false)
                    console.log("err.response : ", err.response)
                    return 0
                    })
                  } else {
                    updateUser({
                      variables: {
                        username : username,
                        id: user?.id,
                      }
                    })
                    .then(resResponse => {
                         // console.log('res of userData>>', JSON.stringify(resResponse))
                          _storeData('user', resResponse?.data?.updateUser?.user)
                          setLoader(false)
                          props.navigation.pop()
                    })
                    .catch(err => {
                      console.log("GraphQL Error Msg: ", JSON.stringify(err));
                      alert(err.message)
                    })
                  }
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
        style={[styles.mainContainer , {backgroundColor : DARK? Colors.base : Colors.white}]}
        >
          <ScrollView style = {styles.scroll}>
           <TouchableOpacity
           onPress = { () => props.navigation.pop()}
           style = {styles.back}
           >
           <Image source = {DARK ? Images.arrow : Images.arrow_dark}/>
           </TouchableOpacity>   
           <View style = {styles.logoContainer}>
               <View style = {[styles.dpContainer, {backgroundColor : DARK ? Colors.base : Colors.white}]}>

                
                <ActivityIndicator size = {'large'} color = {DARK ? Colors.white : Colors.base}/>
                  
                <Image 
                 source = {!imageSource?.uri?.includes('/uploads/') ? imageSource?.uri !== ''? { uri: imageSource?.uri } : Images.default_dp : { uri: BaseUrl + imageSource?.uri }} 
                 style = { styles.dp }/>

                 <TouchableOpacity 
                 onPress = {() => {selectImage()}}
                 style = {styles.editDpContainer}>
                  <Image source = {Images.edit_profile} style = {styles.editProfile}/>
                 </TouchableOpacity>  
               </View>
               {/* <Image source = {Images.logo} style = {styles.logo}/>
               <View style = {styles.logoTitleContainer}>
                   <View style = {{ flexDirection : 'row' , alignItems : 'flex-end'}}>
                    <Text style = {styles.netbeat}>netbeat</Text>
                    <Text style = {styles.live}>.live</Text>
                   </View>
               </View> */}
           </View>
           {/* <View style = {styles.titleContainer}>
               <Text style = {styles.title}>{lang?.register_title1}</Text>
               <Text style = {styles.title}>{lang?.register_title2}</Text>
           </View> */}
           <TextInput
           style = {[styles.input, {borderColor : DARK ? '#ffffff08' : '#19202B08', color : DARK ? '#ffffff73' : '#19202B73'}]}
           placeholder = {'Username'}
           placeholderTextColor = {'#ffffff73'}
           onChangeText = {(txt) => setUsername(txt)}
           value = {username}
           />
           <TextInput
            style = {[styles.input, {borderColor : DARK ? '#ffffff08' : '#19202B08', color : DARK ? '#ffffff73' : '#19202B73'}]}
           placeholder = {lang?.your_email}
           placeholderTextColor = {'#ffffff73'}
           onChangeText = {(txt) => setEmail(txt)}
           keyboardType = 'email-address'
           textContentType = 'emailAddress'
           autoCapitalize = 'none'
           value = { email }
           disabled
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
            <Text style = {styles.buttonText}>{'Update Profile'}</Text> }   
           </TouchableOpacity>
           {/* <Text 
           onPress = {() => {props.navigation.pop()}}
           style = {[styles.bottomText, {marginBottom : hp(3)}]}>{lang?.have_account}</Text> */}
           </ScrollView>
           </KeyboardAvoidingView>
    //    </View>
    ) 
}

export default Profile
