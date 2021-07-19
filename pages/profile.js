import { getSession } from 'next-auth/client';

import UserProfile from '../components/profile/user-profile';
import NotAuthorizedComponent from '../components/notAuthorized/sorry';

function ProfilePage(props) {
  const { name, email, image } = props.session.user;

  if (!image.isUserActive) { return <NotAuthorizedComponent /> }
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
