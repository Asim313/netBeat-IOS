import react from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Colors, hp, hps, wp, wps } from '../../../assets';
import { Fonts } from '../../../assets/fonts';


export default StyleSheet.create ({

    mainContainer: {
      flex : 1,
      backgroundColor: Colors.white,
      //justifyContent:'center',
      alignItems:'center'
    },
    header: {
      height:hps(36.12),
      width:wps(339.9),
      top:hps(35),
      //borderWidth:1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      position:'absolute',
      zIndex:1
    },
    arrow: {
      top:hps(4)
    },
    logo: {
      
    },
    user: {
      height:hps(36.5),
      width:hps(36.5),
      borderRadius:hps(36.5/2),
      position:'absolute',
      right:0,
      //top:3
    },
    eventImageContainer: {
      height:hps(410),
      width:wps(375),
    },
    eventImage: {
      height:'100%',
      width:'100%',
    },
    eventTitleContainer: {
      height:hps(112),
      width:wps(375),
      //marginLeft:wps(16.42),
      //borderWidth:1,
      paddingHorizontal : wps(16.42),
      position:'absolute',
      bottom:0,
      //backgroundColor: '#19202B70'
    },
    statusContainer: {
      height:hps(31.43),
      width: wps(86),
      //position:'absolute',
      //borderWidth:1,
      //top:hps(20),
      //left:wps(18),
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
    eventTitle: {
      fontSize:hps(24),
      fontFamily: Fonts.lightBold,
      color : Colors.white,
      //marginTop:hps(9)
    },
    eventInfoContainer: {
      height: hps(129.52),
      width : wps(345.91),
      //borderWidth:1
    },
    info: {
      fontSize : hps(14),
      fontFamily: Fonts.regular,
      color : Colors.white,
      lineHeight :hps(28),
    },
    videoInfoContainer: {
      height:hps(50.1),
      width: wps(341.48),
      //borderWidth : 1
    },
    formatTitle: {
      fontFamily: Fonts.regular,
      fontSize : hps(12),
      color : '#ffffff27'
    },
    formatContainer: {
      height : hps(30),
      width : wps(130),
      position:'absolute',
      bottom:0,
      //borderWidth:1,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row'
    },
    watchButton: {
      height : hps(46),
      width : wps(134),
      backgroundColor : Colors.base1,
      borderRadius:hps(23),
      position:'absolute',
      bottom:0,
      right:0,
      justifyContent:'center',
      alignItems:'center'
    },
    watchButtonText: {
      fontSize:hps(16),
      fontFamily:Fonts.semiBold,
      color : Colors.white,
      
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
      elevation:0.1,
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


    
      
})