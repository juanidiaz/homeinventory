import faker from "faker";
import SubCategory from "../src/models/SubCategory";
import Category from "../src/models/Category";
import { dbConnect } from "./dbConnect";
import _ from "lodash";

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
        console.log(`Created - subCategory #${index}`);
      })

    })

  } catch (error) {
    console.log(error)
  }
};

export const seedCategory = async () => {
  try {
    const loop = 5;
    const categories = [];
    const allSubCategories = await SubCategory.find();

    for (let i = 0; i < loop; i++) {

      categories.push(
        new Category({
          name: faker.name.findName(),
          description: faker.lorem.paragraph(),
          subCategories: [_.sample(allSubCategories)],
          isActive: faker.random.boolean(),
        })
      )
    }

    categories.forEach((category, index) => {

      Category.create(category).then(data => {
        console.log(`Created - category #${index}`);
      })

    })

  } catch (error) {
    console.log(error)
  }
};

seedSubCategory();
seedCategory();