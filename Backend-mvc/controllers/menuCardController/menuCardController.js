const User = require("../../Modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleResponse = require("../services/handleResponse");
const Menu = require("../../Modals/menuCardModel");
const fs = require("fs");
const deleteImage = async (imagePath) => {
  try {
    await fs.promises.unlink(imagePath);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error(`Error deleting image: ${error}`);
    return error;

    // Handle error appropriately, such as logging or returning an error response
  }
};
const menuCardController = {
  addMenuCard: async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      // if (!name || !price || !description || !image || !category) {
      //   return handleResponse(res, 400, null, "field missing");
      // }
      console.log(req.file);
      const menucard = await Menu.create({
        userID: req.user._id,
        name,
        price,
        description,
        category,
        image: req.file.path,
      });
      return handleResponse(
        res,
        200,
        "menucard created successfully",
        null
        // menucard
      );
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  deleteMenuCard: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return handleResponse(res, 400, null, "Field 'id' missing");
      }
      const menuCard = await Menu.findOne({ _id: id, userID: req.user._id });

      if (!menuCard) {
        return handleResponse(res, 404, null, "Menu card not found");
      }
      let ImageUrl = menuCard.image;
      console.log(ImageUrl);
      await deleteImage(ImageUrl);
      await Menu.findByIdAndDelete({ _id: id, userID: req.user._id }); // Use menuCardId for deletion

      return handleResponse(res, 200, "Menu card deleted successfully", null);
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
  updateMenuCard: async (req, res) => {
    try {
      const { _id, description, name, price, category } = req.body;

      // Check if _id is provided
      if (!_id) {
        return handleResponse(res, 404, null, "No id provided", null);
      }

      // Retrieve the existing menu card
      const menuCard = await Menu.findOne({ _id: _id, userID: req.user._id });
      if (!menuCard) {
        return handleResponse(res, 404, null, "Menu card not found");
      }

      // Create an object with updated values
      var updatedFields = {
        image: req?.file?.path || menuCard.image, // Retain existing value if not provided
        description: description || menuCard.description,
        name: name || menuCard.name,
        price: price || menuCard.price,
        category: category || menuCard.category,
      };
      if (req?.file?.path) {
        // updatedFields={
        //   image:req?.file?.path
        // }
        await deleteImage(menuCard.image);
      }

      // Update the menu card
      const menu = await Menu.findByIdAndUpdate(
        _id,
        { $set: updatedFields },
        { new: true }
      );

      return handleResponse(res, 200, "Updated successfully", null, menu);
    } catch (error) {
      return handleResponse(res, 500, null, error, null);
    }
  },
  fetchMenuCards: async (req, res) => {
    try {
      const menuCard = await Menu.find({ userID: req.user._id });
      if (!menuCard) {
        return handleResponse(res, 404, null, "Menu card not found");
      }

      return handleResponse(res, 200, "successfully", null, menuCard);
    } catch (error) {
      return handleResponse(res, 500, null, error, null);
    }
  },
  fetchAllMenuCards: async (req, res) => {
    try {
      const { userId } = req.params;
      console.log(userId);
      const menuCard = await Menu.find({ userID: userId });
      if (!menuCard) {
        return handleResponse(res, 404, null, "Menu card not found");
      }

      return handleResponse(res, 200, "successfully", null, menuCard);
    } catch (error) {
      return handleResponse(res, 500, null, error, null);
    }
  },
};
module.exports = menuCardController;
