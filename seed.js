const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const password = "123456";
  const hashedPassword = await bcrypt.hash(password, 10);
  const secret_code = Math.random().toString(36).slice(2, 10);
  const agent = await prisma.user.createMany({
    data: {
      phone,
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
          amount: 0,
        },
      },
    },
  });

  const newUser = await prisma.user.create({
    data: {
      user_code: "mgmg51_1",
      role: {
        create: {
          name: "member",
        },
      },
      member: {
        create: {
          name: "Aung Aung",
          agent_code: "mgmg51",
        },
      },
      wallet: {
        create: {
          type: "main",
          amount: parseInt(),
        },
      },
    },
  });
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
