import dbConnect from '../../../../utils/dbConnect';
import SubCategory from '../../../models/SubCategory';

dbConnect();

export default async (req, res) => {

  const {
    query: { id },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const subCategory = await SubCategory.findById(id);

        if (!subCategory) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: subCategory });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'PUT':
      try {
        const subCategory = await SubCategory.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });

        if (!subCategory) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: subCategory });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    case 'DELETE':
      try {
        const deletedSubCategory = await SubCategory.deleteOne({ _id: id });

        if (!deletedSubCategory) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: {} });

      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });
      break;
  }
}
