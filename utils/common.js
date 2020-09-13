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

  console.log("*******************\n", req.cookie)
  console.log("*******************")

  verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res)
    }
    res.status(401).json({ success: false, message: "Sorry, you are not authenticated!" });
  });
}

export async function getAuth(url, ctx) {
  // console.log("***** CTX2 *****", {url, ctx})
  const { origin } = absoluteUrl(ctx.req)
  const fullUrl = origin + url;
  console.log("***** fullUrl *****", fullUrl)

  const cookie = ctx.req ? ctx.req.headers.cookie : "";

  const resp = await fetch(fullUrl,
    {
      headers: {
        cookie
      }
    });

  if (resp.status === 401) {
    if (ctx.req) {
      ctx.res.writeHead(302, {
        Location: origin + '/login'
      });
      ctx.res.end();
    } else {
      Router.replace('/login');
    }
  }

  const json = await resp.json();

  return json
}

export function absoluteUrl(req, setLocalhost) {
  let protocol = "https:";
  let host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
  };
}