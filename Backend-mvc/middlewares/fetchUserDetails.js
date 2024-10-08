const handleResponse = require("../controllers/services/handleResponse");
const User = require("../Modals/user");
const jwt = require("jsonwebtoken");

const fetchUserDetails = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("token");
    if (!token) {
      return handleResponse(res, 404, null, "No token provided", null);
    }
    const payload = jwt.verify(token, process.env.JWT_SCRT);
    console.log(payload);
    const user = await User.findOne({ _id: payload.id }).select("-password");
    if (!user) {
      return handleResponse(res, 400, null, "No user found");
    }
    if (user._id.toString() !== payload.id) {
      return handleResponse(res, 401, null, "unauthorized user");
    }

    req.user = user;
    next();
    //    return handleResponse(res,200,"successfull",null,user)
  } catch (error) {
    return handleResponse(res, 500, "Server error", error, null);
  }
};
module.exports = fetchUserDetails;

//    await Departments.findByIdAndUpdate(
//     req.params.id,
//     { $set: updatedDepartment },
//     { new: true }
//   );
