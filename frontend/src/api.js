import axios from 'axios';

const URL = 'http://localhost:3000';

export async function getChores() {
  const response = await axios.get(`${URL}/chores`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getChore(id) {
  const response = await axios.get(`${URL}/chores/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createChores(chore) {
  const response = await axios.post(`${URL}/chores`, chore);
  return response;
}

export async function updateChores(id, chore) {
  const response = await axios.put(`${URL}/chores/${id}`, chore);
  return response;
}

export async function deleteChores(id) {
  const response = await axios.delete(`${URL}/chores/${id}`);
  return response;
}

export async function getUser(id) {
  const response = await axios.get(`${URL}/users/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createUser(user) {
  const response = await axios.post(`${URL}/users`, user);
  return response;
}

export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);
  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}

export async function getChild(id) {
  const response = await axios.get(`${URL}/children/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function createChild(child) {
  const response = await axios.post(`${URL}/children`, child);
  return response;
}

export async function updateChild(id, child) {
  const response = await axios.put(`${URL}/children/${id}`, child);
  return response;
}
