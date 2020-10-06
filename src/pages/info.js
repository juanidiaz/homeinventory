import styles from "../../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
      <p className={styles.description}>
          <strong>VERCEL_GITHUB_ORG: </strong>{process.env.VERCEL_GITHUB_ORG}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_GITHUB_REPO: </strong>{process.env.VERCEL_GITHUB_REPO}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_GITHUB_COMMIT_ORG: </strong>{process.env.VERCEL_GITHUB_COMMIT_ORG}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_GITHUB_COMMIT_REF: </strong>{process.env.VERCEL_GITHUB_COMMIT_REF}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_GITHUB_COMMIT_AUTHOR_LOGIN: </strong>{process.env.VERCEL_GITHUB_COMMIT_AUTHOR_LOGIN}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_GITHUB_COMMIT_AUTHOR_NAME: </strong>{process.env.VERCEL_GITHUB_COMMIT_AUTHOR_NAME}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_GITHUB_COMMIT_MESSAGE: </strong>{process.env.VERCEL_GITHUB_COMMIT_MESSAGE}
        </p>

        <p className={styles.description}>
          <strong>VERCEL_URL: </strong>{process.env.VERCEL_URL}
        </p>

      </main>
    </div>
  )
}
