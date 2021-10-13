import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View , FlatList, ActivityIndicator} from 'react-native';
import { useSelector } from 'react-redux';
import { Colors, Images } from '../../assets/index';
import { EVENTS, SEARCHEVENTS, TYPES } from '../../graphql/queries';
import styles from './styles';
import { BaseUrl } from '../../graphql/baseUrl';
import Orientation from 'react-native-orientation';

const Home = (props) => {

   const { lang, selectedLangVal } = useSelector(state => state.language)
   const { DARK } = useSelector(state => state.dark)
   const [selected, setSelected] = useState(0)
   const [searchTxt, setSearchTxt] = useState('')
   const [searchFilter, setSearchFilter] = useState(false)
   const [loading, setLoading] = useState(true)
   const [ref, setRef] = useState(null)


   useEffect(()=> {
      Orientation.lockToPortrait();
   },[])


   const { data : types , loading : loading_types} = useQuery(TYPES, {
      fetchPolicy : 'network-only'
   })


   const { data : events , loading : loading_events} = useQuery(EVENTS, {
      fetchPolicy : 'network-only',
      skip : !types,
      variables : {
         id : types && types?.types[selected]?.id
      },
      onCompleted : res => {
         setLoading(false)
         console.log(JSON.stringify(res))
      }
   })


   const [search, {data : searchResult , loading : loading_search}] = useLazyQuery(SEARCHEVENTS, {
      fetchPolicy : 'network-only',
      onCompleted : res => {
         console.log("res=>", res)
      }
   })



   return(
       <SafeAreaView style = {[styles.mainContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
         <StatusBar barStyle = { DARK? 'light-content' : 'dark-content'}/>
         <View style = {styles.header}>
          <Image source = {DARK? Images.notiWd : Images.notiGd} style = {styles.noti}/>
          <Image source = {Images.logoh} style = {styles.logo}/>
          <TouchableOpacity
          style = {styles.user}
          onPress = {() => {
            props.navigation.navigate('setting')
          }}>
          <Image source = {Images.background} 
          style = {[styles.user, {top: 0}]} 
          />
             </TouchableOpacity>
         </View>

         <View style = {[styles.searchBar, {backgroundColor : DARK? '#293140' : '#F7F7F7'}]}>
            <TextInput
            style = {[styles.input, {color : DARK ? '#ffffff27' : '#19202B54'}]}
            placeholder = {lang?.search}
            placeholderTextColor = {DARK ? '#ffffff27' : '#19202B54'}
            onChangeText = {(txt) => setSearchTxt(txt)}
            ref = {(ref) => setRef(ref)}
            />
            <TouchableOpacity 
            onPress = {() => {
               if(!searchFilter){
                  setSearchFilter(true)
                  search({variables : {
                     name : searchTxt
                  }})
               }
               else{
                  setSearchFilter(false)
                  ref.clear()
               }
               
            }}
            style = {styles.search}>
              {searchFilter?
              <Image source = {DARK? Images.cancel_w : Images.cancel_p} style = {styles.cancel}/>
              :
              <Image source = {DARK? Images.searchW : Images.search}/>}
            </TouchableOpacity>
         </View>



         {!searchFilter &&
         <View style = {styles.optionsBar}>
         {!loading_types? 
         <FlatList
         data = {types && types?.types}
         horizontal
         showsHorizontalScrollIndicator = {false}
         ListEmptyComponent = {() => 
         !loading_types && <Text style = {styles.notFoundText}>{lang?.no_types}</Text>
         }
         renderItem = {({item, index}) => 
            <TouchableOpacity
            onPress = {() => setSelected(index)}
            style = {[styles.option, {backgroundColor : selected ==  index ? Colors.base1 : DARK? '#293140' : '#F7F7F7'}]}
            >
            <Text style = {[styles.optionText, {color : selected ==  index ? Colors.white : DARK? '#ffffff27' : '#19202B'}]}>{selectedLangVal == 'en'? item.name : item.name_fr}</Text>
            </TouchableOpacity> 
         }
         />
         :
         <ActivityIndicator size = {'small'} color = {Colors.base1}/>   
         }
         </View>}


          {!loading_types && !loading_search && !searchFilter &&
          <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>
             {selectedLangVal == 'en'? types?.types[selected].name : types?.types[selected].name_fr}
             </Text>}

          {searchFilter &&
          <Text style = {[styles.title, {color : DARK? Colors.white : '#19202B'}]}>
             {'Search Result'}
             </Text>}   

          <View style = {styles.eventsContainer}>
           {!loading && !loading_events && !loading_search ?
           <FlatList
           data = {searchFilter? searchResult && searchResult.concerts : events && events.concerts}
           ListEmptyComponent = {() => 
            !loading && !loading_events && !loading_search && <Text style = {styles.notFoundText}>{lang?.no_events}</Text>
            }
           renderItem = {({item, index}) => 
           <TouchableOpacity 
           onPress = {() => props.navigation.navigate('event', {data : item})}
           style = {styles.event}>
              <ImageBackground source={{ uri: BaseUrl + item?.Cover[0]?.url }} style = {styles.eventImage}>
               {item.isLive && <View style = {styles.statusContainer}>
                   <Image source = {Images.dot} style = {styles.dot}/>
                   <Text style = {styles.live}>{lang?.live}</Text>
                </View>}
                <View style = {styles.titleContainer}>
                 <Text style = {styles.statusTitle}>{lang?.now_on_air}</Text>
                 <Text style = {styles.eventTitle}>{item?.ArtistName}</Text>
                </View>
              </ImageBackground>
           </TouchableOpacity>
           }
           /> 
           :
           <ActivityIndicator size = {'large'} color = {Colors.base1}/> 
           } 
          </View>





          <View style = {styles.bottomTapContainer}>
             <View style = {[styles.videoButtonContainer, {backgroundColor : DARK? Colors.base : Colors.white}]}>
               <TouchableOpacity 
               //onPress = {() => setDark(!DARK)}
               style = {styles.videoButton}>
               <Image source = {Images.video} style = {styles.video}/>   
               </TouchableOpacity>
             </View>
             <View style = {[styles.bottomTap , { backgroundColor : DARK ? '#293140' : '#F3F3F3'}]}>
                <TouchableOpacity 
                 onPress = {() => {props.navigation.navigate('home')}}
                 style = {styles.homeButton}> 
                 <Image source = {DARK? Images.home : Images.homelight}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress = {() => {props.navigation.navigate('setting')}}
                style = {styles.settingButton}>
                <Image source = {DARK? Images.setting : Images.settinglight}/>
                </TouchableOpacity>
             </View> 
          </View>
       </SafeAreaView>
   ) 
}

export default Home
