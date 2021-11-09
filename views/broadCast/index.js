import InCallManager from 'react-native-incall-manager';  
import axios from 'axios'
import { useIsFocused } from '@react-navigation/core';
import { OpenVidu } from 'openvidu-browser'
import React, { useEffect, useRef, useState, Button, Per } from "react"
import { 
  ActivityIndicator, 
  Animated, 
  AppState, 
  BackHandler, 
  Dimensions, 
  FlatList, 
  Image, 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View ,
  PermissionsAndroid
} from "react-native"
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import Orientation from 'react-native-orientation'
import LivePlayerr from "react-native-video360plugin";
import {LivePlayer} from "react-native-dbb-rtmp";
import { useSelector } from "react-redux"
import RnVerticalSlider from 'rn-vertical-slider-gradient'
import ToggleSwitch from 'toggle-switch-react-native'
import { Colors, hps, Images, wp, wps } from "../../assets"
import { _retrieveData } from '../../asyncStorage/AsyncFuncs'
import KeepAwake from '@sayem314/react-native-keep-awake';
import styles from "./styles";
import { SVGS } from '../../assets/images/config'
import { BaseUrl } from '../../graphql/baseUrl';
import { Alert } from 'react-native';


 
 const OPENVIDU_SERVER_URL = 'https://alessandro.quickver.com';
 const OPENVIDU_SERVER_SECRET = 'Husni123';


 






