import React from 'react';
//import {Alert} from 'react-native'
import messaging from '@react-native-firebase/messaging';

class PushNotificationService {

    init() {
        return new Promise(async (resolve, reject) => {

            // Get the device token
            messaging()
                .getToken()
                .then(async (token:any) => {
                    resolve(token);
                    // return saveTokenToDatabase(token);
                });


            // const unsubscribe = messaging().onMessage(async (remoteMessage:any) => {
            //     // Alert.alert('A new FCM message arrived!' + JSON.stringify(remoteMessage));
            //     const data = JSON.parse(remoteMessage.data.data)
            //     const userId : any = auth().currentUser?.uid
            //     if(data.sendBy === userId.uid)
            //     {
            //         console.log('no nortf')
            //     }
            //     else{

            //         const message = (remoteMessage.notification.title +"\n "+ remoteMessage.notification.body )
            //           //  Toast.showWithGravity(message, Toast.LONG, Toast.TOP);
            //      }
            // });


            // messaging().setBackgroundMessageHandler(async (remoteMessage:any) => {
             
            //      console.log('Message handled in the background!', remoteMessage);
            // });


            // messaging().onNotificationOpenedApp(async (remoteMessage:any) => {
            //      console.log('Message handled on nortification open !', remoteMessage);
              
            // })
  
        });
    }


    sendPush = (token: string, _data: { title: string, body: string, data:{sendBy: string} }) => {
        // sendPush = (token: string, _data: { title: string, body: { message : string, sendBy : string} }) => {
        console.log('Send Push function is running')
        console.log('token=>>>',token)

        let data = {
            "to": token,
            "notification": {
                "title": _data.title,
                "body": _data.body,
            },
            "data" : { "data" : _data.data }
        }

        return fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAA2Sb1jJc:APA91bFW3t92B9Tc90mlOM303nNkG4EbFqzjHxjzXQJCsGOQdfeBpPxf_cwxclVrH6U958hGmJok32vBqUX6mWlc1-GBEi2kGRc8asmk7C25402XQY6VLV8Yv_A6ENJFZSPuVvr46x_s'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log("push send res", res);
        }).catch((err) => { console.log("push send err", err); });

    }
}

const push = new PushNotificationService();
export {push}