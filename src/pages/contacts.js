import { getAuth } from "../../utils/common";

export default function contactsPage(props) {

  console.log("== contactsPage ==", props)

  return <h1>LOADING... CONTACTS</h1>
    
};

contactsPage.getInitialProps = async (ctx) => getAuth(ctx);