const BroadCast = (props) => {

  let vrheadset = ''
  let OV = {}
  let txt = useRef(null);
  let temp = []
  let player = useRef(null);

  let isFocus = useIsFocused()

  const { lang } = useSelector(state => state.language)
  const [mode, setMode] = useState(3)
  const [mic, setMic] = useState(true)
  const [vol, setVol] = useState(true)
  const [peoples, setPeoples] = useState(false)
  const [comments, setComments] = useState(true)
  const [value, setValue] = useState(1)
  const [volBar, setVolBar] = useState(false)
  const [sheight, setSHeight] = useState('')
  const [sWidth, setSWidth] = useState('')
  const [event, setEvent] = useState(props.route.params.event)
  const [clapRender, setClapRender] = useState(false)
  const [appState, setAppState] = useState(AppState.currentState)
  const [mySessionId, setMySessionId] = useState('SessionA')
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100))
  const [session, setSession] =  useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [role, setRole] = useState('PUBLISHER')
  const [mirror, setMirror] = useState(true)
  const [videoSource, setVideoSource] = useState(undefined)
  const [video, setVideo] = useState(true)
  const [audio, setAudio] = useState(true)
  const [mainPublisher, setMAinPublisher] = useState()
  const [publisherId, setPublisherId] =  useState('')
  const [indicator, setIndicator] =  useState(true)
  const [record, setRecord] = useState(false)
  const [vr, setVr] = useState(false)
  const [loader, setLoader] =  useState(true)
  const [pause, setPause] = useState(false)
  const [loaderState, setLoaderState] = useState(false)
  const [selected, setSelected] = useState(0)
  const [selectedURI, setSelectedURI] = useState(props.route.params.event?.concert_streams?.filter(x => x.type == 'flat')[0]?.stream_ios)
  const [height, setHeight] = useState(new Animated.Value(-wp(8)))
  const [topHeaderHeight, setTopHeaderHeight] = useState(new Animated.Value(0))
  const [turnedOn, setTurnedOn] = useState(false)
  const [msg, setMsg] = useState('')
  const [msgs, setMsgs] = useState([])  
  const [ref, setRef] = useState(null)  
  const [fade, setFade] = useState(false)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [clap, setClap] = useState(false)
  const [ply, setPly] = useState(false)
  const [user, setUser] = useState({})


  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  


  useEffect(()=>{
    setTimeout(() => {
      setVolBar(false)
      setFade(true)
      setClapRender(true)
    },5000)
  },[])

  useEffect(()=>{
    setTimeout(() => {
      setClap(false)
    },5000)
  },[])


  // useEffect(()=>{
  //   //alert("mode="+ global.mode)
  //   if(global.mode == '360'){
  //     setMode(1)
  //     joinSession()
  //   }else if(global.mode == 'vr'){
  //     setMode(2)
  //     joinSession()
  //   }else if(global.mode == 'flat'){
  //     setMode(3)
  //     joinSession()
  //   }
  // },[isFocus])




 



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
    }, []);




  


 
  const getScreenSize = () => {  
    const screenWidth = Math.round(Dimensions.get('window').width);  
    const screenHeight = Math.round(Dimensions.get('window').height);  
    setSWidth(screenWidth)
    setSHeight(screenHeight) 
  } 

  useEffect(()=>{
    getScreenSize()
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      setSWidth(width)
      setSHeight(height) 
    })
    InCallManager.start({media: 'video'});
    componentDidMount()
  },[])


  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, []);


  const leaveSession = async(data) => {
    //console.log('disconnected...')
   // InCallManager.stop()
    const mySession = session;
    //console.log(mySession)
    const res = await  session.disconnect()
    
    //console.log("res=>", res)
    
    OV = {};
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined)
// InCallManager.setForceSpeakerphoneOn(false)
    // await InCallManager.stopRingtone();
    // await InCallManager.stopRingback();
    // await InCallManager.stop()
    if(data){
     //setPause(true) 
     props.navigation.goBack()
     //await InCallManager.stop()
    //  await InCallManager.stopRingtone();
    //  await InCallManager.stopRingback();
    //  await InCallManager.stop()
    }
  }

  function backButtonHandler(){
    // Registered function to handle the Back Press
    // We are generating an alert to show the back button pressed
    // alert('You clicked back. Now Screen will move to ThirdPage');
    // We can move to any screen. If we want
    if(!session){
      //alert("not connected...")
    }
    leaveSession(true)
    // Returning true means we have handled the backpress
    // Returning false means we haven't handled the backpress
    return true;
  }


  const _handleAppStateChange = (nextAppState) => {
    //console.log('appState========================================================>>>>>>>>>>>>>>>>>>>>>>>')
    alert('here...')
     var a = null;
     var loading = null;
    if (
      appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
        loading = false;
        joinSession();
        // setInterval(()=>{
        //   InCallManager.start();
        //   InCallManager.setForceSpeakerphoneOn(true);
         
        // },5000)
        

        //InCallManager.stop()
        console.log('You have joined the session!');
    }else{
        loading = true;
        leaveSession(false);
        console.log('You left the session!');
    }
    // // console.log(a,loading)
     setAppState(nextAppState)
    // setLoader(false)
  };




  const componentDidMount = () => {
    vrheadset = (vrheadset == 'yes') ? true : false;
    //console.log('here...')
    AppState.addEventListener('change', _handleAppStateChange);
    joinSession()
    // setInterval(()=>{
    //   InCallManager.start();
    //   InCallManager.setForceSpeakerphoneOn(true);
    // },5000)
    //BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    //alert(JSON.stringify(selectedURI));
    // console.warn(this.props.route.params.list[0].stream_url)
     //if(Platform.OS == 'ios'){
      //  InCallManager.start();
      //  InCallManager.setForceSpeakerphoneOn(true)
       //InCallManager.stop()
      //  InCallManager.stop()
     //}
  }

  const deleteSubscriber = (streamManager) => {
    setTimeout(() => {
        const subs = subscribers
        const index = subs.indexOf(streamManager, 0);
        if (index > -1) {
            subs.splice(index, 1);
            setSubscribers(subs)
        }
    });
  }


  const createSession = (sessionId) => {
    return new Promise((resolve) => {
        var data = JSON.stringify({ customSessionId: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                console.log('CREATE SESION', response);
                resolve(response.data.id);
            })
            .catch((response) => {
                console.log(response);
                var error = Object.assign({}, response);
                if (!error.response) {
                    console.error("Network error: ", error);
                    if( error.request && error.request._response){
                        console.error("Response of the request: ", error.request._response);
                    }
                }
                else if (error.response && error.response.status && error.response.status === 409) {
                    console.log('RESOLVING WITH SESSIONID, 409');
                    resolve(sessionId);
                } else {
                    console.warn(
                        'No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL,
                    );

                    Alert.alert(
                        'No connection to OpenVidu Server.',
                        'This may be a certificate error at "' +
                            OPENVIDU_SERVER_URL +
                            '"\n\nClick OK to navigate and accept it. ' +
                            'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                            OPENVIDU_SERVER_URL +
                            '"',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () =>
                                    Linking.openURL(OPENVIDU_SERVER_URL + '/accept-certificate').catch((err) =>
                                        console.error('An error occurred', err),
                                    ),
                            },
                        ],
                        { cancelable: false },
                    );
                }
            });
    });
  }


  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
        var data = JSON.stringify({ session: sessionId });
        axios
            .post(OPENVIDU_SERVER_URL + '/api/tokens', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log('TOKEN', response);
                setIndicator(false)
                resolve(response.data.token);
            })
            .catch((error) => reject(error));
    });
  }


  const getToken = () => {
    return createSession(mySessionId)
      .then((sessionId) => createToken(sessionId))
      .catch((error) => console.log(error));
  }


  const checkAndroidPermissions = async() => {
    try {
        const camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: 'Camera Permission',
            message: 'OpenVidu needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        });
        const audio = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
            title: 'Audio Permission',
            message: 'OpenVidu needs access to your microphone',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        });
        const storage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
            title: 'STORAGE',
            message: 'OpenVidu  needs access to your storage ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        });
        if (camera === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }
        if (audio === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the audio');
        } else {
            console.log('audio permission denied');
        }
        if (storage === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
        } else {
            console.log('storage permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
   }



  const joinSession = () => {
    //setPause(false)
    OV = new OpenVidu();
    setSession(OV.initSession())
    var mySession = OV.initSession()        
    mySession.on('streamDestroyed', (event) => {
        event.preventDefault();
        deleteSubscriber(event.stream.streamManager);
    }); 
    getToken()
        .then(async (token) => {
            const a = await _retrieveData('user');
            setUser(a)
            //console.log("user=>>", a?.profile?.url)
            mySession
            .connect(token, { clientData: myUserName,group_id : a?.group?.id })
            .then(() => {

             setSession(mySession)
               let txtFieldRef = ref;
                if (Platform.OS == 'android') {
                    checkAndroidPermissions();
                }
                const properties = {  
                    audioSource: true, // The source of audio. If undefined default microphone
                    videoSource: true, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: false, // Whether you want to start publishing with your video enabled or not
                    resolution: '640x480', // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                };
                let publisher = OV.initPublisher(undefined, properties);
                //setMAinPublisher(publisher)
                console.log("publisher=>", publisher)
                setMainStreamManager(publisher)
                mySession.publish(publisher);

                  // InCallManager.start({media: 'video'});
                  // InCallManager.setForceSpeakerphoneOn(true);
                  // //InCallManager.setSpeakerphoneOn(true)
                  // InCallManager.setKeepScreenOn(true)
                  setLoader(false);
              
                mySession.on('signal:my-chat', (event) => {
                  let temp = msgs
                  
                  
                  if(temp.length == 5){
                    temp.pop()
                    temp.unshift(event.data)
                    setMsgs([...temp])
                    
                  }else{
                    temp.unshift(event.data)
                    setMsgs([...temp])
                    // txtFeldRef.clear() 
                  }
                  //Keyboard.dismiss()
                  //console.log('There.......>>>>>>>>>',event.data)
                  //console.log('message',event.data); // Message
                  //console.log('sender',event?.from?.data?.clientData); // Connection object of the sender
                  //console.log('type',event.type); // The type of message ("my-chat")
                    // setLoaderState(true)
                    // setTimeout(()=>{
                    //     setLoaderState(false)
                    // },3500)
                })
                mySession.on('signal:clap' , (event) => {
                  //alert('clap=>', event.data)
                  setFade(false)
                  //setClapRender(false)
                  setClap(true)
                }) 

              //  alert("Openvidu Session Established");
                  
                  
                
                      
            })
            .catch((error) => {
                console.warn('There was an error connecting to the session:', error.code, error.message);
            });
            })
        .catch((error) => console.warn('Error', error));
}


const sendMsg = () => {
  session.signal({
    data: `${msg}|$|${user?.profile?.url}` ,  // Any string (optional)
    to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
    type: 'my-chat'             // The type of message (optional)
  })
  .then((res) => {
      console.log('Message successfully sent',res);
  })
  .catch(error => {
      console.error(error);
  });
  ref.clear();
}

return (
  <View style = {styles.mainContainer}>
    <StatusBar hidden = {sheight > sWidth ? false : true} />
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex : 1 }}
    >
    <TouchableOpacity 
    activeOpacity = {1}
    onPress = {() => {
      setFade(false)
    }}
    style = {styles.bgImage}>
      <KeepAwake />
    {!loader ? 
    <>
   {(mode == 1) && <LivePlayerr 
       urlVideo={props.route.params.event?.concert_streams?.filter(x => x.type == '360')[0]?.stream_ios} 
      //urlVideo={pause ? '' : "http://songmp4.com/files/Bollywood_video_songs/Bollywood_video_songs_2020/Mirchi_Lagi_Toh_Coolie_No.1_VarunDhawan_Sara_Ali_Khan_Alka_Yagnik_Kumar_S.mp4"} 
      modeVideo={1} 
      volume={1}
      enableInfoButton={false}
      enableFullscreenButton={false}
      enableCardboardButton={false}
      enableTouchTracking={false}
      paused = {pause}
      hidesTransitionView={false}
      ref = {(r) => {
        player = r
      }}
      style={{ flex: 1}} />}

      {(mode == 2) && <LivePlayerr
       urlVideo={props.route.params.event?.concert_streams?.filter(x => x.type == 'vr')[0]?.stream_ios} 
      //urlVideo={pause ? '' : "http://songmp4.com/files/Bollywood_video_songs/Bollywood_video_songs_2020/Mirchi_Lagi_Toh_Coolie_No.1_VarunDhawan_Sara_Ali_Khan_Alka_Yagnik_Kumar_S.mp4"} 
      modeVideo={2} 
      volume={1}
      displayMode={"cardboard"}
      enableInfoButton={false}
      paused = {pause}
      enableFullscreenButton={false}
      enableCardboardButton={false}
      enableTouchTracking={false}
      hidesTransitionView={false}
      style={{ flex: 1}} 
      ref = {(r) => {
        player = r
        console.log("reff=>>",r)
      }}
      />}
      {mode == 3 && Platform.OS == 'ios' && <LivePlayerr 
      //urlVideo = {'rtmp://49.12.106.146:1935/live/origin1'}
      urlVideo={props.route.params.event?.concert_streams?.filter(x => x.type == 'flat')[0]?.stream_ios} 
      //urlVideo={"http://songmp4.com/files/Bollywood_video_songs/Bollywood_video_songs_2020/Mirchi_Lagi_Toh_Coolie_No.1_VarunDhawan_Sara_Ali_Khan_Alka_Yagnik_Kumar_S.mp4"} 
      modeVideo={3} 
      enableInfoButton={false}
      enableFullscreenButton={false}
      enableCardboardButton={false}
      enableTouchTracking={false}
      hidesTransitionView={false}
      style={{ flex: 1}} />}
      
      {mode == 3 && Platform.OS == 'android' && <LivePlayer 
      // source={{uri:"http://songmp4.com/files/Bollywood_video_songs/Bollywood_video_songs_2020/Mirchi_Lagi_Toh_Coolie_No.1_VarunDhawan_Sara_Ali_Khan_Alka_Yagnik_Kumar_S.mp4"}}
      source={{uri : props.route.params.event?.concert_streams?.filter(x => x.type == 'flat')[0]?.stream_ios}}
        paused={false}
        style={{flex: 1}}
        muted={false}
        bufferTime={300}
        maxBufferTime={1000}
        resizeMode={"contain"}
        onLoading={()=>{}}
        onLoad={()=>{}}
        onEnd={()=>{}}
      />}
      </>
      :
      <View style={{alignItems : 'center', justifyContent : 'center', flex : 1}}>
          <ActivityIndicator size='large'></ActivityIndicator>
      </View>}

    {/* <ImageBackground 
    source = {{uri : BaseUrl + event?.Cover[0]?.url}} 
    style = {styles.bgImage}
    > */}
    <View style = {styles.bgImage}>

      {fade ? <Animatable.View
      animation = 'fadeOutLeft'
      style = {sheight > sWidth? styles.back : styles.backLand}
      >
      <TouchableOpacity 
      style = {styles.backTouch}
      onPress = {() => {
        leaveSession(true)
        //props.navigation.goBack()
        Orientation.lockToPortrait()
      }}
      >
       <Image source = {Images.arrow} style = {styles.arrow}/>
      </TouchableOpacity> 
      </Animatable.View>  
      :
      <Animatable.View
      animation = 'fadeInLeft'
      style = {sheight > sWidth? styles.back : styles.backLand}
      >
      <TouchableOpacity 
      style = {styles.backTouch}
      onPress = {() => {
        leaveSession(true)
        //props.navigation.goBack()
        Orientation.lockToPortrait()
      }}
      >
       <Image source = {Images.arrow} style = {styles.arrow}/>
      </TouchableOpacity> 
      </Animatable.View>}
      

      {fade? 
      <Animatable.View 
      animation = 'fadeOutRight'
      style = {sheight > sWidth ? [styles.modesContainer, {transform : [{translateX : fadeAnim}]}] : styles.modesContainerLand}>
        <TouchableOpacity
        disabled = {!event?.concert_streams?.some(x => x.type == '360')}
        onPress = {() => {
          Orientation.lockToPortrait()
          setMode(1)
         // setPause(true)
          setLoader(true)
          leaveSession(false).then(()=>{
            //  global.mode = '360'
            //  props.navigation.navigate('loader')
             joinSession()
          })
          
        }}
        style = {[ styles.mode, 
          {backgroundColor : mode == 1 ? Colors.base1 : '#ffffff15',
           opacity : event?.concert_streams?.some(x => x.type == '360') ? 1 : 0.5
          }
        ]}
        >
        {/* <Image source = {Images.degree_w}/>   */}
        <SVGS.degreeDark height = {hps(25)} width = {wps(29)}/>
        </TouchableOpacity>
      
        <TouchableOpacity
        disabled = {!event?.concert_streams?.some(x => x.type == 'vr')}
        onPress = {() => {
          Orientation.lockToLandscapeRight()
          setMode(2)
          //setPause(true)
          setLoader(true)
          leaveSession(false).then(()=>{
            // global.mode = 'vr'
            // props.navigation.navigate('loader')
            setValue(0)
            joinSession()
          })
        }}
        style = {[styles.mode, 
          {backgroundColor : mode == 2 ? Colors.base1 : '#ffffff15',
          opacity : event?.concert_streams?.some(x => x.type == 'vr') ? 1 : 0.5
         }]}
        >
        {/* <Image source = {Images.vr_w}/>   */}
        <SVGS.vrDark height = {hps(24)} width = {wps(24)}/>
        </TouchableOpacity>
      
        <TouchableOpacity
        disabled = {!event?.concert_streams?.some(x => x.type == 'flat')}
        onPress = {() => {
          Orientation.unlockAllOrientations()
          Orientation.lockToPortrait()
          setMode(3)
          setLoader(true)
          leaveSession(false).then(()=>{
            //  global.mode = 'flat'
            //  props.navigation.navigate('loader')
            setValue(0)
            joinSession()
          })
        }}
        style = {[styles.mode, 
          {backgroundColor : mode == 3 ? Colors.base1 : '#ffffff15',
          opacity : event?.concert_streams?.some(x => x.type == 'flat') ? 1 : 0.5
        }]}
        >
        {/* <Image source = {Images.video_w}/>   */}
        <SVGS.videoDark/>
        </TouchableOpacity>
      </Animatable.View>

      :

      <Animatable.View 
      animation = 'fadeInRight'
      style = {sheight > sWidth ? [styles.modesContainer, {transform : [{translateX : fadeAnim}]}] : styles.modesContainerLand}>
        <TouchableOpacity
        disabled = {!event?.concert_streams?.some(x => x.type == '360')}
        onPress = {() => {
          Orientation.lockToPortrait()
          setMode(1)
          //setPause(true)
          setLoader(true)
          leaveSession(false).then(()=>{
            //  global.mode = '360'
            //  props.navigation.navigate('loader')
            setValue(0)
            joinSession()
          })
        }}
        style = {[ styles.mode, 
          {backgroundColor : mode == 1 ? Colors.base1 : '#ffffff15',
           opacity : event?.concert_streams?.some(x => x.type == '360') ? 1 : 0.5
          }
        ]}
        >
       <SVGS.degreeDark height = {hps(25)} width = {wps(29)}/>
        </TouchableOpacity>
      
        <TouchableOpacity
        disabled = {!event?.concert_streams?.some(x => x.type == 'vr')}
        onPress = {() => {
          Orientation.lockToLandscapeRight()
          setMode(2)
          //setPause(true)
          setLoader(true)
          leaveSession(false).then(()=>{
            //  global.mode = 'vr'
            //  props.navigation.navigate('loader')
            setValue(0)
            joinSession()
          })
        }}
        style = {[styles.mode, 
          {backgroundColor : mode == 2 ? Colors.base1 : '#ffffff15',
          opacity : event?.concert_streams?.some(x => x.type == 'vr') ? 1 : 0.5
         }]}
        >
        <SVGS.vrDark height = {hps(24)} width = {wps(24)}/>
        </TouchableOpacity>
      
        <TouchableOpacity
        disabled = {!event?.concert_streams?.some(x => x.type == 'flat')}
        onPress = {() => {
          Orientation.unlockAllOrientations()
          Orientation.lockToPortrait()
          setMode(3)
          setLoader(true)
          leaveSession(false).then(()=>{
            // global.mode = 'flat'
            //  props.navigation.navigate('loader')
            setValue(0)
            joinSession()
          })
        }}
        style = {[styles.mode, 
          {backgroundColor : mode == 3 ? Colors.base1 : '#ffffff15',
          opacity : event?.concert_streams?.some(x => x.type == 'flat') ? 1 : 0.5
        }]}
        >
        <SVGS.videoDark/>
        </TouchableOpacity>
      </Animatable.View>}


      {
      mode == 1 &&  
      <>
      {
      fade?
      <Animatable.View 
      animation = "fadeOut"
      style = {styles.middle}>
        <Image source = {Images.middile}/>
      </Animatable.View>
      :
      <Animatable.View 
      animation = "fadeIn"
      style = {styles.middle}>
        <Image source = {Images.middile}/>
      </Animatable.View>
       }
      </>
      }



      {!comments &&
      <>
      {fade?
      <Animatable.View
      animation = "fadeOutRight"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, { bottom:sheight>sWidth? hps(104) : wps(20), right:sheight>sWidth? wps(16) : hps(16) }]}
      >
        <TouchableOpacity
        onPress = {() => {setVolBar(!volBar)}}
        >
        <Image source = {value !== 0 ? Images.speaker : Images.speaker_off}/>  
        </TouchableOpacity>
      </Animatable.View>
      :
      <Animatable.View
      animation = "fadeInRight"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, { bottom:sheight>sWidth? hps(104) : wps(20), right:sheight>sWidth? wps(16) : hps(16) }]}
      >
        <TouchableOpacity
        onPress = {() => {setVolBar(!volBar)}}
        >
        <Image source = {value !== 0 ? Images.speaker : Images.speaker_off}/>  
        </TouchableOpacity>
      </Animatable.View>}

      {fade?
      <Animatable.View
      animation = "fadeOutLeft"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom: sheight>sWidth? hps(104) : wps(20), right:null, left:sheight>sWidth? wps(16) : hps(16)}]}
      > 
        <TouchableOpacity
        onPress = {() => {setComments(true)}}
        >
        <Image source = {Images.comment} style = {{height:hps(22), width:wps(22)}}/>  
        </TouchableOpacity>
      </Animatable.View>
      :
      <Animatable.View
      animation = "fadeInLeft"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom: sheight>sWidth? hps(104) : wps(20), right:null, left:sheight>sWidth? wps(16) : hps(16)}]}
      > 
        <TouchableOpacity
        onPress = {() => {setComments(true)}}
        >
        <Image source = {Images.comment} style = {{height:hps(22), width:wps(22)}}/>  
        </TouchableOpacity>
      </Animatable.View>}


      {clap? 
       <>
       {fade ?
      <Animatable.View
      animation = "fadeOutLeft"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom:sheight>sWidth? hps(162) : hps(80),right:null,left:wps(16), backgroundColor:Colors.base1}]}>
        <Animatable.View
        animation='pulse'
        easing='ease-out' 
        delay = {1500}
        iterationCount="infinite"
        >
        <TouchableOpacity
        style = {{height:hps(38),
          width:hps(38),
          borderRadius:hps(38/2),
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:Colors.base
        }}
        onPress = {() => {}}
        >
        <SVGS.clap/>
        </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
      :
      <Animatable.View
      animation = "fadeInLeft"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom:sheight>sWidth? hps(162) : hps(80),right:null,left:wps(16), backgroundColor:Colors.base1}]}>
        <Animatable.View
        animation='pulse'
        easing='ease-out' 
        delay = {1500}
        iterationCount="infinite"
        
        >
        <TouchableOpacity
        style = {{height:hps(38),
          width:hps(38),
          borderRadius:hps(38/2),
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:Colors.base
        }}
        onPress = {() => {}}
        >
        <SVGS.clap/>
        </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>}
       </>
       :
       <>
       {fade?
      <Animatable.View
      animation = "fadeOutLeft"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom:sheight>sWidth? hps(162) : hps(80),right:null,left:wps(16)}]}>
      <TouchableOpacity
      onPress = {() => {}}
      >
      <SVGS.clap/>
      </TouchableOpacity>
      </Animatable.View>
      :
      <Animatable.View
      animation = "fadeInLeft"
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom:sheight>sWidth? hps(162) : hps(80),right:null,left:wps(16)}]}>
        <TouchableOpacity
        onPress = {() => {}}
        >
        <SVGS.clap/>
        </TouchableOpacity>
      </Animatable.View>}
       </>
       }
      
      

      

      {fade?
      <Animatable.View
       animation = 'fadeOutDown'
       style = {sheight>sWidth ? styles.micMainButton : styles.micMainButtonLand}
      >
        <TouchableOpacity
        onPress = {() => {
          setMic(!mic)
          mainStreamManager.publishAudio(!mic)
        }}
        >
          <LinearGradient
          colors = {['#EBA0EF','#27E4E5']}
          onPress = {() => {console.log('clicked')}}
          style = {[styles.micMainButton,{position:'relative', bottom:null}]}
          >
          <Image style = {styles.mic} source = {mic? Images.mic_on : Images.mic_off}/>  
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
      :
      <Animatable.View
       animation = 'fadeInUp'
       style = {sheight>sWidth ? styles.micMainButton : styles.micMainButtonLand}
      >
        <TouchableOpacity
        onPress = {() => {
          setMic(!mic)
          mainStreamManager.publishAudio(!mic)
        }}
        >
          <LinearGradient
          colors = {['#EBA0EF','#27E4E5']}
          onPress = {() => {console.log('clicked')}}
          style = {[styles.micMainButton,{position:'relative', bottom:null}]}
          >
          <Image style = {styles.mic} source = {mic? Images.mic_on : Images.mic_off}/>  
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>}

      

      {/* {volBar && <View style = {sheight>sWidth ? styles.volSlider: styles.volSliderLand}>
        <RnVerticalSlider
          value={value}
          disabled={false}
          min = {0}
          max = {100}
          onChange={(value) => {
            setValue(value)
          }}
          onComplete={(value) => {
            setValue(value)
          }}
          width={hps(10)}
          height={wps(204)}
          step={1}
          borderRadius={wps(5)}
          minimumTrackTintColor={['#27E4E5','#CB65C7']}
          maximumTrackTintColor={"#E2EEFF45"}
        />
        </View>} */}

      </>
      }

      {comments &&
       <View style = {sheight > sWidth ? styles.commentsMainContainer : styles.commentsMainContainerLand}>

        <View style = {styles.disableButtonContainer}>
        <ToggleSwitch
            isOn={comments}
            onColor={Colors.base}
            offColor={Colors.base}
            thumbOnStyle = {{backgroundColor:Colors.base1}}
            thumbOffStyle = {{backgroundColor:Colors.base1}}
            size="small"
            onToggle={isOn => {
              setComments(!comments)
              //joinSession()  
            }}
          />
          <Text style = {styles.disableButtonTitle}>{lang?.disable_aud}</Text>
        </View>

        <View style = {styles.commentsContainer}>
          <FlatList
          data = {msgs}
          inverted
          renderItem = {({item, index}) => 
          
            <View style = {sheight > sWidth ? styles.comment : styles.commentLand}>
              {console.log("urllll=",BaseUrl + item.split('|$|')[1])}
             {(item.split('|$|')[1]).includes('/uploads') ?
             <Image style = {styles.user} source = {{uri : `https://api.netbeat.live${item.split('|$|')[1]}`}}/>
             :
             <Image style = {styles.user} source = {Images.default_dp}/>
            }
             <Text style = {styles.text}>{item.split('|$|')[0]}</Text>
           </View>
          }
          keyExtractor={item => item}
          />
        </View>

        <View style = {sheight > sWidth ? styles.textInputMainContainer : styles.textInputMainContainerLand}>

          <View style = {sheight > sWidth ? styles.textInputContainer : styles.textInputContainerLand}>
            <TextInput
            style = {styles.input}
            placeholder = {lang?.message}
            placeholderTextColor = {Colors.white}
            onChangeText = {(txt) => {setMsg(txt)}}
            ref = {(ref) => setRef(ref)}
            />
            <TouchableOpacity 
            onPress = {() => {
              sendMsg()
            }}
            style = {[styles.send, {borderWidth:0, padding:12, justifyContent:'center', alignItems:'center'}]}>
             {/* <Image source = {Images.send} style = {[styles.send, {position:'relative', right:null}]}/> */}
             <SVGS.send style = {[styles.send, {position:'relative', right:null}]}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
          onPress = {() => {
            setMic(!mic)
            mainStreamManager.publishAudio(!mic)
          }}
          style = {sheight > sWidth ? styles.micButton : styles.micButtonLand}>
            <Image source = {mic? Images.mic_on : Images.mic_off} style = {styles.mic}/>
          </TouchableOpacity>

          {clap && <Animatable.View
          animation='pulse'
          easing='ease-out' 
          delay = {1500}
          iterationCount="infinite"
          style = {sheight > sWidth ? [styles.clapButton , {backgroundColor:Colors.base1}] : [styles.clapButtonLand, {backgroundColor:Colors.base1}]}>
            {/* <Image source = {Images.clap} style = {styles.clap}/> */}
            <SVGS.clap style = {styles.clap}/>
          </Animatable.View>}

          {!clap && <View style = {sheight > sWidth ? styles.clapButton : styles.clapButtonLand}>
            {/* <Image source = {Images.clap} style = {styles.clap}/> */}
            <SVGS.clap style = {styles.clap}/>
          </View>}

        </View>

        <TouchableOpacity 
          onPress = {()=>{
            // if( value == 0 ){
            //   InCallManager.setForceSpeakerphoneOn(true);
            //   //InCallManager.setSpeakerphoneOn(true)
            //   InCallManager.setKeepScreenOn(true)
            //   setValue(1)
            // }else{
            //   InCallManager.setForceSpeakerphoneOn(false);
            //   //InCallManager.stop()
            //   setValue(0)
            // }
          }}
          style = {sheight > sWidth ? styles.volumeButton : styles.volumeButtonLand}>
            <Image source = {Images.speaker} style = {styles.speaker}/>
          </TouchableOpacity>
      </View>}
      </View>

      {/* {isKeyboardVisible && <View style = {{height:hp(8), width:wp(100), borderWidth:1, backgroundColor:'red'}}></View>} */}
      {/* </ImageBackground> */}
      </TouchableOpacity>
      </KeyboardAvoidingView>
  </View>
)}

