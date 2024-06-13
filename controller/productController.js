const product = require("../schema/productSchema");
const Cloudinary = require("cloudinary").v2;
const Multer = require("multer");

Cloudinary.config({
  cloud_name: "umarraza",
  api_key: "268419938443553",
  api_secret: "mKI-ZiXZ1QhaXfLbHC_x0YCoCa4",
});

const storage = Multer.memoryStorage();
const upload = Multer({ storage: storage });

const Addproduct = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const result = await Cloudinary.uploader.upload(
      `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
    );
    if (!result) {
      return res.status(500).json({ error: "Failed to upload to Cloudinary" });
    }
    const imageUrl = result.secure_url;

    let data = new product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: imageUrl,
    });
    await data.save();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const Getproduct = async (req, res) => {
  let data = await product.find();
  res.send(data);
};

const Getsingleproduct = async (req, res) => {
  let data = await product.findById(req.params);
  res.send(data);
};

const Updateproduct = async (req, res) => {
  console.log(req.file);
  try {
    const file = req.file;
    console.log(req.body);
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const result = await Cloudinary.uploader.upload(
      `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`
    );
    if (!result) {
      return res.status(500).json({ error: "Failed to upload to Cloudinary" });
    }
    const imageUrl = result.secure_url;

    let data = await product.updateOne(
      { _id: req.params },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          image: imageUrl,
        },
      }
    );
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const Deleteproduct = async (req, res) => {
  let data = await product.deleteOne(req.params);
  res.send(data);
};

module.exports = {
  Addproduct,
  Getproduct,
  Updateproduct,
  Deleteproduct,
  Getsingleproduct,
};
