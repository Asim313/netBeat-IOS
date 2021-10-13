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