export default BroadCast


// import React,{Component ,useEffect,useRef,useState } from "react"
// import { SafeAreaView , View, ImageBackground, Image, TouchableOpacity, Text, TextInput, Dimensions,StatusBar, AppState, BackHandler, FlatList,Animated, ActivityIndicator, Keyboard, KeyboardAvoidingView} from "react-native"
// import { Colors, hp, hps, Images, wp, wps } from "../../assets"
// import styles from "./styles"
// import LinearGradient from 'react-native-linear-gradient'
// import { useSelector } from "react-redux"
// import RnVerticalSlider from 'rn-vertical-slider-gradient'
// import ToggleSwitch from 'toggle-switch-react-native'
// import { BaseUrl } from "../../graphql/baseUrl"

// import LivePlayerr from "react-native-video360plugin";
// import {LivePlayer} from "react-native-dbb-rtmp";
// import {Platform} from 'react-native';

// import { _retrieveData } from '../../asyncStorage/AsyncFuncs';
// import { OpenVidu } from 'openvidu-browser';
//  // import InCallManager from 'react-native-incall-manager';  
// import axios from 'axios'
// import Orientation from 'react-native-orientation';
// import * as Animatable from 'react-native-animatable';

 
//  const OPENVIDU_SERVER_URL = 'https://alessandro.quickver.com';
//  const OPENVIDU_SERVER_SECRET = 'Husni123';





