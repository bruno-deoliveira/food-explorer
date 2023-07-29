const knex = require("../database/knex");
/*const DiskStorage = require("../providers/DiskStorage");*/

class DishesController {
  async create(request, response) {
    const { name, description, category, price, ingredients } = request.body;
    /*const image = request.file.filename;*/
    const { user_id } = request.params;

    /*const diskStorage = new DiskStorage();*/
    /*const filename = await diskStorage.saveFile(image);*/

    /*const ingredientsArray = JSON.parse(ingredients || "[]");*/

    const [dish_id] = await knex("dishes").insert({
      name,
      description,
      category,
      price,
      /*image: filename,*/
      created_by: user_id,
      updated_by: user_id,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
        created_by: user_id,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.json();
  }
}


module.exports = DishesController;