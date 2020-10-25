import { getAuth } from "../../utils/common";

export default function contractsPage(props) {

  console.log("== contractsPage ==", props)

  return <h1>LOADING...</h1>
    
};

contractsPage.getInitialProps = async (ctx) => getAuth(ctx);