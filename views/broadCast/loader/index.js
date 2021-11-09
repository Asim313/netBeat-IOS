import React, { useEffect, useRef, useState, Button, Per } from "react"
import { ActivityIndicator, View } from "react-native"


const Loader = (props) => {

   useEffect(()=>{
     //global.mode = "360"  
     //props.navigation.pop()
     setTimeout(()=>
     {
      props.navigation.goBack()
     },5000)
   },[]) 

   return (
       <View style = {{ flex : 1, backgroundColor : '#000', justifyContent : 'center' , alignItem : "center"}}>
          <ActivityIndicator size = {'small'} color = {'#fff'}/>
       </View>
   ) 
}

export default Loader