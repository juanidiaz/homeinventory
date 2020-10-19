import faker from "faker";
import SubCategory from "../src/models/SubCategory";
import dbConnect from "./dbConnect";

dbConnect();

export const seedSubCategory = async () => {
  try {
    const loop = 5;
    const subCategories = [];

    for (let index = 0; index < loop; index++) {
      subCategories.push(
        new SubCategory({
          name: faker.name.findName(),
          description: faker.lorem.paragraph(),
          isActive: faker.random.boolean(),
        })
      )
    }

    SubCategory.collection.drop();

    subCategories.forEach((subCategory, index) => {

      SubCategory.create(subCategory).then(data => {
        console.log("--", data);
      })

    })

  } catch (error) {
    console.log(error)
  }
};

seedSubCategory();