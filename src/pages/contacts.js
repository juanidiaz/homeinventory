import { getAuth } from '../../utils/common';

export default function contactsPage({ contact }) {

  return (
    <div>Hello {JSON.stringify(contact)}</div>
  )
};

contactsPage.getInitialProps = async (ctx) => {

  const json = await getAuth('http://localhost:3000/api/contacts', ctx);
  console.log(">>>>>>>", json)

  return { contact: json }
}
