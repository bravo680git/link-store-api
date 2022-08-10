import linkModel from '../models/link.model.js'

const getAll = async (req, res) => {
    const userId = req.userId
    try {
        const data = await linkModel.find({ userId })
        const resData = data.map(item => {
            item.userId = undefined
            return item
        })
        res.json(resData)
    } catch (error) {
        res.status(500).json('Fail to get all items:'+error)
    }
}

const search = async (req, res) => {
    const userId = req.userId
    const type = req.query?.type
    const title = req.query?.title

    try {
        if (!(title || type)) {
            const data = await linkModel.find({userId})
            res.json(data)
        }
        else {
            const data = await linkModel.find({
                userId,
                [type && 'type']: type &&  {$regex: new RegExp(type,'i')} ,
                [title && 'title']: title && {$regex: new RegExp(title,'i')} 
            })
            res.json(data)
        }
        
    } catch (error) {
        res.status(500).json('Fail to get item: '+error)
    }
}

const save = async (req, res) => {
    try {
        const userId = req.userId
        const { link, title } = req.body
        if (link.length < 5 || !title) {
            return res.status(400).json('Link and title are requied')
        }
        await linkModel.create({ ...req.body, userId })
        res.json("Save sucessfully")
    } catch (error) {
        res.status(500).json('Fail to save item:'+error)
    }
}

const deleteLink = async (req, res) => {
    const id= req.params.id
    try {
        await linkModel.findByIdAndDelete(id)
        res.json('Delete successfully')
    } catch (error) {
        res.status(500).json('Fail to delete item:'+error)
    }
}

const edit = async (req, res) => {
    const id= req.params.id
    try {
        const userId = req.userId
        const data = req.body
        const { link, title } = data
        data.userId = userId
        if (link.length < 5 || !title) {
            return res.status(400).json('Link and title are requied')
        }
        await linkModel.findByIdAndUpdate(id, data)
        res.json("Edit item successfully")
    } catch (error) {
        res.status(500).json('Fail to edit item:'+error)
    }
}

export default { getAll, save, deleteLink, edit, search }