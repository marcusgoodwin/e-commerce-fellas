const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product
    });
    res.send(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: Product
    });
    if (!tag) {
      return res.status(404).send('Tag not found');
    }
    res.send(tag);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.send(tag);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).send('Tag not found');
    }
    tag.name = req.body.name;
    await tag.save();
    res.send(tag);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).send('Tag not found');
    }
    await tag.destroy();
    res.send('Tag deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


module.exports = routes;