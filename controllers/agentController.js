const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

// Init agent
exports.initAgent = async (req, res) => {
  try {
    const { user_id, agent_code } = req.body;
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
    // Get Total balance
    const wallet = await prisma.wallet.findFirst({
      where: {
        userId: parseInt(user_id),
      },
    });
    const totalBalance = wallet.amount;
    // Get total User
    const user = await prisma.member.findMany({
      where: {
        agent_code,
      },
    });
    const totalUser = user.length;
    return res.send({
      status: "success",
      data: {
        totalBalance,
        totalUser,
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

// Get users by agent code
exports.getUsers = async (req, res) => {
  try {
    const { agent_code } = req.body;
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
    const result = await prisma.member.findMany({
      where: {
        agent_code,
      },
      include: {
        user: true,
      },
    });
    return res.send({
      status: "success",
      data: result,
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

// Search member by agentCode
exports.getUserByAgentCode = async (req, res) => {
  try {
    const { agent_code, name } = req.body;
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
    const result = await prisma.member.findFirst({
      where: {
        agent_code,
        name,
      },
      include: {
        user: true,
      },
    });
    return res.send({
      status: "success",
      data: { ...result },
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
