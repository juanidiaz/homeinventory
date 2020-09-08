import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Location from '../../../models/Location';

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const location = await Location.findById(id);

        if (!location) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: location });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'PUT':
      try {
        const location = await Location.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!location) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: location });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'DELETE':
      try {
        const deletedLocation = await Location.deleteOne({ _id: id });

        if (!deletedLocation) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedLocation });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });
      break;
  }
}
