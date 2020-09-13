import { getAuth, absoluteUrl } from '../../utils/common';

export default function contactsPage(props) {

  const { contact } = props

  return (
    <div>Hello {JSON.stringify(contact)}</div>
  )
};

contactsPage.getInitialProps = async (ctx) => {
  const json = await getAuth('/api/contacts', ctx);

  return { contact: json }
}

// contactsPage.getInitialProps = async ({ req, query }) => {
//   const { origin } = absoluteUrl(req)
//   const allStuff = absoluteUrl(req)
//   console.log("***** currentPath *****", allStuff)
//   // const yelp = `${protocol}//${hostname}/api/yelp.js`
//   // const body = JSON.stringify({
//   //   search: query.pid.replace(/-/g, ' ')
//   // })
//   // const payload = await fetch(yelp, {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body
//   // })
//   // const data = await payload.json()
//   // return data
//   return { contact: "HELLO" }
// }