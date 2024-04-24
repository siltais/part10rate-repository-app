import { gql } from '@apollo/client'

export const SIGNIN = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      user{
        username
      }
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repository {
        id
      }
    }
  }
`