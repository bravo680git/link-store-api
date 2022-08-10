import userModel from "../models/user.model.js";

const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json(
      users.map((user) => ({
        _id: user._id,
        username: user.username,
      }))
    );
  } catch (error) {
    res.status(500).json("Fail to get all users: " + error);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (user.role !== "admin") {
      await userModel.findByIdAndDelete(id);
      res.json("Delete user sucessfully");
    } else {
      res.json("Can't delete admin");
    }
  } catch (error) {
    res.status(500).json("Fail to delete user: " + error);
  }
};

export default { getAllUser, deleteUser };
