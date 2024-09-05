const project = require("../../db/models/project");
const user = require("../../db/models/user");
const asynchandler = require("../utils/asyncHad");
const ApiError = require("../utils/apierror");
const Apiresponse = require("../utils/apiresponse");

const CreateUserProject = asynchandler(async (req, res, next) => {
  const {
    titile,
    isFeatured,
    productImage,
    shortDescription,
    price,
    description,
    productUrl,
    category,
    tags,
    createdBy,
  } = req.body;
  const userid = req.user.id;

  try {
    const CreateProject = await project.create({
      titile,
      isFeatured,
      productImage,
      shortDescription,
      price,
      description,
      productUrl,
      category,
      tags,
      createdBy: userid,
    });

    if (!CreateProject) {
      throw new ApiError(
        500,
        "something went wrong while inserting user data "
      );
    } else {
      res
        .status(200)
        .json(new Apiresponse(200, CreateProject, "successfully created"));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError();
  }
});

const getAllusers = asynchandler(async (req, res, next) => {
  try {
    const result = await project.findAll({ include: user });
    if (!result) {
      throw new ApiError(404, "something went wrong while geting project data");
    }

    return res
      .status(200)
      .json(new Apiresponse(200, result, "data fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error, "something went wrong !!");
  }
});

const getAllusersByid = asynchandler(async (req, res, next) => {
  try {
    const projectid = req.params.id;
    if (!projectid) {
      throw new ApiError(400, "provide valide user id ");
    }
    const result = await project.findByPk(projectid, { include: user });
    if (!result) {
      throw new ApiError(404, "user not found");
    }
    return res
      .status(200)
      .json(new Apiresponse(200, result, "fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "somthing went wrong try after few 5mints");
  }
});

const updateProject = asynchandler(async (req, res) => {
  try {
    const userid = req.user.id;
    console.log(req.user);

    const projectid = req.params.id;
    const {
      titile,
      isFeatured,
      productImage,
      shortDescription,
      price,
      description,
      productUrl,
      category,
      tags,
    } = req.body;

    const result = await project.findOne({
      where: { id: projectid, createdBy: userid },
    });
    if (!result) {
      console.log(result);
      throw new ApiError(404, "user not found");
    }

    result.titile = titile;
    result.productImage = productImage;
    result.shortDescription = shortDescription;
    result.price = price;
    result.description = description;
    result.productUrl = productUrl;
    result.category = category;
    result.tags = tags;
    const updatedData = await result.save();
    return res
      .status(200)
      .json(new Apiresponse(200, "updated successfully", updatedData));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "something went wrong while creating ");
  }
});
const DeleteProject = asynchandler(async (req, res) => {
  try {
    const userid = req.user.id;
    const projectid = req.params.id;
    if (!userid && !projectid) {
      throw new ApiError(404, "all fields are rquried");
    }
    const result = await project.findOne({
      where: { id: projectid, createdBy: userid },
    });
    if (!result) {
      throw new ApiError(404, "user not found ");
    }
    const DeletedData = await result.destroy();
    return res
      .status(200)
      .json(new Apiresponse(200, DeletedData, "successfully deleted data"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "something went wrong while creating");
  }
});
module.exports = {
  CreateUserProject,
  getAllusers,
  getAllusersByid,
  updateProject,
  DeleteProject,
};
