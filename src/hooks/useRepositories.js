import { useQuery } from '@apollo/client'
import { ALL_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  
  const result = useQuery(ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });
  
  if(result.loading){
    return [];
  }

  const repositories = result.data.repositories
  return { repositories };
};

export default useRepositories;