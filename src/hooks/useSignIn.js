import { useMutation } from '@apollo/client'
import { SIGNIN } from '../graphql/mutations'

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGNIN, {
    onError: (error) => {
      console.log(error)
    }
  })
 
  const signIn = async ({ username, password }) => {
    const data = await mutate({variables: { username, password } });
    return data
  };
  

  return [signIn, result];
};

export default useSignIn;