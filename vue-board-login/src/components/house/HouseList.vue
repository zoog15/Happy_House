<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <house-list-row
      v-for="(house, index) in houses"
      :key="index"
      :house="house"
    />
  </b-container>
  <b-container
    v-else-if="search_houses && search_houses.length != 0"
    class="bv-example-row mt-3"
  >
    <house-list-row2
      v-for="(search_house, index) in search_houses"
      :key="index"
      :house="search_house"
    />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListRow from "@/components/house/HouseListRow.vue";
import HouseListRow2 from "@/components/house/HouseListRow2.vue";
import { mapState, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseList",

  components: {
    HouseListRow,
    HouseListRow2,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses", "search_houses"]),
    // houses() {
    //   return this.$store.state.houses;
    // },
  },
  created() {
    this.INIT_HOUSES();
  },
  methods: {
    ...mapMutations(houseStore, ["INIT_HOUSES"]),
  },
};
</script>

<style></style>
