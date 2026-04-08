export const healthCheck = async (req, res) => {
	res.json({ status: 'ok' });
};

export default { healthCheck };
