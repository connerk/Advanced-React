import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await signup().then(resetForm).catch(console.error);
  }
  if (loading) return <p>loading...</p>;
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser ? (
          <p>Signed up with {data.createUser.email}!. Please Sign in Now</p>
        ) : (
          <>
            <label htmlFor="name">
              Name
              <input
                type="name"
                name="name"
                placeholder="Your Name"
                autoComplete="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Sign Up</button>
          </>
        )}
      </fieldset>
    </Form>
  );
}