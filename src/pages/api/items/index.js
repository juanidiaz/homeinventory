import dbConnect from '../../../../utils/dbConnect';
import Item from '../../../models/Item';
import Room from '../../../models/Room';
import Location from '../../../models/Location';
import Category from '../../../models/Category';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        console.log("=========")
        // const items = await Item.find({})
        const items = await Item
          .find({})
          .populate('room')
          .populate('location')
          .populate('category')
          ;

        res.status(200).json({ success: true, data: items });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    case 'POST':
      try {
        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
