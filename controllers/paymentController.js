const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPaymentProvider = async (req, res) => {
  try {
    const { name, logo, type, status } = req.body;
    const result = await prisma.paymentProvider.create({
      data: {
        name,
        logo: logo || "",
        type,
        status: status || true,
        paymentAccount: {},
      },
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

exports.createPaymentAccount = async (req, res) => {
  try {
    const { name, accountNumber, status, qrCode, paymentProviderId } = req.body;
    console.log({ name, accountNumber, status, qrCode, paymentProviderId });
    const result = await prisma.paymentAccount.create({
      data: {
        name,
        account_number: accountNumber,
        qr_code: qrCode || "",
        status: status || true,
        payment_provider: {
          connect: {
            id: parseInt(paymentProviderId),
          },
        },
      },
    });
    return res.send({
      status: "success",
      data: {
        ...result,
      },
      message: "Payment Account created",
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

exports.fetchPaymentAccounts = async (req, res) => {
  try {
    const result = await prisma.paymentAccount.findMany({
      include: {
        payment_provider: true,
      },
    });
    return res.send({
      status: "success",
      data: {
        ...result,
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
