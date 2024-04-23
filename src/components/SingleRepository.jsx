import * as React from 'react';
import { useParams } from 'react-router-native';
import { View, Text } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';


const SingleRepository = () => {

  let { repositoryId } = useParams();
  const { repository } = useRepository(repositoryId);

  if(repository){
    return( 
      <View >
        <RepositoryItem item={repository} />
      </View>
    );
  } else {
    return(
      <View>
        <Text>Loading...</Text>  
      </View>
    )
  }
};

export default SingleRepository;