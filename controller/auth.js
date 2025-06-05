const User = require('../model/user');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		
		if (!username || !password) {
			return res.status(400).json({
				status: 'error',
				message: 'Username et password requis'
			});
		}

		const user = await User.findOne({
			where: {
				username: username,
				password: password
			}
		});

		if (user) {
			const token = jwt.sign({ user: username }, 'secret_key', { expiresIn: '24h' });
			res.json({
				token: token,
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
					firstname: user.firstname,
					lastname: user.lastname
				}
			});
		} else {
			res.status(401).json({
				status: 'error',
				message: 'Username ou password incorrect'
			});
		}
	} catch (error) {
		console.error('Erreur lors de la connexion:', error);
		res.status(500).json({
			status: 'error',
			message: 'Erreur lors de la connexion'
		});
	}
};
