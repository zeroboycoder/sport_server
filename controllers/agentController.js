const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createAgent = async (req, res) => {
  try {
    const { phone, password, name, address, walletType, amount } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user_code =
      name.split(" ").join("").toLowerCase() +
      Math.ceil(Math.random() * 10) +
      Math.ceil(Math.random() * 10);
    const secret_code = Math.random().toString(36).slice(2, 10);
    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        role: {
          create: {
            name: "Hello",
          },
        },
        user_code,
      },
    });
    // Create an agent data
    const newAgent = await prisma.agent.create({
      data: {
        user_id: newUser.id,
        name,
        address,
        secret_code,
      },
    });
    // Create a new wallet
    await prisma.wallet.create({
      data: {
        user_id: newUser.id,
        type: walletType,
        amount: parseInt(amount),
      },
    });
    // generate jwt token
    const token = jwt.sign({ agentId: newAgent.id }, process.env.TOKEN);
    return res.send({
      status: "success",
      data: {
        token,
      },
      message: "Agent created",
    });
  } catch (error) {
    console.log("Error :> ", error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

exports.signin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
      include: {
        role: true,
      },
    });
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const agent = await prisma.agent.findFirst({
          where: {
            user_id: user.id,
          },
        });
        const wallet = await prisma.wallet.findFirst({
          where: {
            user_id: user.id,
          },
        });
        const token = jwt.sign({ userId: user.id }, process.env.TOKEN);
        return res.send({
          status: "success",
          data: {
            token,
            user: {
              ...agent,
              phone,
              ...wallet,
            },
          },
          message: "Successful login",
        });
      }
      return res.sendStatus(404);
    });
  } catch (error) {
    console.log("Error :>", error);
  } finally {
    async () => await prisma.$disconnect();
  }
};

exports.updateAgent = async (req, res) => {
  try {
    const { userId, phone, name, address } = req.body;
    if (phone) {
      await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: {
          phone,
        },
      });
    }
    if (name || address) {
      await prisma.agent.updateMany({
        where: {
          user_id: 2,
        },
        data: {
          name,
          address,
        },
      });
    }

    return res.send({
      status: "success",
      data: {},
      message: "Agent Updated",
    });
  } catch (error) {
    console.log(error);
  } finally {
    async () => await prisma.$disconnect();
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const { userId } = req.body;
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
    await prisma.agent.deleteMany({
      where: {
        user_id: parseInt(userId),
      },
    });
    await prisma.wallet.deleteMany({
      where: {
        user_id: parseInt(userId),
      },
    });
    return res.send("Successfully deleted");
  } catch (error) {
    console.log(error);
  } finally {
    async () => await prisma.$disconnect();
  }
};
