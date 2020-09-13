import dbConnect from '../../../utils/dbConnect';
import Contact from '../../models/Contact';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

dbConnect();

export default async (req, res) => {

  const { method } = req;
  const { origin } = req;
  console.log("ORIGIN @ /api/login.js", req)

  switch (method) {
    case 'POST':
      try {

        const contact = await Contact.findOne({ name: req.body.name }).select('name password');

        if (!contact) {
          return res.status(400).json({ success: false, message: "no contact!" });
        }

        compare(req.body.password, contact.password, function (err, result) {

          if (!err && result) {
            const claims = { sub: contact.id, myContactName: contact.name };
            const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              sameSite: 'strict',
              maxAge: 3600,
              path: '/'
            }));
            res.status(200).json({ success: true, data: "Welcome back!" });

          } else {

            res.status(200).json({ success: false, data: "SOMETHIGN WENT WRONG" });
          }
        });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
