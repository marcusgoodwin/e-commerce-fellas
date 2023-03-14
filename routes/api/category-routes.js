const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Category.findByPk({
      include: [{ model: Product }],
    });
    if (!data) {
      res.status(404).json({ message: "Category not Found!" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await Category.create(req.body, {
      where: {
        category_name: req.body.name,
      },
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Category.update( req.body,
      {
        where: {
          id: req.params.id,
        },
      });
      if (!data[0]) {
        res.status(404).json({ message: 'No category with this id' });
        return;
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: "No Category with that name found." });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
