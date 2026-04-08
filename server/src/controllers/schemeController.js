import * as schemeService from '../services/schemeService.js';

export const getSchemes = async (req, res, next) => {
  try {
    const { search = '', category = 'All' } = req.query || {};
    const schemes = await schemeService.getAllSchemes({ search, category });
    // Return wrapped object to be explicit, frontend accepts array or wrapper.
    return res.json({ schemes });
  } catch (err) {
    return next(err);
  }
};

export const getSchemeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const scheme = await schemeService.getSchemeByExternalId(id);
    if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
    return res.json(scheme);
  } catch (err) {
    return next(err);
  }
};

export default { getSchemes, getSchemeById };