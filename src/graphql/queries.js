import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS } from './fragments';

export const ALL_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`
export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
export const SINGLE_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
      url
    }
  }
  ${REPOSITORY_DETAILS}
` 
