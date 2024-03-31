const { prisma } = require('../prisma/prisma-client');

/**
 * 
 * @route GET /api/employees/
 * @desc Получение всех сотрудников
 * @access Private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: "не удалось получить сотрудников"});
    }
}

/**
 * 
 * @route GET /api/employees/:id
 * @desc Получение сотрудника по id
 * @access Private
 */
const employee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        });

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: "не удалось получить сотрудника"});
    }
}

/**
 * 
 * @route POST /api/employees/
 * @desc Добавление сотрудника
 * @access Private
 */
const add = async (req, res) => {
    try {
        const data = req.body;

        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({message: "Заполните все обязательные поля"});
        }

        const employee = await prisma.employee.create({
            data: { 
                ...data,
                userId: req.user.id
            }
        });

        return res.status(200).json(employee);       
    } catch (error) {
        res.status(500).json({message: "не удалось добавить сотрудника"});
    }
}

/**
 * 
 * @route DELETE /api/employees/:id
 * @desc Удаление сотрудника
 * @access Private
 */
const remove = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.employee.delete({
            where: {
                id
            }
        });

        res.status(200).json({message: 'DELETED'});
    } catch (error) {
        res.status(404).json({message: "не удалось удалить сотрудника"});
    }
}

/**
 * 
 * @route PUT /api/employees/:id
 * @desc Редактирование сотрудника
 * @access Private
 */
const edit = async (req, res) => {
    try {
        const data = req.body;
        const { id } = req.params;

        await prisma.employee.update({
            where: {
                id
            },
            data
        });

        res.status(200).json({message: "EDITED"});
    } catch (error) {
        res.status(500).json({message: "не удалось редактировать сотрудника"});
    }
}



module.exports = {
    all,
    employee,
    add,
    remove,
    edit
}