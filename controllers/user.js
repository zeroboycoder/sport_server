const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try {
        const { phone, password, name, agent_id, walletType, amount } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user_code =
            name.split(" ").join("").toLowerCase() +
            Math.ceil(Math.random() * 10) +
            Math.ceil(Math.random() * 10);
        // Create User
        // Create Customer
        // Create Wallet
        // Create Token
        const newUser = await prisma.user.create({
            data: {
                phone,
                password: hashedPassword,
                role_id: 1,
                user_code,
            },
        });

        const newCustomer = await prisma.customer.create({
            data : {
                name : name,
                user_id : newUser.id,
                agent_id : agent_id
            }
        })

        const newWallet = await prisma.wallet.create({
            user_id : newUser.id,
            type : walletType,
            amount
        })
        const token = jwt.sign({ agentId: newAgent.id, userId : newCustomer.id }, process.env.TOKEN);
        return res.send({
            status: "success",
            data: {
                token,
            },
            message: "User created",
        });

    } catch (error) {
        console.log("Error :> ", error);
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    }
};

exports.signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                return res.send(user);
            }
            return res.sendStatus(404);
        });
    } catch (error) {
        console.log("Error :> ", error);
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    };
}

exports.fetchUsers = async (req, res) => {
    try {
        const result = await prisma.user.findMany();
        console.log(res);
        return res.send(result);
    } catch (error) {
        console.log(error);
    } finally {
        async () => await prisma.$disconnect();
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email } = req.body;
        const result = await prisma.user.updateMany({
            where: {
                id: parseInt(userId),
            },
            data: {
                name,
                email,
            },
        });
        return res.send(result);
    } catch (error) {
        console.log(error);
    } finally {
        async () => await prisma.$disconnect();
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });
        return res.send("Successfully deleted");
    } catch (error) {
        console.log(error);
    } finally {
        async () => await prisma.$disconnect();
    }
};
