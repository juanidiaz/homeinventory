import { getAuth } from '../../utils/common';

export default function contactsPage(props) {

  const { contact } = props

  // console.log("*******************", process.env)

  return (
    <div>Hello {JSON.stringify(contact)}</div>
  )
};

contactsPage.getInitialProps = async (ctx) => {

  const json = await getAuth('http://localhost:3000/api/contacts', ctx);

  return { contact: json }
}
