const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTransactionType = async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await prisma.transactionType.create({
      data: {
        name,
        description,
      },
    });
    return res.send({
      status: "success",
      data: {
        ...result,
      },
      message: "Transaction type created successfully",
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

exports.createTransaction = async (req, res) => {
  try {
    const {
      amount,
      sender_id,
      receiver_id,
      transaction_type_id,
      sender_before_amount,
      sender_after_amount,
      receiver_after_amount,
    } = req.body;
    const result = await prisma.transferRecord.create({
      data: {},
    });
    return res.send({
      status: "success",
      data: {
        ...result,
      },
      message: "Payment Provider created",
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
