import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

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
  user: '',
  pass: '',
};


const validationSchema = yup.object().shape({
  user: yup
    .string()
    .required('Username is required'),
  pass: yup
    .string()
    .required('Password is required'),
}).default(undefined).required();

const LoginForm = ({ onSubmit }) => {
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
        value={formik.values.user}
        onChangeText={formik.handleChange('user')}
        placeholderTextColor="gray"
      />
      {formik.touched.user && formik.errors.user && (
        <Text style={styles.validationText} color="error">{formik.errors.user}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.pass}
        onChangeText={formik.handleChange('pass')}
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      {formik.touched.pass && formik.errors.pass && (
        <Text style={styles.validationText} color="error">{formik.errors.pass}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={ () => styles.submit } >
        <Text textAlign="center" fontWeight="bold" color="textMenu">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const onSubmit = async (values) => {
    const username = values.user;
    const password = values.pass;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoginForm onSubmit={onSubmit} />
  );  
};

export default SignIn;