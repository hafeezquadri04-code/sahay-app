import api from './api';

export async function getChatbotStatus() {
  try {
    const res = await api.get('/chatbot');
    return res.data;
  } catch (err) {
    throw new Error(err?.message || 'Chatbot unavailable');
  }
}

export async function sendChatMessage(message) {
  try {
    const res = await api.post('/chatbot', { message });
    return res.data;
  } catch (err) {
    return { reply: 'Sorry, I encountered an error. Please try again.' };
  }
}