import Router from "express"

const router = Router()

router.get('/dashboard', (req,res) => {
    const items = [
        {
            name: 'item1',
            type: 'object',
            completed: false, 
            id: 23
        },
        {
            name: 'item2',
            type: 'object',
            completed: false, 
            id: 123
        }, {
            name: 'item3',
            type: 'object',
            completed: false, 
            id: 1242134
        }
    ]

    res.status(200).json({items});
})

export default router