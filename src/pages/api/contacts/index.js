import dbConnect from '../../../../utils/dbConnect';
import Contact from '../../../models/Contact';
import { authenticated} from '../../../../utils/common'

dbConnect();

export default authenticated(async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const contacts = await Contact.find().select('-password');
        res.status(200).json({ success: true, data: contacts });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    case 'POST':
      try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, data: contact });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
})
