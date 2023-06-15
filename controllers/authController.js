require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult,matchedData } = require("express-validator");
const response = require("../utils/response");
const integrationService = require("../services/integrationService");

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
    const token = jwt.sign({ userId: newUser.id }, process.env.TOKEN);
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
      message: error.message,
      data:null
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
      const token = jwt.sign({ userId: user.id }, process.env.TOKEN);
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
    const token = jwt.sign({ userId: user.id }, process.env.TOKEN);
    return res.send({
      status: "success",
      data: {
        token,
      },
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
    // Chck the validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      response.error(res, result.array(), "Validation Error");
    }
    const data = matchedData(req);
    let user = await integrationService.initDaiSport(data);
    response.success(res, user, "New member created");
  } catch (error) {
    console.log(error);
    response.error(res, error, "Error");
  } finally {
    async () => await prisma.$disconnect();
  }
};
