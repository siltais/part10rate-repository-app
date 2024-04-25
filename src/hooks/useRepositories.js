import { useQuery } from '@apollo/client'
import { ALL_REPOSITORIES_SORTED } from '../graphql/queries'

const useRepositories = ( sortDetails ) => {

  const order = sortDetails[0];
  const direction = sortDetails[1];

  const result = useQuery(
    ALL_REPOSITORIES_SORTED, {
    variables: {
      "orderBy": order,
      "orderDirection": direction
    },
    fetchPolicy: 'cache-and-network'
  });
  
  if(result.loading){
    return [];
  }

  const repositories = result.data.repositories
  return { repositories };
};

export default useRepositories;