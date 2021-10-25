import { StyleSheet } from "react-native";
import { Colors, hp, hps, wp, wps } from "../../../assets";
import {Fonts} from './../../../assets/fonts/index'

export default StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : Colors.base,
    },
    bgImage: {
        height:'100%',
        width : '100%',
        justifyContent:'center',
        position:'absolute'
    },
    back: {
        position:'absolute',
        top:hps(45),
        left:wps(17),
        height:hps(25),
        width:hps(25),
        borderRadius:hps(12.5)
    },
    backLand: {
        position:'absolute',
        top:wps(21),
        left:hps(23),
        height:wps(25),
        width:wps(25),
        borderRadius:wps(12.5)
    },
    backTouch: {
        flex:1 , 
        justifyContent:'center',
        alignItems:'center',
    },
    modesContainer: {
        height:hps(155),
        width:wps(43),
        top : hps(35),
        right : wps(16),
        //borderWidth:1,
        position:'absolute',
        justifyContent:'space-between',
        alignItems:'center'
    },
    modesContainerLand: {
        width:hps(155),
        height:wps(43),
        top : wps(20),
        right : hps(16),
        //borderWidth:1,
        position:'absolute',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    mode: {
        height:hps(42),
        width:hps(42),
        borderRadius:hps(42/2),
        backgroundColor : '#ffffff35',
        alignItems:'center',
        justifyContent:'center',
        //borderWidth:1
    },
    middle: {
        alignSelf:'center'
    },

    commentsMainContainer: {
        height:hps(246),
        width:wps(360),
        marginLeft:wps(15),
        //borderWidth:1,
        position:'absolute',
        bottom:0,
        borderColor:'lightgreen'
    },
    commentsMainContainerLand: {
        //height:wps(246),
        width:hps(716),
        marginLeft:hps(23),
        //borderWidth:1,
        position:'absolute',
        bottom:0,
        borderColor:'lightgreen'
    },
    disableButtonContainer: {
        //height:hps(31.43),
        marginBottom : hps(19),
        width:wps(295),
       // borderWidth:1,
        flexDirection:'row',
        borderColor:'white'
        //alignItems:'center'
    },
    disableButton: {
        height:hps(16),
        width:wps(36),
        borderRadius:hps(8),
        backgroundColor:Colors.base
    },
    disableButtonTitle: {
        marginLeft:wps(6),
        fontSize : hps(12),
        fontFamily : Fonts.regular,
        color : Colors.white
    },
    commentsContainer: {
        height:hps(144),
        //width:'100%',
        //borderWidth:1,
        borderColor:'#fff',
        justifyContent:'flex-end'
    },
    textInputMainContainer: {
        height:hps(68),
        width:wps(352),
        //borderWidth:1,
        borderColor:'red',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    textInputMainContainerLand: {
        height:hps(68),
        //width:hps(352),
        //borderWidth:1,
        borderColor:'red',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    textInputContainer: {
        height:hps(46),
        width:wps(255),
        borderRadius:hps(23),
        backgroundColor : '#ffffff15',
        overflow:'hidden',
        justifyContent:'center'
    },
    textInputContainerLand: {
        height:wps(46),
        width:hps(615),
        borderRadius:hps(23),
        backgroundColor : '#ffffff15',
        overflow:'hidden',
        justifyContent:'center'
    },
    input: {
        height:'100%',
        width:'100%',
        paddingLeft : wps(26),
        fontSize : hps(14),
        fontFamily : Fonts.regular,
        color : Colors.white
    },
    send: {
        position:'absolute',
        right:wps(16),
        height:hps(16),
        width:wps(16)
    },
    micButton: {
        height:hps(42),
        width:hps(42),
        borderRadius:hps(42/2),
        backgroundColor:'#ffffff15',
        justifyContent:'center',
        alignItems:'center',
        //marginLeft:wps(9)
    },
    micButtonLand: {
        height:wps(42),
        width:wps(42),
        borderRadius:wps(42/2),
        backgroundColor:'#ffffff15',
        justifyContent:'center',
        alignItems:'center',
        //marginLeft:wps(9)
    },
    mic: {
        
    },
    clapButton: {
        height:hps(42),
        width:hps(42),
        borderRadius:hps(42/2),
        backgroundColor:'#ffffff15',
        justifyContent:'center',
        alignItems:'center',
        //marginLeft:wps(9)
    },
    clapButtonLand: {
        height:wps(42),
        width:wps(42),
        borderRadius:wps(42/2),
        backgroundColor:'#ffffff15',
        justifyContent:'center',
        alignItems:'center',
        //marginLeft:wps(9)
    },
    clap: {},
    volumeButton: {
        height:hps(42),
        width:hps(42),
        borderRadius:hps(42/2),
        backgroundColor:'#ffffff15',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:hps(82),
        right:hps(8),
    },
    volumeButtonLand: {
        height:wps(42),
        width:wps(42),
        borderRadius:wps(42/2),
        backgroundColor:'#ffffff15',
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:wps(82),
        right:hps(0),
    },
    speaker: {},
    comment: {
        minHeight:hps(35),
        //paddingVertical:hps(10),
        maxWidth:wps(250),
        alignSelf:'baseline',
        //minWidth:wps(100),
        paddingLeft:wps(4),
        paddingRight:wps(35),
        backgroundColor: '#ffffff20',
        borderRadius:hps(17.5),
        flexDirection:'row',
        //alignItems:'center',
        marginBottom:hps(13),
    },
    commentLand: {
        minHeight:wps(35),
        //paddingVertical:hps(10),
        maxWidth:hps(650),
        alignSelf:'baseline',
        //minWidth:wps(100),
        paddingLeft:hps(4),
        paddingRight:hps(35),
        backgroundColor: '#ffffff20',
        borderRadius:wps(17.5),
        flexDirection:'row',
        //alignItems:'center',
        marginBottom:wps(13),
    },
    user: {
        height:hps(26),
        width:hps(26),
        marginTop:hps(6),
    },
    text: {
        fontSize:hps(14),
        fontFamily:Fonts.medium,
        color :Colors.white,
        marginLeft:wps(14),
        marginTop:hps(8),
    },
    micMainButton: {
        height:hps(56.7),
        width:hps(56.7),
        borderRadius:hps(56.7/2),
        position:'absolute',
       // borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        bottom:hps(28),
        overflow:'hidden'
    },
    micMainButtonLand: {
        height:wps(56.7),
        width:wps(56.7),
        borderRadius:wps(56.7/2),
        position:'absolute',
       // borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        bottom:wps(28),
        overflow:'hidden'
    },
    volSlider: {
        height:hps(204),
        width:wps(10),
        right:wps(33),
        bottom:hps(154),
        position:'absolute'
    },
    volSliderLand: {
        height:wps(204),
        width:hps(10),
        right:wps(33),
        bottom:wps(69),
        position:'absolute'
    }
})