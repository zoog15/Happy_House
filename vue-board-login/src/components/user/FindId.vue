<template>
  <div>
    <b-form-input
      placeholder="아이디를 입력하세요."
      v-model="userid"
    ></b-form-input>
    <br />
    <b-form-input
      placeholder="이메일을 입력하세요."
      v-model="useremail"
    ></b-form-input>
    <br />
    <b-button type="button" variant="primary" class="m-1" @click="searchid"
      >비밀번호 찾기</b-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      userid: null,
      useremail: null,
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo", "userPwd", "userEmail"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo", "searchbyId"]),

    searchid() {
      this.searchbyId(this.userid);
      console.log(this.userid, this.userPwd);
      setTimeout(() => this.alertPwd(), 500);
    },
    alertPwd() {
      if (this.useremail === this.userEmail) {
        alert(this.userid + "님의 비밀번호는 " + this.userPwd + "입니다.");
      } else {
        alert("아이디 혹은 이메일을 다시 확인해주세요.");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
