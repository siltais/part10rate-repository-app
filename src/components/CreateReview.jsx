import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.textMenu,
    padding: 25
  },
  input: {
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    borderColor: 'gray'
  },
  submit: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary
  },
  validationText: {
    paddingBottom: 10,
    paddingLeft: 12
  }
});

const initialValues = {
  ownerName: '',
  rating: '',
  repositoryName: '',
  text: ''
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'rating must be from 0 to 100')
    .max(100, 'rating must be from 0 to 100')
    .required('Rating is required'),
  text: yup
    .string()
}).default(undefined).required();

export const CreateReviewForm = ({ onSubmit, msg }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.input}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        placeholderTextColor="gray"
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.validationText} color="error">{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        placeholderTextColor="gray"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.validationText} color="error">{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating.toString()}
        onChangeText={formik.handleChange('rating')}
        placeholderTextColor="gray"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.validationText} color="error">{formik.errors.rating}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        placeholderTextColor="gray"
      />
      <Pressable onPress={formik.handleSubmit} style={ () => styles.submit } >
        <Text textAlign="center" fontWeight="bold" color="textMenu">Create a review</Text>
      </Pressable>
      <Text color="error" textAlign="center">{msg}</Text>
    </View>
  );
};

const CreateReview = () => {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    const review = values;
    review.rating = parseInt(review.rating, 10)
    setMsg('')
    try {
      const {data} = await createReview({ review });
      if(data){
        const linkTo = data.createReview.repository.id;
        navigate(`/repository/${linkTo}`);
      } else {
       setMsg('Something went wrong! \n Make sure that Repository and author exists. \n Also check if you haven\'t reviewed this repository already.')
      }
    } catch (e) {
      //console.log(e)
    }
  };

  return (
    <CreateReviewForm onSubmit={onSubmit} msg={msg} />
  );  
};

export default CreateReview;