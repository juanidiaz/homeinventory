import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

  const doGet = async () => {
    try {
      const client = await connectToDatabase();
      const itemsCollection = client.db().collection('items');
      const items = await itemsCollection.find().toArray();
      client.close();

      res.status(200).json({ success: true, data: items });

    } catch (error) {
      // console.log("ERROR: ", error);
      res.status(500).json({ success: false, error });

    }
  };

  const doPost = async itemData => {

    console.log("Adding new item 0", itemData);


    const newItemData = {

      // NON-VISUAL INFO
      isActive: true,
      user: "enter user name!",

      // BASIC INFO
      name: itemData.name,
      description: itemData.description || "",
      location: itemData.location || "",
      room: itemData.room || "",
      category: itemData.category || "",

      // ADDITIONAL INFO
      // pictures: { type: Array, default: [] },
      // files: { type: Array, default: [] },

      // ADVANCED INFO
      // condition: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "Condition",
      // },
      // notes: { type: String, default: "", trim: true },
      // estimatedValue: { type: Number, trim: true },
      // model: { type: String, trim: true },
      // brand: { type: String, trim: true },
      // serialNumber: { type: String, trim: true },
      // purchaseInfo: {
      //   purchaseDate: { type: Date },
      //   company: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Company",
      //   },
      //   cost: { type: Number, trim: true },
      //   waranty: { type: Boolean, default: true },
      //   contract: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "Contract",
      //   },
      //   invoiceImage: { type: String, trim: true },
      //   purchaseNotes: { type: String, default: "", trim: true }
    }

    console.log("Adding new item", { newItemData, itemData });


    try {
      const client = await connectToDatabase();
      const itemsCollection = client.db().collection('items');
      const newItem = await itemsCollection.insertOne(itemData);
      client.close();
      console.log("Adding new item 2", { newItem, newItemData, itemData });
      // console.log("Adding new item 2", { newItemData, itemData });

      res.status(200).json({ success: true, data: newItem });

    } catch (error) {
      console.log("ERROR: ", error);
      res.status(500).json({ success: false, error });

    }
  };

  switch (req.method) {
    case 'GET':
      doGet();
      break;

    case 'POST':
      doPost(req.body);
      break;

    default:
      res.status(405).json({ message: 'WRONG!' });
      return;
  }


}

export default handler;
