import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../utils/dbConnect';
import Room from '../../../models/Room';

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const room = await Room.findById(id);

        if (!room) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: room });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'PUT':
      try {
        const room = await Room.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!room) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: room });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'DELETE':
      try {
        const deletedRoom = await Room.deleteOne({ _id: id });

        if (!deletedRoom) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedRoom });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
