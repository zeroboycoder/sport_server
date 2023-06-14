const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.deposit = async (req, res) => {
  try {
    const {
      sender_id,
      amount,
      sender_account_name,
      sender_account_number,
      transaction_number,
      payment_account_id,
      rreceiver_account_name,
      receiver_account_number,
      imgUrl,
    } = req.body;
    const result = await prisma.deposit.create({
      data: {
        sender: {
          connect: {
            id: parseInt(sender_id),
          },
        },
        amount: parseInt(amount),
        sender_account_name,
        sender_account_number,
        paymentAccount: {
          connect: {
            id: parseInt(payment_account_id),
          },
        },
        transaction_number: parseInt(transaction_number),
        rreceiver_account_name,
        receiver_account_number,
        imgUrl: imgUrl || "",
        confirm: "false",
        remark: "",
        reject_remark: "",
      },
    });
    console.log(result);
    return res.send({
      status: "success",
      data: {
        ...result,
      },
      message: "Deposit created",
    });
  } catch (error) {
    console.log("Error :> ", error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
};

exports.fetchDeposits = async (req, res) => {
  try {
    const result = await prisma.deposit.findMany({
      include: {
        paymentAccount: true,
        sender: true,
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

exports.updateDeposit = async (req, res) => {
  try {
    const { user_id, deposit_id, confirm } = req.body;
    // confirm the deposit
    const deposit = await prisma.deposit.update({
      where: {
        id: parseInt(deposit_id),
      },
      data: {
        confirm,
      },
    });
    // Increase the the amount
    let wallet;
    if (confirm === "true") {
      const originalWallet = await prisma.wallet.findFirst({
        where: {
          userId: parseInt(user_id),
        },
      });
      wallet = await prisma.wallet.update({
        where: {
          userId: parseInt(user_id),
        },
        data: {
          amount: parseInt(originalWallet.amount) + parseInt(deposit.amount),
        },
      });
    }
    return res.send({
      status: "success",
      data: {
        deposit,
        wallet,
      },
      message: "Deposit Confirmed",
    });
  } catch (error) {
    console.log("Error :> ", error);
  } finally {
    async () => await prisma.$disconnect();
  }
};
