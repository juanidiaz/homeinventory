import Link from 'next/link'
import Button from '@material-ui/core/Button'

export const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>
      {children}
    </a>
  </Link>
)

// export const ButtonLink = ({ href, as, prefetch, ...props }, ref) => (
//   <Link href={href} as={as} prefetch={prefetch} passHref>
//     <Button ref={ref} {...props} />
//   </Link>
// )

ButtonLink.displayName = 'ButtonLink'