import { useQuery } from '@apollo/client'
import { SINGLE_REPOSITORY } from '../graphql/queries'

const useRepository = (repositoryId) => {
  const result =  useQuery(SINGLE_REPOSITORY, {
    variables: { id: repositoryId },
    fetchPolicy: 'cache-and-network'
    });
    if(result.loading){
      return [];
    }
  const repository = result.data.repository;
  return { repository };
};

export default useRepository;