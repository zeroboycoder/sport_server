const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createAgent = async (req, res) => {
    try {
        const { phone, password, name, address } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user_code =
            name.split(" ").join("").toLowerCase() +
            Math.ceil(Math.random() * 10) +
            Math.ceil(Math.random() * 10);
        const secret_code = Math.random().toString(36).slice(2, 10);
        // Create User
        // Create Agent
        // Create Token
        const newUser = await prisma.user.create({
            data: {
                phone,
                password: hashedPassword,
                role_id: 1,
                user_code,
            },
        });
        const newAgent = await prisma.agent.create({
            data: {
                user_id: newUser.id,
                name,
                address,
                secret_code,
            },
        });
        const token = jwt.sign({ agentId: newAgent.id }, process.env.TOKEN);
        return res.send({
            status: "success",
            data: {
                token,
            },
            message: "Agent created",
        });
    } catch (error) {
        console.log("Error :> ", error);
    } finally {
        async () => {
            await prisma.$disconnect();
        };
    }
};

exports.fetchAgent = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                phone,
            },
        });
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ userId: user.id }, process.env.TOKEN);
                return res.send({
                    status: "success",
                    data: {
                        token,
                    },
                    message: "Successful login",
                });
            }
            return res.sendStatus(404);
        });
    } catch (error) {
        console.log("Error :>", error);
    } finally {
        async () => await prisma.$disconnect();
    }
};
