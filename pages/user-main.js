import { getSession } from 'next-auth/client';

import UserLanding from '../components/starting-page/user-landing-page';

function UserMainPage(props) {
  const { name, email, image } = props.session;
  let userInfo = { isUserActive: false };
  if (props.session && props.session.user) { userInfo = props.session.user.image }

  return <UserLanding userInfo={userInfo} />;
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

export default UserMainPage;
