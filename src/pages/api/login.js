import dbConnect from "../../../utils/dbConnect";
import Contact from "../../models/Contact";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import cookie from "cookie";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {

        const contact = await Contact.findOne({ name: req.body.name }).select("name password");
        const fullContact = await Contact.findOne({ name: req.body.name });

        if (!contact) {
          return res.status(200).json({ success: false, data: {}, message: "Username does not exist or password is incorrect" });
        }

        compare(req.body.password, contact.password, function (err, result) {
          if (!err && result) {
            const claims = { sub: contact.id, myContactName: contact.name };
            const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: process.env.JWT_maxAge });

            res.setHeader("Set-Cookie", [
              cookie.serialize("auth", jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: process.env.Cookie_maxAge,
                path: "/"
              }),
              cookie.serialize("_id_", contact._id, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: process.env.Cookie_maxAge,
                path: "/"
              })
            ]);

            res.status(200).json({ success: true, data: fullContact });

          } else {

            res.status(200).json({ success: false, data: {}, message: "Username does not exist or password is incorrect." });
          }
        });

      } catch (error) {
        console.log("STATUS: 400", error.message)
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: "Method not allowed!" });

      break;
  }
}
