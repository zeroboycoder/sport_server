require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { generateToken } = require("../utils/jwt");

// Agent
exports.createAgent = async (req, res) => {
  try {
    const { phone, password, name, email, address } = req.body;
    // Chck the validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.send({
        status: "error",
        data: {
          error: validationError,
        },
        message: "Validation Error",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const agentUserCode =
      name.split(" ").join("").toLowerCase() +
      Math.ceil(Math.random() * 10) +
      Math.ceil(Math.random() * 10);
    const secret_code = Math.random().toString(36).slice(2, 10);
    const newUser = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        user_code: agentUserCode,
        role: {
          create: {
            name: "agent",
          },
        },
        agent: {
          create: {
            name,
            address,
            secret_code,
          },
        },
        wallet: {
          create: {
            type: "main",
            amount: 0,
          },
        },
      },
    });
    const token = generateToken();
    return res.send({
      status: "success",
      data: {
        token,
      },
      message: "Agent created",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      data: {
        error,
      },
      message: "Error",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
};

exports.signinAgent = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.send({
        status: "error",
        data: {
          error: validationError,
        },
        message: "Validation Error",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
      include: {
        role: true,
        agent: true,
        wallet: true,
      },
    });
    if (!user) {
      return res.send({
        status: "error",
        message: "User not found",
      });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.send({
          status: "error",
          message: "Wrong password",
        });
      }
      const token = generateToken();
      return res.send({
        status: "success",
        data: {
          token,
          ...user,
        },
        message: "Login Successful",
      });
    });
  } catch (error) {
    console.log("Error :>", error);
  } finally {
    async () => await prisma.$disconnect();
  }
};

exports.updateAgent = async (req, res) => {
  console.log("Hello");
  try {
    const { userId } = req.params;
    const { name, phone, address } = req.body;
    const user = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        phone,
        agent: {
          update: {
            where: {
              userId: parseInt(userId),
            },
            data: {
              name,
              address,
            },
          },
        },
      },
      include: {
        agent: true,
      },
    });
    return res.send({
      status: "success",
      data: {},
      message: "Agent updated.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      data: {
        error,
      },
      message: "Error",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
};

exports.deleteAgent = async (req, res) => {
  try {
    const { userId } = req.params;
    await prisma.wallet.delete({
      where: {
        userId: parseInt(userId),
      },
    });
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.send({
      status: "success",
      data: {},
      message: "Agent deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      data: {
        error,
      },
      message: "Error",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
};

exports.agentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    // Chck the validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.send({
        status: "error",
        data: {
          error: validationError,
        },
        message: "Validation Error",
      });
    }
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
      include: {
        agent: true,
        wallet: true,
      },
    });

    return res.send({
      status: "success",
      data: {
        ...user,
      },
      message: "Successful",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      data: {
        error,
      },
      message: "Error",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
};

// For member
exports.initUser = async (req, res) => {
  try {
    const { player_id, player_name, unit_amount, agent_code } = req.body;
    // Chck the validation
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.send({
        status: "error",
        data: {
          error: validationError,
        },
        message: "Validation Error",
      });
    }
    // find the user is exit or not
    const usercode = agent_code + "_" + player_id;
    const user = await prisma.user.findFirst({
      where: {
        user_code: usercode,
      },
      include: {
        member: true,
        wallet: true,
      },
    });
    // if user found, retrieve user
    if (user) {
      const token = generateToken();
      return res.send({
        status: "success",
        data: {
          token,
          ...user,
        },
        message: "Found member",
      });
    }
    // if user not found, create user
    const newUser = await prisma.user.create({
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
    const token = generateToken();
    return res.send({
      status: "success",
      data: {
        token,
        ...newUser,
      },
      message: "New member created",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: "error",
      data: {
        error,
      },
      message: "Error",
    });
  } finally {
    async () => await prisma.$disconnect();
  }
};
