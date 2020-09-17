import dbConnect from '../../../../utils/dbConnect';
import Contract from '../../../models/Contract';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const contracts = await Contract.find({});
        res.status(200).json({ success: true, data: contracts });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    case 'POST':
      try {
        const contract = await Contract.create(req.body);
        res.status(201).json({ success: true, data: contract });

      } catch (error) {
        res.status(400).json({ success: false, message: error.message });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
