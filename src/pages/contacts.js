import { getAuth } from '../../utils/common';

export default function contactsPage(props) {

  const { user } = props

  return (
    // <div>Hello {JSON.stringify(json)}</div>
    <div>Hello {JSON.stringify(user._id)}</div>
  )
};

contactsPage.getInitialProps = async (ctx) => getAuth(ctx);