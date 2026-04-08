import Scheme from '../models/Scheme.js';

export async function getAllSchemes({ search = '', category = 'All' } = {}) {
	const query = {};
	if (category && category !== 'All') query.category = category;

	const docs = await Scheme.find(query).lean();

	if (search) {
		const q = String(search).toLowerCase();
		return docs.filter((s) =>
			[s.name, s.category, s.shortDescription, s.eligibilitySummary]
				.join(' ')
				.toLowerCase()
				.includes(q)
		);
	}

	return docs;
}

export async function getSchemeByExternalId(id) {
	if (!id) return null;
	const scheme = await Scheme.findOne({ id }).lean();
	return scheme || null;
}

export default { getAllSchemes, getSchemeByExternalId };
