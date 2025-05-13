const Product = require('../model/product');
const { Op } = require('sequelize');

module.exports.getAllProducts = async (req, res) => {
	try {
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort == 'desc' ? 'DESC' : 'ASC';

		const products = await Product.findAll({
			limit: limit || undefined,
			order: [['id', sort]]
		});

		res.json(products);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

module.exports.getProduct = async (req, res) => {
	try {
		const id = req.params.id;

		const product = await Product.findByPk(id);
		
		if (!product) {
			return res.status(404).json({ message: 'Produit non trouvé' });
		}

		res.json(product);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

module.exports.getProductCategories = async (req, res) => {
	try {
		const categories = await Product.findAll({
			attributes: ['category'],
			group: ['category']
		});

		res.json(categories.map(item => item.category));
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

module.exports.getProductsInCategory = async (req, res) => {
	try {
		const category = req.params.category;
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort == 'desc' ? 'DESC' : 'ASC';

		const products = await Product.findAll({
			where: { category },
			limit: limit || undefined,
			order: [['id', sort]]
		});

		res.json(products);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

module.exports.addProduct = async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({
				status: 'error',
				message: 'Les données sont manquantes',
			});
		}

		const product = await Product.create({
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			image: req.body.image,
			category: req.body.category,
		});

		res.status(201).json(product);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

module.exports.editProduct = async (req, res) => {
	try {
		if (!req.body || !req.params.id) {
			return res.status(400).json({
				status: 'error',
				message: 'Données incorrectes',
			});
		}

		const id = req.params.id;
		const product = await Product.findByPk(id);
		
		if (!product) {
			return res.status(404).json({ message: 'Produit non trouvé' });
		}

		await product.update({
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			image: req.body.image,
			category: req.body.category,
		});

		res.json(product);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};

module.exports.deleteProduct = async (req, res) => {
	try {
		const id = req.params.id;
		
		if (!id) {
			return res.status(400).json({
				status: 'error',
				message: 'ID du produit manquant',
			});
		}

		const product = await Product.findByPk(id);
		
		if (!product) {
			return res.status(404).json({ message: 'Produit non trouvé' });
		}

		await product.destroy();
		res.json(product);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Erreur serveur' });
	}
};
