import React,{Component ,useEffect,useRef,useState } from "react"
import { SafeAreaView , View, ImageBackground, Image, TouchableOpacity, Text, TextInput, Dimensions,StatusBar, AppState, BackHandler, FlatList,Animated, ActivityIndicator, Keyboard} from "react-native"
import { Colors, hps, Images, wp, wps } from "../../assets"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from "react-redux"
import RnVerticalSlider from 'rn-vertical-slider-gradient'
import ToggleSwitch from 'toggle-switch-react-native'
import { BaseUrl } from "../../graphql/baseUrl"
import LivePlayer from "react-native-video360plugin";
import { _retrieveData } from '../../asyncStorage/AsyncFuncs';
import { OpenVidu } from 'openvidu-browser';
 // import InCallManager from 'react-native-incall-manager';  
import axios from 'axios'
import { empty } from "@apollo/client"

 
 const OPENVIDU_SERVER_URL = 'https://alessandro.quickver.com';
 const OPENVIDU_SERVER_SECRET = 'Husni123';





const BroadCast = (props) => {

  let vrheadset = ''
  let OV = {}
  let txt = useRef(null);
  let temp = []

  const { lang } = useSelector(state => state.language)
  const [mode, setMode] = useState('360')
  const [mic, setMic] = useState(true)
  const [vol, setVol] = useState(true)
  const [peoples, setPeoples] = useState(false)
  const [comments, setComments] = useState(true)
  const [value, setValue] = useState(10)
  const [volBar, setVolBar] = useState(false)
  const [sheight, setSHeight] = useState('')
  const [sWidth, setSWidth] = useState('')
  const [event, setEvent] = useState(props.route.params.event)

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
  const [publisherId, setPublisherId] =  useState('')
  const [indicator, setIndicator] =  useState(true)
  const [record, setRecord] = useState(false)
  const [vr, setVr] = useState(false)
  const [loader, setLoader] =  useState(false)
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
    componentDidMount()
  },[])


  const leaveSession = async(data) => {

    const mySession = session;
    await  mySession.disconnect()
    setTimeout(() => {
        OV = null;
        setSession(undefined);
        setSubscribers([]);
        setMySessionId('SessionA');
        setMyUserName('Participant' + Math.floor(Math.random() * 100));
        setMainStreamManager(undefined)
    });
    if(data)
    props.navigation.pop()
  }


  const _handleAppStateChange = (nextAppState) => {
    var a = null;
    var loading = null;
    if (
      appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
        loading = false;
        joinSession();
        console.log('You have joined the session!');
    }else{
        loading = true;
        leaveSession(false);
        console.log('You left the session!');
    }
    // console.log(a,loading)
    setAppState(nextAppState)
    setLoader(loading)
  };



  const componentDidMount = () => {
    vrheadset = (vrheadset == 'yes') ? true : false;
    //AppState.addEventListener('change', _handleAppStateChange());
    joinSession()
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    //alert(JSON.stringify(selectedURI));
    // console.warn(this.props.route.params.list[0].stream_url)
   //    InCallManager.start();
    //    InCallManager.setForceSpeakerphoneOn(true)
   
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



  const joinSession = () => {
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
            mySession
            .connect(token, { clientData: myUserName,group_id : a?.group?.id })
            .then(() => {

            let txtFieldRef = ref;
                if (Platform.OS == 'android') {
                    this.checkAndroidPermissions();
                }
                const properties = {
                    audioSource: true, // The source of audio. If undefined default microphone
                    videoSource: undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: undefined, // Whether you want to start publishing with your video enabled or not
                    resolution: '640x480', // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                };
                let publisher = OV.initPublisher(undefined, properties);
                //console.log("publisher=>", publisher)
                setMainStreamManager(publisher)
                mySession.publish(publisher);
                mySession.on('signal:my-chat', (event) => {
                  let temp = msgs
                  
                  
                  if(temp.length == 5){
                    temp.shift()
                    temp.push(event.data)
                    setMsgs([...temp])
                    
                  }else{
                    temp.push(event.data)
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
                });     
            })
            .catch((error) => {
                console.warn('There was an error connecting to the session:', error.code, error.message);
            });
            })
        .catch((error) => console.warn('Error', error));
}


const sendMsg = () => {
  session.signal({
    data: msg,  // Any string (optional)
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
    {console.log("ref=>>",ref)}
    <StatusBar hidden = {sheight>sWidth ? false : true}/>

    <View style = {styles.bgImage}>



    {!loader ? 
    <LivePlayer 
      // ref={(ref) => {
      //     this.player = ref
      // }}  
      urlVideo={selectedURI} 
      volume={1} 
      modeVideo={3} 
      enableInfoButton={false}
      enableFullscreenButton={false}
      enableCardboardButton={false}
      enableTouchTracking={false}
      hidesTransitionView={false}
      style={{ flex: 1}} />
      :
      <View style={{alignItems : 'center', justifyContent : 'center', flex : 1}}>
          <ActivityIndicator size='large'></ActivityIndicator>
      </View>}

    {/* <ImageBackground 
    source = {{uri : BaseUrl + event?.Cover[0]?.url}} 
    style = {styles.bgImage}
    > */}
    <View style = {styles.bgImage}>
      <TouchableOpacity 
      onPress = {() => {props.navigation.goBack()}}
      style = {sheight > sWidth? styles.back : styles.backLand}
      >
       <Image source = {Images.arrow} style = {styles.arrow}/>
      </TouchableOpacity>   

      <View style = {sheight > sWidth ? styles.modesContainer : styles.modesContainerLand}>
        
        <TouchableOpacity
        style = {[styles.mode, {backgroundColor : mode == '360' ? Colors.base1 : '#ffffff15'}]}
        >
        <Image source = {Images.degree_w}/>  
        </TouchableOpacity>
      
        <TouchableOpacity
        style = {[styles.mode, {backgroundColor : mode == 'vr' ? Colors.base1 : '#ffffff15'}]}
        >
        <Image source = {Images.vr_w}/>  
        </TouchableOpacity>
      
        <TouchableOpacity
        style = {[styles.mode, {backgroundColor : mode == 'video' ? Colors.base1 : '#ffffff15'}]}
        >
        <Image source = {Images.video_w}/>  
        </TouchableOpacity>
      </View>


      <Image source = {Images.middile} style = {styles.middle}/>

        

      



      {!comments &&
      <>
      <TouchableOpacity
      onPress = {() => {setVolBar(!volBar)}}
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, { bottom:sheight>sWidth? hps(104) : wps(20), right:sheight>sWidth? wps(16) : hps(16) }]}
      >
      <Image source = {value !== 0 ? Images.speaker : Images.speaker_off}/>  
      </TouchableOpacity>

      <TouchableOpacity
      onPress = {() => {setPeoples(!peoples)}}
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom: sheight>sWidth? hps(104) : wps(20), right:null, left:sheight>sWidth? wps(16) : hps(16)}]}
      >
      <Image source = {peoples ? Images.peoples_white : Images.peoples_grey}/>  
      </TouchableOpacity>

      <TouchableOpacity
      //onPress = {() => {setPeoples(!peoples)}}
      style = {[sheight>sWidth ? styles.volumeButton : styles.volumeButtonLand, {bottom:sheight>sWidth? hps(162) : hps(80),right:null,left:wps(16)}]}
      >
      <Image source = {Images.clap}/>
      </TouchableOpacity>

      <TouchableOpacity
      onPress = {() => {setMic(!mic)}}
      style = {sheight>sWidth ? styles.micMainButton : styles.micMainButtonLand}
      >
        <LinearGradient
        colors = {['#EBA0EF','#27E4E5']}
        onPress = {() => {console.log('clicked')}}
        style = {[styles.micMainButton,{position:'relative', bottom:null}]}
        >
        <Image style = {styles.mic} source = {mic? Images.mic_on : Images.mic_off}/>  
        </LinearGradient>
      </TouchableOpacity>

      {volBar && <View style = {sheight>sWidth ? styles.volSlider: styles.volSliderLand}>
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
        </View>}

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
            }}
          />
          <Text style = {styles.disableButtonTitle}>{lang?.disable_aud}</Text>
        </View>

        <View style = {styles.commentsContainer}>

          
          <FlatList
          data = {msgs}
          //inverted
          //containerStyle={{ flex: 1 }}
          renderItem = {({item, index}) => 
            <View style = {styles.comment}>
             <Image style = {styles.user} source = {Images.user}/>
             <Text style = {styles.text}>{item}</Text>
           </View>
          }
          keyExtractor={item => item}
          />
          

          {/* {msgs.map((i) => 
          <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>{i}</Text>
          </View>
          )} */}

          {/* <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>very cool!!!</Text>
          </View>

          <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>Bravooooo! Encore!!!</Text>
          </View>

          <View style = {styles.comment}>
            <Image style = {styles.user} source = {Images.user}/>
            <Text style = {styles.text}>It is excellent</Text>
          </View> */}
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
            style = {styles.send}>
             <Image source = {Images.send} style = {[styles.send, {position:'relative', right:null}]}/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
          style = {sheight > sWidth ? styles.micButton : styles.micButtonLand}>
            <Image source = {Images.mic_on} style = {styles.mic}/>
          </TouchableOpacity>

          <TouchableOpacity 
          style = {sheight > sWidth ? styles.clapButton : styles.clapButtonLand}>
            <Image source = {Images.clap} style = {styles.clap}/>
          </TouchableOpacity>

        </View>

        <TouchableOpacity 
          style = {sheight > sWidth ? styles.volumeButton : styles.volumeButtonLand}>
            <Image source = {Images.speaker} style = {styles.speaker}/>
          </TouchableOpacity>
      </View>}
      </View>

      {/* </ImageBackground> */}
      </View>
  </View>
)}

export default BroadCast