// const BroadCast = (props) => {

//   let vrheadset = ''
//   let OV = {}
//   let txt = useRef(null);
//   let temp = []
//   let player = useRef(null)

//   const { lang } = useSelector(state => state.language)
//   const [mode, setMode] = useState(3)
//   const [mic, setMic] = useState(true)
//   const [vol, setVol] = useState(true)
//   const [peoples, setPeoples] = useState(false)
//   const [comments, setComments] = useState(true)
//   const [value, setValue] = useState(10)
//   const [volBar, setVolBar] = useState(false)
//   const [sheight, setSHeight] = useState('')
//   const [sWidth, setSWidth] = useState('')
//   const [event, setEvent] = useState(props.route.params.event)

//   const [appState, setAppState] = useState(AppState.currentState)
//   const [mySessionId, setMySessionId] = useState('SessionA')
//   const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100))
//   const [session, setSession] =  useState(undefined)
//   const [mainStreamManager, setMainStreamManager] = useState(undefined)
//   const [subscribers, setSubscribers] = useState([])
//   const [role, setRole] = useState('PUBLISHER')
//   const [mirror, setMirror] = useState(true)
//   const [videoSource, setVideoSource] = useState(undefined)
//   const [video, setVideo] = useState(true)
//   const [audio, setAudio] = useState(true)
//   const [mainPublisher, setMAinPublisher] = useState()
//   const [publisherId, setPublisherId] =  useState('')
//   const [indicator, setIndicator] =  useState(true)
//   const [record, setRecord] = useState(false)
//   const [vr, setVr] = useState(false)
//   const [loader, setLoader] =  useState(false)
//   const [pause, setPause] = useState(false)
//   const [loaderState, setLoaderState] = useState(false)
//   const [selected, setSelected] = useState(0)
//   const [selectedURI, setSelectedURI] = useState(props.route.params.event?.concert_streams?.filter(x => x.type == 'flat')[0]?.stream_ios)
//   const [height, setHeight] = useState(new Animated.Value(-wp(8)))
//   const [topHeaderHeight, setTopHeaderHeight] = useState(new Animated.Value(0))
//   const [turnedOn, setTurnedOn] = useState(false)
//   const [msg, setMsg] = useState('')
//   const [msgs, setMsgs] = useState([])  
//   const [ref, setRef] = useState(null)  
//   const [fade, setFade] = useState(false)
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false);
//   const [clap, setClap] = useState(false)


