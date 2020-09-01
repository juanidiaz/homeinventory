import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Item from '../../../models/Item';

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const item = await Item.findById(id);

        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'PUT':
      try {
        const item = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!item) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: item });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'DELETE':
      try {
        const deletedItem = await Item.deleteOne({ _id: id });

        if (!deletedItem) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedItem });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false, message: 'Method not supported!' });
      break;
  }
}