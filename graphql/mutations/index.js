import gql from 'graphql-tag';

export const REGISTER = gql`
mutation register($email: String!, $password: String!, $username : String!){
    createUser(input : {
      data: {
        username : $username,
        email : $email,
        password : $password
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
        username
      }
    }
  }`

