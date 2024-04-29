import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

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
export const REPOSITORY_REVIEWS = gql`
  query reviews($id: ID!) {
    repository(id: $id) {
      ...ReviewDetails
    }
  }
  ${REVIEW_DETAILS}
`

export const ALL_REPOSITORIES_SORTED = gql`
  query repositories($searchKeyword: String!, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`