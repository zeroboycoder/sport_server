const user_repository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

exports.initDaiSport = async (data) => {
  const { player_id, player_name, unit_amount, agent_code } = data;
  console.log("unit_amount in init", player_id);
  // find the user is exit or not
  const usercode = agent_code + "_" + player_id;
  let user = null;
  user = await user_repository.findByUserCode(usercode);
  if (!user) {
    // if user not found, create user
    user = await user_repository.createMember(data);
  }

  user.token = jwt.sign({ userId: user.id }, process.env.TOKEN);
  return user;
};
