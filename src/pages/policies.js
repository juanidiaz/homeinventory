import { getAuth } from "../../utils/common";

export default function policiesPage(props) {

  console.log("== policiesPage ==", props)

  return <h1>LOADING... POLICIES</h1>
    
};

policiesPage.getInitialProps = async (ctx) => getAuth(ctx);