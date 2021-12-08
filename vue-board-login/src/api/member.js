import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function searchPwd(userid, success, fail) {
  await api.get(`/user/search/${userid}`).then(success).catch(fail);
}

async function joinMember(form, success, fail) {
  await api.post("/user/join", JSON.stringify(form)).then(success).catch(fail);
}

async function updateMember(userInfo, success, fail) {
  await api
    .post(`/user/modify`, JSON.stringify(userInfo))
    .then(success)
    .catch(fail);
}

async function deleteMember(userid, success, fail) {
  console.log(userid);
  await api.get(`/user/delete/${userid}`).then(success).catch(fail);
}

// function logout(success, fail)

export { login, findById, searchPwd, joinMember, updateMember, deleteMember };
