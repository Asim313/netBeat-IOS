import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image, StatusBar, Text, TouchableOpacity, View , FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors, Images } from '../../assets/index';
import { NOTIFICATIONS } from '../../graphql/queries';
import { dark } from './../../redux/actions/dark';
import { selectLanguage } from './../../redux/actions/language';
import { languages } from './../../redux/languages';
import styles from './styles';
import moment from 'moment'

const Notifications = (props) => {
   const dispatch = useDispatch();
   const { lang, selectedLangVal } = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState('concert')
   const [user , setUser] = useState(props.route.params.user)
   const [notifications, setNotifications] = useState([])


   const {loading : loading} = useQuery(NOTIFICATIONS , {
      skip : !user,
      fetchPolicy : 'network-only',
      variables : {
        id : user?.id
      },
      onCompleted: res => {
         console.log(res?.queuedNotifications)
         setNotifications(res?.queuedNotifications)
      },
      onError: err => {
         console.log("err=", err)
      }
   })

   






   return(
       <SafeAreaView style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
        <StatusBar/>
         <View style = {styles.header}>
          {/* <Image source = {DARK? Images.notiWd : Images.notiGd} style = {styles.noti}/> */}
          <TouchableOpacity 
          onPress = {() => {props.navigation.pop()}}
          style = {styles.noti}>
              <Image source = {DARK? Images.arrow : Images.arrow_dark}/>
          </TouchableOpacity>
          <Image source = {Images.logoh} style = {styles.logo}/>
         </View>

         <View style = {styles.settingContainer}>
            <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>{lang?.notifications}</Text> 
            {!loading? 
            <FlatList
            data = {notifications}
            ListEmptyComponent = {() => 
            !loading && <Text style = {styles.notFoundText}>No Notifications Founf Yet!</Text>
            }
            renderItem = {({item , index}) => 
             <View style = {[styles.notificationCard , { borderColor : DARK? Colors.white_light : Colors.base_light}]}>
                <Text style = {[styles.notificationText, { color : DARK? Colors.white : Colors.base}]}>{item.content}</Text>
                <Text style = {[styles.notificationDate, { color :  DARK? Colors.white_light : Colors.base_light}]}>{moment(item.created_at).fromNow()}</Text>
             </View>
             }
             keyExtractor={item => item.id}
            />
            :
            <ActivityIndicator size = {'large'} color = {Colors.base1}/>
            }
         </View>
       </SafeAreaView>
)}

export default Notifications
