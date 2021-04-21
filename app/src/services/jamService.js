import api from '../api';

async function createJam(leader, settings) {
  const res = await api.post('/jam/', { leader, settings });

  return res.data;
}

async function startJam(id) {
  const res = await api.get(`/jam/start/${id}`);

  return res.data;
}

export default {
  createJam,
  startJam,
};
