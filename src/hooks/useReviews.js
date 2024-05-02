import { useQuery } from '@apollo/client'
import { REPOSITORY_REVIEWS } from '../graphql/queries'

const useReviews = (repositoryId, {first}, after) => {

  const { data, loading, fetchMore, ...result } =  useQuery(
    REPOSITORY_REVIEWS, {
      variables: {"after":after?after: "", first, id: repositoryId },
      fetchPolicy: 'cache-and-network'
    }
  );

  if(loading){
    return [];
  }
  

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
  }
  
  fetchMore({
    variables: {
      after: data.repository.reviews.pageInfo.endCursor?data.repository.reviews.pageInfo.endCursor:"",
      first,
      id: repositoryId
    },
  });


  return { 
    reviews: data?.repository.reviews,
    fetchMore: handleFetchMore,
    loading: loading,
    ...result 
  };

};

export default useReviews;