import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const useId = req.body;

    const filteredUser = await User.findOne({ _id: useId });

    if (!filteredUser) {
      return res.status(400).json({ error: "Invalid user" });
    }

    res.status(200).json({
      _id: filteredUser._id,
      fullName: filteredUser.fullName,
      profilePic: filteredUser.profilePic,
    });
  } catch (error) {
    console.error("Error in getUser: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
