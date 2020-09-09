import Link from 'next/link';
import { verify } from 'jsonwebtoken';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>
      {children}
    </a>
  </Link>
)

ButtonLink.displayName = 'ButtonLink'

export const authenticated = fn => async (req, res) => {

  verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res)
    }
    res.status(401).json({ success: false, message: "Sorry, you are not authenticated!" });
  });
}

export async function getAuth(url, ctx) {
  const cookie = ctx.req ? ctx.req.headers.cookie : "";
  const resp = await fetch(url,
    {
      headers: {
        cookie
      }
    });

  if (resp.status === 401) {
    if (ctx.req) {
      ctx.res.writeHead(302, {
        Location: 'http://localhost:3000/login'
      });
      ctx.res.end();
    } else {
      Router.replace('/login');
    }
  }

  const json = await resp.json();
  console.log("**************", json)

  return json
}