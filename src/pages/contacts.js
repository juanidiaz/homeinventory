import { getAuth } from '../../utils/common';

export default function contactsPage(props) {

  console.log("********************", props);

  return (
    // <div>Hello {JSON.stringify(json)}</div>
    <div>Hello</div>
  )
};

contactsPage.getInitialProps = async (ctx) => {
  const { data } = await getAuth('/api/contacts', ctx);

  return { data }
}

// contactsPage.getInitialProps = getAuth('/api/contacts');