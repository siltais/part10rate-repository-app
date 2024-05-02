import { useQuery } from '@apollo/client'
import { ALL_REPOSITORIES_SORTED } from '../graphql/queries'

const useRepositories = ( sortDetails, {first}, after ) => {

  const searchWord = sortDetails[2];
  const order = sortDetails[0];
  const direction = sortDetails[1];

  const variables = {
    first,
    "searchKeyword": searchWord,
    "orderBy": order,
    "orderDirection": direction,
    "after": after?after:""
  }

  const { data, loading, fetchMore, ...result } = useQuery(
    ALL_REPOSITORIES_SORTED, {
    variables,
    fetchPolicy: 'cache-and-network'
  });


  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor?data.repositories.pageInfo.endCursor:"",
        first,
        "searchKeyword": searchWord,
        "orderBy": order,
        "orderDirection": direction,
      },
    });
  };
 

  return { 
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading: loading,
    ...result 
  };
};

export default useRepositories;