//   const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  


//   useEffect(()=>{
//     setInterval(() => {
//       setVolBar(false)
//       setFade(true)
//     },5000)
//   },[])

//   useEffect(()=>{
//     setInterval(() => {
//       setClap(false)
//     },5000)
//   },[])


//   useEffect(() => {
//     const keyboardDidShowListener = Keyboard.addListener(
//       'keyboardDidShow',
//       () => {
//         setKeyboardVisible(true); // or some other action
//       }
//     );
//     const keyboardDidHideListener = Keyboard.addListener(
//       'keyboardDidHide',
//       () => {
//         setKeyboardVisible(false); // or some other action
//       }
//     );

//     return () => {
//       keyboardDidHideListener.remove();
//       keyboardDidShowListener.remove();
//     };
//     }, []);

  


 
//   const getScreenSize = () => {  
//     const screenWidth = Math.round(Dimensions.get('window').width);  
//     const screenHeight = Math.round(Dimensions.get('window').height);  
//     setSWidth(screenWidth)
//     setSHeight(screenHeight) 
//   } 

//   useEffect(()=>{
//     getScreenSize()
//     Dimensions.addEventListener('change', (e) => {
//       const { width, height } = e.window;
//       setSWidth(width)
//       setSHeight(height) 
//     })
//     componentDidMount()
//   },[])


