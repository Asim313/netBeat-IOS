import react from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors, hp, hps, IOS, wp, wps } from '../../../assets';
import { Fonts } from '../../../assets/fonts';


export default StyleSheet.create ({

    mainContainer: {
      flex : 1,
      backgroundColor: Colors.white,
      //justifyContent:'center',
      alignItems:'center'
    },
    header: {
      height:hps(52),
      width:wps(342.9),
      marginTop:hps(14),
      //borderWidth:1,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    noti: {
      position :'absolute',
      left:0,
      top:hps(12)
    },
    logo: {
      //  height:hps(52),
      //  width:wps(144),
    },
    user: {
      height:hps(36.5),
      width:hps(36.5),
      borderRadius:hps(36.5/2),
      position:'absolute',
      right:0,
      top:3,
    },
    searchBar: {
      height:hps(46),
      width:wps(343),
      marginTop:hps(31),
      //borderWidth:1,
      justifyContent:'center',
      borderRadius:hps(10)
    },
    input: {
      height:'100%',
      width:'100%',
      //borderWidth:1,
      borderRadius:hps(10),
      fontSize : hps(16),
      fontFamily : Fonts.regular,
      color : '#ffffff27',
      paddingLeft : wps(26)
    },
    search: {
      position:'absolute',
      right:wps(17),
    },
    optionsBar: {
      height : hps(55),
      width : wps(359),
      //borderWidth : 1,
      alignSelf : 'flex-end',
      marginTop : hps(8),
      justifyContent:'center',
      
      //backgroundColor:'red'
    },
    option: {
      height:hps(33),
      //width:wps(107),
      paddingHorizontal: wps(16),
      //borderWidth:1,
      borderRadius:wps(16.5),
      marginRight:wps(9),
      justifyContent:'center',
      alignItems:'center',
      backgroundColor : Colors.base1,
      marginTop:hps(11)
    },
    optionText: {
      fontFamily:Fonts.medium,
      color : Colors.white,
      fontSize : hps(16)
    },
    title: {
      marginTop:hps(9),
      //borderWidth:1,
      marginLeft:wps(18.42),
      fontSize:hps(24),
      fontFamily:Fonts.lightBold,
      alignSelf:'flex-start'
    },
    eventsContainer: {
      height : hps(386.79),
      width : wps(359),
      marginLeft : wps(16),
      //borderWidth : 1,
      marginTop : hps(20),
      justifyContent:'center'
    },
    event: {
      //borderWidth:1,
      height:hps(372),
      width:wps(254),
      borderRadius : wps(20),
      overflow:'hidden',
      marginRight:wps(15),
      backgroundColor: Colors.lightGrey
    },
    titleContainer: {
     height : hps(111),
     marginLeft : wps(20),
     width : wps(223),
     //borderWidth:1,
     position:'absolute',
     bottom:0
    },
    statusContainer: {
      height:hps(31.43),
      width: wps(86),
      position:'absolute',
      //borderWidth:1,
      top:hps(20),
      left:wps(24),
      flexDirection:'row'
    },
    dot: {
      marginTop:hps(4)
    },
    live: {
      color : Colors.white,
      fontFamily: Fonts.medium,
      fontSize : hps(12),
      marginLeft:wps(7)
    },
    statusTitle : {
      fontSize:hps(14),
      fontFamily:Fonts.regular,
      color : Colors.white
    },
    eventImage: {
      height:'100%',
      width:'100%'
    },
    eventTitle: {
      fontSize:hps(18),
      fontFamily: Fonts.lightBold,
      color : Colors.white,
      marginTop:hps(9)
    },
    bottomTapContainer: {
      height : hps(93),
      width : wps(344),
      //borderWidth:1,
      alignItems : 'center',
      justifyContent : 'flex-end',
      position : 'absolute',
      bottom : hps(17)
    },
    bottomTap: {
      height:hps(58),
      width:wps(344),
      borderRadius:hps(29),
      backgroundColor:'#F3F3F3',
      //borderWidth:1,
      flexDirection : 'row',
      alignItems:'center',
      //justifyContent:'space-around'
    },
    videoButtonContainer: {
      position:'absolute',
      alignSelf:'center',
      top : hps(1),
      //transform:[{translateY : -hps(29)}],
      backgroundColor:Colors.white,
      height:hps(66),
      width:hps(66),
      borderRadius:hps(66/2),
      justifyContent:'center',
      alignItems:'center',
      //borderWidth:1,
      //elevation:0.1,
      zIndex:1
     },
     videoButton: {
      backgroundColor:Colors.base1,
      height:hps(58),
      width:hps(58),
      borderRadius:hps(58/2),
      justifyContent:'center',
      alignItems:'center'
     },
     homeButton: {
     position:'absolute',
     left : wps(64)
     },
    settingButton: {
      position:'absolute',
      right : wps(64)
    },
    notFoundText: {
      fontSize : hps(14),
      fontFamily: Fonts.medium,
      color : Colors.base1
    },
    cancel: {
      height: hps(16),
      width:wps(16)
    } 
   
})