import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const [session, loading] = useSession();
  let userInfo = { isUserActive: false };
  if (session && session.user) { userInfo = session.user.image }

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>myInventory</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && userInfo.isUserActive && (
            <>
              <li>
                <Link href='/user-main'>Start</Link>
              </li>
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
            </>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
