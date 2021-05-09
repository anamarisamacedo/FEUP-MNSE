import api from '../api';

async function createJam(leader, picture, settings) {
  const res = await api.post('/jam/', { leader, picture, settings });

  return res.data;
}

async function startJam(id) {
  const res = await api.get(`/jam/start/${id}`);

  return res.data;
}

async function updateJamSettings(id, settings) {
  const res = await api.put(`/jam/settings/${id}`, { settings });

  return res.data;
}

async function findJam(id) {
  const res = await api.get(`/jam/find/${id}`);

  return res.data;
}

export default {
  createJam,
  startJam,
  updateJamSettings,
  findJam,
};
