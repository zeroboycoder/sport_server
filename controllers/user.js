const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        bcrypt.hash(password, 10, async (err, hash) => {
            const result = await prisma.user.create({
                data: { name, email, password: hash },
            });
            return res.send(result);
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
    }
};

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