//   const leaveSession = async(data) => {
//     console.log('disconnected...')
//     const mySession = session;
//     console.log(mySession)
//     const res = await  session.disconnect()
//     console.log("res=>", res)
//     setTimeout(() => {
//         OV = null;
//         setSession(undefined);
//         setSubscribers([]);
//         setMySessionId('SessionA');
//         setMyUserName('Participant' + Math.floor(Math.random() * 100));
//         setMainStreamManager(undefined)
//     });
//     if(data)
//     props.navigation.pop()
//   }

//   const handleBackButtonClick = () => {
//     // Registered function to handle the Back Press
//     // We are generating an alert to show the back button pressed
//     // alert('You clicked back. Now Screen will move to ThirdPage');
//     // We can move to any screen. If we want
//     leaveSession(true)
//     // Returning true means we have handled the backpress
//     // Returning false means we haven't handled the backpress
//     return true;
//   }


//   const _handleAppStateChange = (nextAppState) => {

//     //console.log('appState========================================================>>>>>>>>>>>>>>>>>>>>>>>')
//     console.log('here', nextAppState)
//      var a = null;
//      var loading = null;
//     if (
//       appState.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//         loading = false;
//         joinSession();
//         console.log('You have joined the session!');
//     }else{
//         loading = true;
//         leaveSession(false);
//         console.log('You left the session!');
//     }
//     // // console.log(a,loading)
//      setAppState(nextAppState)
//      setLoader(loading)
//   };




