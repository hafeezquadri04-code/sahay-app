import Scheme from '../models/Scheme.js';

export const getChatbotStatus = async (req, res) => {
  res.json({ message: 'Chatbot ready', status: 'online' });
};

export const handleChatbotQuery = async (req, res) => {
  try {
    const { message } = req.body;
    const query = String(message || '').toLowerCase().trim();

    if (!query) {
      return res.json({
        reply: 'Hello! I am Sahay Bot. Ask me about government schemes, eligibility, or benefits.',
      });
    }

    // Simple keyword-based scheme matching for hackathon demo
    const schemes = await Scheme.find().lean();
    const matched = schemes.filter((s) =>
      [s.name, s.category, s.shortDescription, s.eligibilitySummary]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );

    if (matched.length > 0) {
      const top = matched[0];
      return res.json({
        reply: `I found a relevant scheme: **${top.name}** (${top.category}). ${top.shortDescription} You can explore it on the Schemes page.`,
        schemes: matched.map((s) => ({ id: s.id, name: s.name, category: s.category })),
      });
    }

    // Generic helpful response
    const categories = [...new Set(schemes.map((s) => s.category))];
    return res.json({
      reply: `I couldn't find a direct match for "${message}". Try asking about: ${categories.join(', ')}. Or browse all schemes on the Schemes page!`,
    });
  } catch (err) {
    return res.json({
      reply: 'Sorry, I encountered an error. Please try again later.',
    });
  }
};