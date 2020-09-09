import dbConnect from '../../../../utils/dbConnect';
import Category from '../../../models/Category';
import SubCategory from '../../../models/SubCategory';

dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case 'GET':
      
      try {
        const categories = await Category.find({}).populate('subCategories');
        
        res.status(200).json({ success: true, data: categories });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    case 'POST':
      try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });

      } catch (error) {
        res.status(400).json({ success: false, message: error });

      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed!' });

      break;
  }
}
