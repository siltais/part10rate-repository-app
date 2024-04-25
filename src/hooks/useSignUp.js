import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (e) => {
      console.log(e)
    }
  })
 
  const createUser = async ({ user }) => {
    const dataSignUp = await mutate({variables: { user } });
    return dataSignUp
  };
  

  return [createUser, result];
};

export default useSignUp;