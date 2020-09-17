import dbConnect from '../../../utils/dbConnect';
import Contact from '../../models/Contact';
import { hash } from 'bcrypt';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const newUserInfo = {
          ...req.body,
          name: req.body.name,
          type: "user",
          connectInfo: req.body.connectInfo
        };

        hash(req.body.password, 10, async function (err, hash) {
          newUserInfo.password = hash;
          const contact = await Contact.create(newUserInfo);
          res.status(201).json({ success: true, data: contact });
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
