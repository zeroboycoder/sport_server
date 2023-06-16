const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);
  const secret_code = Math.random().toString(36).slice(2, 10);
  const users = [
    "Aung Aung",
    "Dummy",
    "John",
    "Phillip",
    "Loppi",
    "Scarlet",
    "Jennifer",
    "Tom",
    "Jerry",
  ];
  const paymentProviders = ["KBZ Pay", "Wave Pay", "CB Pay"];
  // Create agent
  const newAgents = await prisma.user.create({
    data: {
      phone: "09123456789",
      password: hashedPassword,
      user_code: "mgmg51",
      role: {
        create: {
          name: "agent",
        },
      },
      agent: {
        create: {
          name: "Mg Mg",
          address: "Yangon",
          secret_code,
        },
      },
      wallet: {
        create: {
          type: "main",
          amount: 120000,
        },
      },
    },
  });

  // Create 9 members
  const newMembers = users.map(async (name, index) => {
    await prisma.user.create({
      data: {
        user_code: `mgmg51_${index + 1}`, // agentCode + playerId
        role: {
          create: {
            name: "member",
          },
        },
        member: {
          create: {
            name,
            agent_code: "mgmg51",
          },
        },
        wallet: {
          create: {
            type: "main",
            amount: parseInt(100000),
          },
        },
      },
    });
  });

  // Create 3 payment provider
  const newPaymentProviders = paymentProviders.map(async (name, index) => {
    await prisma.paymentProvider.create({
      data: {
        name,
        logo: "",
        type: "Mobile Banking",
        status: true,
        paymentAccount: {},
      },
    });
  });

  const newPaymentAccounts = [1, 2, 3].map(async (_, index) => {
    await prisma.paymentAccount.create({
      data: {
        name: "Clarke",
        account_number: "09123456789",
        qr_code: "",
        status: true,
        payment_provider: {
          connect: {
            id: parseInt(1),
          },
        },
      },
    });
  });

  console.log(newAgents, newMembers, newPaymentProviders, newPaymentAccounts);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
