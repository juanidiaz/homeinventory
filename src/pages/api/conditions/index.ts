import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Condition from '../../../models/Condition';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const conditions = await Condition.find({});
        res.status(200).json({ success: true, data: conditions });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    case 'POST':
      try {
        const condition = await Condition.create(req.body);
        res.status(201).json({ success: true, data: condition });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not supported!' });

      break;
  }
}
