const User = require('../model/user');

module.exports.getAllUser = async (req, res) => {
	try {
		const limit = Number(req.query.limit) || 0;
		const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';

		const users = await User.findAll({
			limit: limit || undefined,
			order: [['id', sort]]
		});

		res.json(users);
	} catch (error) {
		console.error('Erreur lors de la récupération des utilisateurs:', error);
		res.status(500).json({
			status: 'error',
			message: 'Erreur lors de la récupération des utilisateurs'
		});
	}
};

module.exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findByPk(id);

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({
				status: 'error',
				message: 'Utilisateur non trouvé'
			});
		}
	} catch (error) {
		console.error('Erreur lors de la récupération de l\'utilisateur:', error);
		res.status(500).json({
			status: 'error',
			message: 'Erreur lors de la récupération de l\'utilisateur'
		});
	}
};

module.exports.addUser = async (req, res) => {
	try {
		if (!req.body) {
			return res.status(400).json({
				status: 'error',
				message: 'Données manquantes'
			});
		}

		const user = await User.create({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			city: req.body.city || '',
			street: req.body.street || '',
			house_number: req.body.house_number || 0,
			zipcode: req.body.zipcode || '',
			lat: req.body.lat || '',
			long: req.body.long || '',
			phone: req.body.phone || ''
		});

		res.status(201).json(user);
	} catch (error) {
		console.error('Erreur lors de la création de l\'utilisateur:', error);
		res.status(500).json({
			status: 'error',
			message: 'Erreur lors de la création de l\'utilisateur'
		});
	}
};

module.exports.editUser = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id || !req.body) {
			return res.status(400).json({
				status: 'error',
				message: 'ID ou données manquantes'
			});
		}

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Utilisateur non trouvé'
			});
		}

		await user.update({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			city: req.body.city,
			street: req.body.street,
			house_number: req.body.house_number,
			zipcode: req.body.zipcode,
			lat: req.body.lat,
			long: req.body.long,
			phone: req.body.phone
		});

		res.json(user);
	} catch (error) {
		console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
		res.status(500).json({
			status: 'error',
			message: 'Erreur lors de la mise à jour de l\'utilisateur'
		});
	}
};

module.exports.deleteUser = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.status(400).json({
				status: 'error',
				message: 'ID manquant'
			});
		}

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({
				status: 'error',
				message: 'Utilisateur non trouvé'
			});
		}

		await user.destroy();
		res.json({
			status: 'success',
			message: 'Utilisateur supprimé avec succès'
		});
	} catch (error) {
		console.error('Erreur lors de la suppression de l\'utilisateur:', error);
		res.status(500).json({
			status: 'error',
			message: 'Erreur lors de la suppression de l\'utilisateur'
		});
	}
};
