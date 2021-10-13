import React, { Component, useEffect, useState } from 'react';
import {View,Text, ScrollView,SafeAreaView, StyleSheet, TouchableOpacity,Image,StatusBar,ActivityIndicator, Settings} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { _retrieveData,_storeData } from '../asyncStorage/AsyncFuncs';
import WalkThrough from '../views/walkThrough/index';
import Home from '../views/home_/index';
import HomeDetails from '../views/home/details/index';
import ViewerSelection from '../views/viewerSelection/index';
import SimpleStreaming from '../views/viewerSelection/2dStreaming/index';
import ThreeSixtyStreaming from '../views/viewerSelection/360streaming/index'; 
import Login from '../views/login_/index';
import Splash from '../views/splash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persister, store } from './../redux/store';
import Setting from '../views/setting';
import Event from '../views/event';
import BroadCast from '../views/broadCast';
import { BaseUrl } from '../graphql/baseUrl';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import Register from '../views/register_ ';


const client = new ApolloClient({
  uri: `${BaseUrl}/graphql`,
  cache: new InMemoryCache(),
});

const Stack7 = createStackNavigator();

export default class App extends React.Component {

  render() {
    return  <View style={{flex : 1}}>     
    <StatusBar translucent={true}  backgroundColor={'transparent'} ></StatusBar>
    <Provider store = {store}>
    <PersistGate persistor={persister}>
    <ApolloProvider client={client}>
    <NavigationContainer>
    <Stack7.Navigator
      screenOptions={{ gestureEnabled: false }}
      headerMode='none'
    >
      <Stack7.Screen
        name="splash"
        component={Splash}
      />
      <Stack7.Screen
        name="login"
        component={Login}
      />
      <Stack7.Screen
        name="register"
        component={Register}
      />
      <Stack7.Screen
        name="setting"
        component={Setting}
      />
      <Stack7.Screen
        name="event"
        component={Event}
      />
      <Stack7.Screen
        name="broadcast"
        component={BroadCast}
      />
      <Stack7.Screen
        name="walkThrough"
        component={WalkThrough}
      />
    <Stack7.Screen
        name="home"
        component={Home}
      />
      <Stack7.Screen
        name="homeDetails"
        component={HomeDetails}
      />
      <Stack7.Screen
        name="viewerSelection"
        component={ViewerSelection}
      />
       <Stack7.Screen
        name="simpleStreaming"
        component={SimpleStreaming}
      />
      <Stack7.Screen
        name="threeSixtyStreaming"
        component={ThreeSixtyStreaming}
      />

    </Stack7.Navigator>
    </NavigationContainer>
    </ApolloProvider>
    </PersistGate>
    </Provider>
    </View>
  }
}







