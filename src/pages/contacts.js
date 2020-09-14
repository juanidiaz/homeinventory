import { getAuth } from '../../utils/common';

export default function contactsPage(props) {

  const { user } = props
  console.log("********************", props);

  return (
    // <div>Hello {JSON.stringify(json)}</div>
    <div>Hello {JSON.stringify(user._id)}</div>
  )
};

contactsPage.getInitialProps = async (ctx) => {
  const { user } = await getAuth('/api/contacts', ctx);

  return { user }
}

// contactsPage.getInitialProps = getAuth('/api/contacts');