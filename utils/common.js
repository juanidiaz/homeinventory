import Link from 'next/link'

export const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>
      {children}
    </a>
  </Link>
)

ButtonLink.displayName = 'ButtonLink'