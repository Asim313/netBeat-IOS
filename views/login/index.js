import React,{Component, useState} from 'react';
import {KeyboardAvoidingView,View,Text, Image,TextInput,ImageBackground,Platform, TouchableOpacity,ScrollView} from 'react-native';
import { wp,hp,Size } from '../../assets/index';
import { _retrieveData,_storeData } from '../../asyncStorage/AsyncFuncs';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';

const UserInput = (props) => {
    return <View
    style={{
      flex : 1,
      width : props.width,
      justifyContent : 'center',
      backgroundColor : props.backgroundColor,
      borderRadius : props.borderRadius,
     
    }}
    >
      <View style={{ marginHorizontal : props.marginHorizontal}}>
        <TextInput
          style={props.textStyle}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          autoCorrect={props.autoCorrect}
          autoCapitalize={props.autoCapitalize}
          returnKeyType={props.returnKeyType}
          placeholderTextColor={props.placeholderTextColor}
          underlineColorAndroid="transparent"
          onChangeText={props.onChangeText}
          value={props.value}
          maxLength={props.maxLength}
          textAlignVertical={props.textAlignVertical}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          blurOnSubmit={props.blurOnSubmit}
          onSubmitEditing={props.onSubmitEditing}
          editable={props.editable}
        />
        </View>
      </View>
}

export default class Login extends Component{
    // static contextType = Context;

    state={
        email : 'hasnain@excelorithm.com',
        password : 'husni123**',
        notFound : undefined,
        loader : false
    }

    async componentDidMount(){
        const a = await _retrieveData('firstTime');
        if(a == false)
        this.setState({
        notFound : false
        })
        else
        this.setState({
        notFound : true
    })
}


    signIn = async () => {
        this.setState({
            loader : true
        })
        axios
        .post('http://88.198.152.58:1337/auth/local', {
          identifier: this.state.email,
          password: this.state.password,
        })
        .then(response => {
          // Handle success.
          console.log(response.data)
          if (response.status === 200) {
                if(this.state.notFound == false)
                this.props.navigation.replace('home')
                else
                this.props.navigation.replace('walkThrough')

                _storeData('user',response.data?.user)
                
                this.setState({
                    loader : false
                })
            }
        })
        .catch(error => {
          // Handle error.
          this.setState({
            loader : false
        })
          alert('An error occurred:', error.response);
        });
          }

    

    render(){
        return(
            <KeyboardAvoidingView style={{flex : 1, backgroundColor : '#080809'}} behavior={(Platform.OS === 'ios')? "padding" : null}>  
                {/* <ImageBackground source={''} style={{height : hp('100%')}} > */}
                <ScrollView>
                <View style={{flex : 1, height : hp(92)}}>
                    <View style={{flex : .6 ,  justifyContent : 'center', alignItems : 'center'}}>
                        <Image source={require('../../resources/images/logo.png')} resizeMode={'contain'} style={{width : wp('50%'), height : hp('50%')}}></Image>
                    </View>
                    <View style={{flex : .01}}></View>
                    <View style={{flex : .065,justifyContent : "center", alignItems : 'center'}}>
                        <UserInput onChangeText={(val)=>{
                            this.setState({
                                email : val
                            })
                        }} width={wp('77%')} borderRadius={wp('10%')} marginHorizontal={wp('10%')} placeholder={'Email'} textStyle={{color : '#fff', letterSpacing : 0.75, fontSize : hp('2%')}} placeholderTextColor={'#fff'} backgroundColor={'#252525'}></UserInput>
                    </View>
                    <View style={{flex : .025}}></View>
                    <View style={{flex : .065,justifyContent : "center", alignItems : 'center'}}>
                    <UserInput onChangeText={(val)=>{
                            this.setState({
                                password : val
                            })
                        }} width={wp('77%')} borderRadius={wp('10%')} marginHorizontal={wp('10%')} placeholder={'Password'} textStyle={{color : '#fff', letterSpacing : 0.75, fontSize : hp('2%')}} placeholderTextColor={'#fff'} backgroundColor={'#252525'}></UserInput>
                        </View>
                    <View style={{flex : .025}}></View>
                    <View style={{flex : .065,justifyContent : "center", alignItems : 'center'}}>
                    {this.state.email != '' && this.state.password != '' ?
                     <TouchableOpacity 
                     onPress={()=>{this.signIn()}} 
                     style={{height : hp(5.5),borderRadius : wp(2), width : wp(78), backgroundColor :'#007AFF', flexDirection : 'row', alignSelf : 'center'}}>
                     <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        {this.state.loader ? 
                        <ActivityIndicator color='#fff' size='large'></ActivityIndicator> 
                        :
                        <Text style={{color : '#fff', fontSize : Size(2)}}>Login</Text>
                        }
                     </View>
                     </TouchableOpacity>                    
                    :
                    <View style={{height : hp(5.5),borderRadius : wp(2), width : wp(78), backgroundColor : '#007AFF', flexDirection : 'row', alignSelf : 'center'}}>
                    {/* <View style={{flex : .2, justifyContent : 'center', alignItems : 'center', position : 'absolute',alignSelf : 'center', marginHorizontal : wp(5) }}>
                        <Image resizeMode ='contain' source={Images.save} style={{height : hp(2.5), width : wp(4)}}></Image>
                    </View> */}
                    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{color : '#fff', fontSize : Size(2)}}>Login</Text>
                    </View>
                    </View>                  
                                }
                    </View>
                    <View style={{flex : .035}}></View>
                    {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate('signup')}} style={{flex : .1, justifyContent : 'center',width : wp('55%'), alignSelf : 'center'}}>
                    <Text style={{color : Colors.white, fontSize : 12, textAlign : "center"}}>Dont have an account? Sign Up.</Text>
                    </TouchableOpacity>
                    <View style={{flex : .01}}></View> */}
                </View>
                {/* </ImageBackground> */}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}