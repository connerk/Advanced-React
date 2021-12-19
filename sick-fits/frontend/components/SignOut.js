import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGNOUT_MUTION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button type="button" onClick={signout}>
      Sign Out
    </button>
  );
}
