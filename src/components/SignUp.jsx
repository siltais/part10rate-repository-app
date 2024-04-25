import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
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
  username: '',
  password: '',
  confirm: '',
};


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username length must be between 5 and 30')
    .max(30, 'Username length must be between 5 and 30')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be between 5 and 30')
    .max(30, 'Password length must be between 5 and 30')
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .required('Password confirmation is required'),
}).default(undefined).required();

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        placeholderTextColor="gray"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.validationText} color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.validationText} color="error">{formik.errors.password}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password confirmation"
        value={formik.values.confirm}
        onChangeText={formik.handleChange('confirm')}
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      {formik.touched.confirm && formik.errors.confirm && (
        <Text style={styles.validationText} color="error">{formik.errors.confirm}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={ () => styles.submit } >
        <Text textAlign="center" fontWeight="bold" color="textMenu">Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const user = {
      username: values.username,
      password: values.password
    }
    try {
      await signUp({ user });
      const username = user.username;
      const password = user.password;
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate("/"); 
    } catch (e) {
      //console.log(e);
    }
  };

  return (
    <SignUpForm onSubmit={onSubmit} />
  );  
};

export default SignUp;