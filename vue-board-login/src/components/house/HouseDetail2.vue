<template>
  <b-container v-if="search_house" class="bv-example-row">
    <b-row>
      <b-col
        ><h3>{{ search_house.aptName }}</h3></b-col
      >
    </b-row>
    <b-row class="mb-2 mt-1">
      <b-col
        ><b-img :src="require('@/assets/apt.png')" fluid-grow></b-img
      ></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="secondary"
          >일련번호 : {{ search_house.aptCode }}</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >아파트 이름 : {{ search_house.aptName }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="info"
          >법정동 : {{ search_house.dongName }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="danger"
          >거래금액 : {{ search_house.recentPrice }}원</b-alert
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail2",
  computed: {
    ...mapState(houseStore, ["search_house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  //   filters: {
  //     price(value) {
  //       if (!value) return value;
  //       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //     },
  //   },
};
</script>

<style></style>
