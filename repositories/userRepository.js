const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createMember = async (data) => {
  const { player_id, player_name, unit_amount, agent_code } = data;
    console.log("unit_amount", unit_amount);
  const usercode = agent_code + "_" + player_id;

  let user = prisma.user.create({
    data: {
      user_code: usercode,
      role: {
        create: {
          name: "member",
        },
      },
      member: {
        create: {
          name: player_name,
          agent_code,
        },
      },
      wallet: {
        create: {
          type: "main",
          amount: parseInt(unit_amount),
        },
      },
    },
  });
  return user;
};

exports.findByUserCode = async (usercode) => {
  let user = await prisma.user.findFirst({
    where: {
      user_code: usercode,
    },
    include: {
      member: true,
      wallet: true,
    },
  });

  return user;
};
