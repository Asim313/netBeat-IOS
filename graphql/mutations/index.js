import gql from 'graphql-tag';

export const REGISTER = gql`
mutation register($email: String!, $password: String!, $username : String!){
    createUser(input : {
      data: {
        username : $username,
        email : $email,
        password : $password,
        artist_volume : 50
        audience_volume : 50
        notification : true
      }
    }){
      user{
        id
      }
    }
  }`

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(input : {
      identifier : $email,
      password : $password,
      provider : "local",
    }){
      user{
        id
      }
    }
  }`

export const UPDATEUSER = gql`
mutation user($id : ID! , $notification : Boolean, $profile : ID, $username : String, $artist_volume : Int, $audience_volume : Int){
  updateUser(input : {
    where : { id : $id }
    data : {
      notification : $notification,
      profile : $profile,
      username : $username,
      artist_volume : $artist_volume,
      audience_volume : $audience_volume
    }
  }){
   user{
    id
    email
    profile{
      url
    }
    username
    artist_volume
    audience_volume
    notification
  } 
  }
}`  


export const SAVEDEVICETOKEN = gql`
mutation saveToken($token : String!, $id : ID!) {
  createDeviceToken(
  input : {
    data :{
      token : $token,
      user_id : $id
    }
  }
  )
  {
     deviceToken {
        id
    }
  }
}`




