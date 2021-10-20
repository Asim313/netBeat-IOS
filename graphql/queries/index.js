import gql from 'graphql-tag';

export const EVENTS = gql`
query events($id: ID!){
  concerts(where : {
    concert_type : { id : $id}
  }){
    concert_type{
      name
      name_fr
    }
    id
    isLive
    ArtistName
    Location
    LocationInfo
    published_at
    Description
    concert_streams{
      stream_ios
      stream_android
      type
    }
    Cover{
      url
    }
  }
}`


export const LIVEEVENT = gql`
query{
  concerts(where : {
    isLive : true
  }){
    concert_type{
      name
      name_fr
    }
    id
    isLive
    ArtistName
    Location
    LocationInfo
    published_at
    Description
    concert_streams{
      stream_ios
      stream_android
      type
    }
    Cover{
      url
    }
  }
}`


export const SEARCHEVENTS = gql`
query events($name: String!){
  concerts(where : {
    ArtistName_contains : $name
  }){
    concert_type{
      name
      name_fr
    }
    id
    isLive
    ArtistName
    Location
    LocationInfo
    published_at
    Description
    concert_streams{
      stream_ios
      stream_android
      type
    }
    Cover{
      url
    }
  }
}`

export const TYPES = gql`
query{
  types{
    name
    name_fr
    id
  }
}`

export const GETUSERBYID = gql`
query user($id : ID!){
  user(id : $id){
    id
    username
    email
    id
    profile{
      url
    }
    artist_volume
    audience_volume
    notification
  }
}`

export const NOTIFICATIONS = gql`
query noti($id : ID!){
  queuedNotifications(where : {receiver_id : $id}, sort : "created_at:DESC" ){
    content
    created_at
    id
  }
}`

