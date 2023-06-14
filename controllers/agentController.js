const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.initAgent = async (req, res) => {
  try {
    const { agent_id } = req.body;
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
    await prisma.user.findMany({});
    return res.send({
      status: "success",
      data: {},
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
