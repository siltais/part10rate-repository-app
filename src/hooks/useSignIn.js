import { useMutation } from '@apollo/client'
import { SIGNIN } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';


const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGNIN, {
    onError: (error) => {
      console.log(error)
    }
  })
 
  const signIn = async ({ username, password }) => {
    const data = await mutate({variables: { username, password } });
    await authStorage.setAccessToken(data.data.authenticate.accessToken);
    apolloClient.resetStore();
    return data
  };
  

  return [signIn, result];
};

export default useSignIn;