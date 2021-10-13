import AsyncStorage from '@react-native-community/async-storage';

export async function _storeData(key,data){
  try{
    const d = await AsyncStorage.setItem(key,JSON.stringify(data))
    return JSON.parse(d)
  }catch(err){
    console.log("User Id not Saved in AsyncStorage"+err)
    return err
  }
}

export async function _retrieveData(key){
  try{
    let d = await AsyncStorage.getItem(key)
    return JSON.parse(d)
  }catch(err){
    console.log("User Id not Exist in local" + err)
    return err
  }
}

export async function _removeItem(key){
  try{
    let d = await AsyncStorage.removeItem(key)
    return d
  }catch(err){
    console.log("User Id not Saved in AsyncStorage"+err)
    return err
  }
}