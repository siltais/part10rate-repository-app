import { useQuery } from '@apollo/client'
import { REPOSITORY_REVIEWS } from '../graphql/queries'

const useReviews = (repositoryId) => {
  const result =  useQuery(
    REPOSITORY_REVIEWS, {
      variables: { id: repositoryId },
      fetchPolicy: 'cache-and-network'
    }
  );

  if(result.loading) {
    return [];
  }
  
  const reviews = result.data.repository.reviews;
  return { reviews };
};

export default useReviews;