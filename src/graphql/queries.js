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
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            createdAt
            rating
            text
            repository {
              id
              fullName
            }
          }
        }
      }
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
  query reviews($first: Int!, $after: String!, $id: ID!) {
    repository(id: $id) {
      ...ReviewDetails
    }
  }
  ${REVIEW_DETAILS}
`

export const ALL_REPOSITORIES_SORTED = gql`
  query repositories($after: String!, $first: Int!, $searchKeyword: String!, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(after:$after, first: $first, searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`