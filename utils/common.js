import Link from "next/link";
import { verify } from "jsonwebtoken";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import absoluteUrl from "next-absolute-url";
import { getContact } from "../src/lib/apiContact";

export const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs}>
    <a className={className}>
      {children}
    </a>
  </Link>
)

ButtonLink.displayName = "ButtonLink"

export const authenticated = fn => async (req, res) => {

  verify(req.cookies.auth, process.env.JWT_SECRET, async function (err, decoded) {
    if (!err && decoded) {
      return await fn(req, res)
    }
    res.status(401).json({ success: false, message: "Sorry, you are not authenticated!" });
  });
}

export async function getAuth(ctx) {
  const { origin } = absoluteUrl(ctx.req);
  const fullUrl = origin + "/api/contacts";
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
        Location: origin + "/login"
      });
      ctx.res.end();
    } else {
      Router.replace("/login");
    }
  }

  let user = {};
  if (cookie) {
    const cookies = convertCookieToObject(cookie)
    user = await getContact(ctx, cookies["_id_"])
    return { user }
  }

  return { user, ctx }
};

export const getSessionFromServer = req => {
  if (req.user) {
    return { user: req.user };
  }
  // No sessions currently open
  return {};
};

export async function getUserFromCookie(ctx) {

  const { origin } = absoluteUrl(ctx.req);
  const fullUrl = origin + "/api/contacts";
  const cookie = ctx.req ? ctx.req.headers.cookie : "";

  const resp = await fetch(fullUrl,
    {
      headers: {
        cookie
      }
    });

  // console.log(" ++++++++ getUserFromCookie", {
  //   reqUser: ctx.req.user,
  //   fullUrl,
  //   cookie,
  //   origin,
  //   status: resp.status
  // });

  if (resp.status === 200) {
    if (cookie) {
      const cookies = convertCookieToObject(cookie)
      const user = await getContact(ctx, cookies["_id_"])
      return { user }
    }
  }

  return { user: null }
};

const convertCookieToObject = cookieString => {
  const cookies = cookieString.split(";");
  let newCookies = {}
  cookies.forEach(currentCookie => {
    newCookies = {
      ...newCookies,
      [currentCookie.split("=")[0].trim()]: currentCookie.split("=")[1].trim()
    }
  });

  return newCookies;
};
