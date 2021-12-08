<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
        </b-col>
      </b-row>
    </b-container>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-id" label="아이디:" label-for="userid">
        <b-form-input
          id="userid"
          v-model="form.userid"
          placeholder="아이디를 입력하세요"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-pwd" label="비밀번호:" label-for="userpwd">
        <b-form-input
          id="userpwd"
          v-model="form.userpwd"
          placeholder="비밀번호를 입력하세요"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-name" label="이름:" label-for="username">
        <b-form-input
          id="username"
          v-model="form.username"
          placeholder="이름을 입력하세요"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-email" label="이메일:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="이메일을 입력하세요"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">회원가입</b-button>
      <b-button type="reset" variant="danger">초기화</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "MemberJoin",
  data() {
    return {
      form: {
        userid: "",
        userpwd: "",
        username: "",
        email: "",
      },
      show: true,
    };
  },
  methods: {
    ...mapActions(memberStore, ["joinMem"]),

    onSubmit(event) {
      event.preventDefault();
      this.joinMem(this.form);
      alert("회원가입에 성공하셨습니다.");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.username = "";
      this.form.userid = "";
      this.form.userpwd = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style></style>
