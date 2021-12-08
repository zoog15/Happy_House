import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/map/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  api.get(`/map/gugun`, { params: params }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  house.get(``, { params: params }).then(success).catch(fail);
}

function houseListByName(inputName, success, fail) {
  api.get(`/map/search/${inputName}`).then(success).catch(fail);
  // console.log(success);
}

export { sidoList, gugunList, houseList, houseListByName };
