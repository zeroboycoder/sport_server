const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.deposit = async (req, res) => {
  try {
    const {
      agent_id,
      amount,
      sender_account_name,
      sender_account_number,
      receiver_account_name,
      receiver_account_number,
      payment_provider_name,
      transaction_number,
      imgUrl,
    } = req.body;
    await prisma.deposit.create({
      data: {
        agent_id,
        amount,
        sender_account_name,
        sender_account_number,
        receiver_account_name,
        receiver_account_number,
        payment_provider_name,
        transaction_number,
        imgUrl,
      },
    });
    return res.send({
      status: "success",
      data: {},
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

exports.confirmDeposit = async (req, res) => {
  try {
    const {deposit_id} = req.body;
    await prisma.deposit.update({
      where : {
        id : deposit_id
      },
      data : {
        status : true
      }
    })
    return res.send({
      status: "success",
      data: {},
      message: "Deposit Confirmed",
    });
  } catch (error) {
    console.log("Error :> ", error);
  } finally {
    async () => await prisma.$disconnect()
  }
}