import dbConnect from '../../../../utils/dbConnect';
import SubCategory from '../../../models/SubCategory';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      
      try {
        const subSubCategories = await SubCategory.find({});
        res.status(200).json({ success: true, data: subSubCategories });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    case 'POST':
      try {
        const subSubCategory = await SubCategory.create(req.body);
        res.status(201).json({ success: true, data: subSubCategory });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
