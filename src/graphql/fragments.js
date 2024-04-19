import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    description
    forksCount
    fullName
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    reviewCount
    stargazersCount
  }
`;