import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import { findById } from "../../api/member";
import { searchPwd } from "../../api/member.js";
import { joinMember } from "@/api/member.js";
import { updateMember } from "@/api/member.js";
import { deleteMember } from "@/api/member.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    userPwd: null,
    userEmail: null,
    form: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SEARCH_BY_ID: (state, userInfo) => {
      state.userPwd = userInfo.userpwd;
      state.userEmail = userInfo.email;
      console.log(state.userPwd, state.userEmail);
    },
    JOIN_MEM: (state, form) => {
      console.log(form);
      state.form = form;
    },
    UPDATE_MEM: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    DELETE_MEM: (state) => {
      state.isLogin = false;
      state.userInfo = null;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    searchbyId({ commit }, userid) {
      console.log(userid);
      searchPwd(
        userid,
        (response) => {
          console.log(response);
          commit("SEARCH_BY_ID", response.data.userInfo);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    joinMem({ commit }, form) {
      console.log(form);
      joinMember(
        form,
        (response) => {
          console.log(response);
          commit("JOIN_MEM", form);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updateMem({ commit }, userInfo) {
      console.log(userInfo);
      updateMember(
        userInfo,
        (response) => {
          console.log(response);
          commit("UPDATE_MEM", userInfo);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteMem({ commit }, userid) {
      console.log(userid);
      deleteMember(
        userid,
        (response) => {
          console.log(response);
          commit("DELETE_MEM");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
