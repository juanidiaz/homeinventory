import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import Contact from '../../models/Contact';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {

        const contact = await Contact.findOne({ name: req.body.name }).select('name password');

        if (!contact) {
          return res.status(400).json({ success: false, message: "no contact!" });
        }

        compare(req.body.password, contact.password, function (err, result) {

          if (!err && result) {
            const claims = { sub: contact.id, myContactName: contact.name };
            const jwt = sign(claims, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ authToken: jwt });
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
