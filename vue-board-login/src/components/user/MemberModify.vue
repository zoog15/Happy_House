<template>
  <div>
    <b-container class="mt-4" v-if="userInfo">
      <b-row>
        <b-col>
          <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="8">
          <b-jumbotron>
            <template #header>Modify Page</template>

            <template #lead> 회원수정 페이지입니다. </template>

            <hr class="my-4" />

            <b-container class="mt-4">
              <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="2" align-self="end">아이디</b-col
                ><b-col cols="4" align-self="start">{{
                  userInfo.userid
                }}</b-col>
                <b-col cols="2"></b-col>
              </b-row>
              <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="2" align-self="end">비밀번호</b-col
                ><input type="text" name="" v-model="userInfo.userpwd" />
                <b-col cols="2"></b-col>
              </b-row>
              <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="2" align-self="end">이름</b-col
                ><input type="text" name="" v-model="userInfo.username" />
                <b-col cols="2"></b-col>
              </b-row>
              <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="2" align-self="end">이메일</b-col
                ><input type="text" name="" v-model="userInfo.email" />
                <b-col cols="2"></b-col>
              </b-row>
              <b-row>
                <b-col cols="2"></b-col>
                <b-col cols="2" align-self="end">가입일</b-col
                ><b-col cols="4" align-self="start">{{
                  userInfo.joindate
                }}</b-col>
                <b-col cols="2"></b-col>
              </b-row>
              <br />
              <b-button variant="primary" class="mr-1" @click="update"
                >정보수정</b-button
              >
            </b-container>
            <hr class="my-4" />
          </b-jumbotron>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "MemberModify",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["updateMem"]),
    update() {
      console.log(this.userInfo);
      this.updateMem(this.userInfo);
      alert("회원 정보가 수정됐습니다.");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped></style>