//   const componentDidMount = () => {
//     vrheadset = (vrheadset == 'yes') ? true : false;
//     console.log('here...')
//     AppState.addEventListener('change', _handleAppStateChange);
//     joinSession()
//     BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//     //alert(JSON.stringify(selectedURI));
//     // console.warn(this.props.route.params.list[0].stream_url)
//    //    InCallManager.start();
//     //    InCallManager.setForceSpeakerphoneOn(true)
   
//   }

//   const deleteSubscriber = (streamManager) => {
//     setTimeout(() => {
//         const subs = subscribers
//         const index = subs.indexOf(streamManager, 0);
//         if (index > -1) {
//             subs.splice(index, 1);
//             setSubscribers(subs)
//         }
//     });
//   }


//   const createSession = (sessionId) => {
//     return new Promise((resolve) => {
//         var data = JSON.stringify({ customSessionId: sessionId });
//         axios
//             .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
//                 headers: {
//                     Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                 },
//             })
//             .then((response) => {
//                 console.log('CREATE SESION', response);
//                 resolve(response.data.id);
//             })
//             .catch((response) => {
//                 console.log(response);
//                 var error = Object.assign({}, response);
//                 if (!error.response) {
//                     console.error("Network error: ", error);
//                     if( error.request && error.request._response){
//                         console.error("Response of the request: ", error.request._response);
//                     }
//                 }
//                 else if (error.response && error.response.status && error.response.status === 409) {
//                     console.log('RESOLVING WITH SESSIONID, 409');
//                     resolve(sessionId);
//                 } else {
//                     console.warn(
//                         'No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL,
//                     );

