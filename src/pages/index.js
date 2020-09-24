import styles from '../../styles/Home.module.css'
import { getUserFromCookie, getAuth, getSessionFromServer } from '../../utils/common';

export default function Home(props) {

  const { user } = props;

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MyInventory!!
        </h1>

        <p className={styles.description}>
          Get started by adding a new item
        </p>

      </main>

      <footer className={styles.footer}>
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </footer>
    </div>
  )
};

Home.getInitialProps = async (ctx) => getUserFromCookie(ctx);
