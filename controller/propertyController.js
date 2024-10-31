const property = require("../schema/propertySchema");

const addProperty = async (req, res) => {
    try {
        let data = new property({
            name: req.body.name,
            location: req.body.location,
            area: req.body.area,
        });
        await data.save();
        res.send(data);
    } catch (error) {
        res.status(400).json({error: "Something went wrong"});
    }
};

const getAllProperty = async (req, res) => {
    let data = await property.find({$and: [{name: {$regex: req.query.name, $options: "i"}}]});
    res.send(data);
};

// const Getsingleproduct = async (req, res) => {
//     let data = await product.findById(req.params);
//     res.send(data);
// };

const updateProperty = async (req, res) => {
    try {
        let data = await property.updateOne(
            {_id: req.params},
            {
                $set: {
                    name: req.body.name,
                    location: req.body.location,
                    area: req.body.area,
                },
            }
        );
        res.send(data);
    } catch (error) {
        res.status(400).json({error: "Something went wrong"});
    }
};

const deleteProperty = async (req, res) => {
    let data = await property.deleteOne(req.params);
    res.send(data);
};

module.exports = {
    addProperty,
    getAllProperty,
    updateProperty,
    deleteProperty,
};
