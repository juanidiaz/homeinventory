import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Contract from '../../../models/Contract';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const contract = await Contract.findById(id);

        if (!contract) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: contract });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'PUT':
      try {
        const contract = await Contract.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!contract) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: contract });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'DELETE':
      try {
        const deletedContract = await Contract.deleteOne({ _id: id });

        if (!deletedContract) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedContract });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not supported!' });
      break;
  }
}
