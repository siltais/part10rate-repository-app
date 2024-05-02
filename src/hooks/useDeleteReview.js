import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (e) => {
      console.log(e)
    }
  })
 
  const deleteReview = async (id) => {
    await mutate({variables: { "deleteReviewId": id } });
  };
  

  return [deleteReview, result];
};

export default useDeleteReview;