//                     Alert.alert(
//                         'No connection to OpenVidu Server.',
//                         'This may be a certificate error at "' +
//                             OPENVIDU_SERVER_URL +
//                             '"\n\nClick OK to navigate and accept it. ' +
//                             'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
//                             OPENVIDU_SERVER_URL +
//                             '"',
//                         [
//                             {
//                                 text: 'Cancel',
//                                 onPress: () => console.log('Cancel Pressed'),
//                                 style: 'cancel',
//                             },
//                             {
//                                 text: 'OK',
//                                 onPress: () =>
//                                     Linking.openURL(OPENVIDU_SERVER_URL + '/accept-certificate').catch((err) =>
//                                         console.error('An error occurred', err),
//                                     ),
//                             },
//                         ],
//                         { cancelable: false },
//                     );
//                 }
//             });
//     });
//   }


//   const createToken = (sessionId) => {
//     return new Promise((resolve, reject) => {
//         var data = JSON.stringify({ session: sessionId });
//         axios
//             .post(OPENVIDU_SERVER_URL + '/api/tokens', data, {
//                 headers: {
//                     Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then((response) => {
//                 console.log('TOKEN', response);
//                 setIndicator(false)
//                 resolve(response.data.token);
//             })
//             .catch((error) => reject(error));
//     });
//   }


//   const getToken = () => {
//     return createSession(mySessionId)
//       .then((sessionId) => createToken(sessionId))
//       .catch((error) => console.log(error));
//   }



//   const joinSession = () => {
//     OV = new OpenVidu();
//     setSession(OV.initSession())
//     var mySession = OV.initSession()        
//     mySession.on('streamDestroyed', (event) => {
//         event.preventDefault();
//         deleteSubscriber(event.stream.streamManager);
//     });
      
//     getToken()
//         .then(async (token) => {
//             const a = await _retrieveData('user');
//             mySession
//             .connect(token, { clientData: myUserName,group_id : a?.group?.id })
//             .then(() => {
//              setSession(mySession)
//                let txtFieldRef = ref;
//                 if (Platform.OS == 'android') {
//                     //checkAndroidPermissions();
//                 }
//                 const properties = {  
//                     audioSource: true, // The source of audio. If undefined default microphone
//                     videoSource: true, // The source of video. If undefined default webcam
//                     publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
//                     publishVideo: false, // Whether you want to start publishing with your video enabled or not
//                     resolution: '640x480', // The resolution of your video
//                     frameRate: 30, // The frame rate of your video
//                     insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
//                 };
//                 let publisher = OV.initPublisher(undefined, properties);
//                 //setMAinPublisher(publisher)
//                 console.log("publisher=>", publisher)
//                 setMainStreamManager(publisher)
//                 mySession.publish(publisher);
//                 mySession.on('signal:my-chat', (event) => {
//                   let temp = msgs
                  
                  
//                   if(temp.length == 5){
//                     temp.pop()
//                     temp.unshift(event.data)
//                     setMsgs([...temp])
                    
//                   }else{
//                     temp.unshift(event.data)
//                     setMsgs([...temp])
//                     // txtFeldRef.clear() 
//                   }
//                   //Keyboard.dismiss()
//                   //console.log('There.......>>>>>>>>>',event.data)
//                   //console.log('message',event.data); // Message
//                   //console.log('sender',event?.from?.data?.clientData); // Connection object of the sender
//                   //console.log('type',event.type); // The type of message ("my-chat")
//                     // setLoaderState(true)
//                     // setTimeout(()=>{
//                     //     setLoaderState(false)
//                     // },3500)
//                 })
//                 mySession.on('signal:clap' , (event) => {
//                   //alert('clap=>', event.data)
//                   setFade(false)
//                   setClap(true)
//                 }) 
//             })
//             .catch((error) => {
//                 console.warn('There was an error connecting to the session:', error.code, error.message);
//             });
//             })
//         .catch((error) => console.warn('Error', error));
// }


// const sendMsg = () => {
//   session.signal({
//     data: msg,  // Any string (optional)
//     to: [],                     // Array of Connection objects (optional. Broadcast to everyone if empty)
//     type: 'my-chat'             // The type of message (optional)
//   })
//   .then((res) => {
//       console.log('Message successfully sent',res);
//   })
//   .catch(error => {
//       console.error(error);
//   });
//   ref.clear();
// }

// return (
//   <View style = {styles.mainContainer}>
//     <LivePlayerr 
//       //urlVideo = {'rtmp://49.12.106.146:1935/live/origin1'}
//       //urlVideo={props.route.params.event?.concert_streams?.filter(x => x.type == 'flat')[0]?.stream_ios} 
//       urlVideo={"http://songmp4.com/files/Bollywood_video_songs/Bollywood_video_songs_2020/Mirchi_Lagi_Toh_Coolie_No.1_VarunDhawan_Sara_Ali_Khan_Alka_Yagnik_Kumar_S.mp4"} 
//       //volume = {0.0} 
//       modeVideo = {1}
//       displayMode = "cardboard"
//       enableInfoButton={false}
//       enableFullscreenButton={false}
//       enableCardboardButton={true}
//       enableTouchTracking={false}
//       hidesTransitionView={false}
//       style={{ flex: 1}} 
//       ref = {(r) => {
//         player = r
//         console.log("reff=>>",r)
//       }}
//       />
//   </View>
// )}

// export default BroadCast