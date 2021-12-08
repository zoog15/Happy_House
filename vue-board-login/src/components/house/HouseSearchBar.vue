<template>
  <div>
    <b-row class="mt-4 mb-4 text-center">
      <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
      <b-col class="sm-3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="searchApt"
        ></b-form-select>
      </b-col>
      <b-col class="sm-3">
        <b-form-input
          placeholder="아파트 이름 입력"
          v-model="inputName"
        ></b-form-input>
      </b-col>
      <b-col class="sm-3" align="left" @click="searchByName"
        ><b-button>검색</b-button></b-col
      >
    </b-row>
    <b-row class="mt-4 mb-4 text-center">
      <b-col class="sm-3">
        <b-form-input placeholder="내 주변 위치 검색" disabled></b-form-input>
      </b-col>
      <b-col class="sm-3">
        <b-form-input
          placeholder="내 주소 입력"
          v-model="address"
        ></b-form-input>
      </b-col>
      <b-col class="sm-3">
        <b-form-input
          placeholder="거리 입력(m단위)"
          type="number"
          v-model="distance"
        ></b-form-input>
      </b-col>
      <!-- <b-col class="sm-3" align="left" @click="searchByDist"
        ><b-button>검색</b-button></b-col
      > -->
    </b-row>
    <template>
      <div id="map" class="map"></div>
    </template>
    <br />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

/*
  namespaced: true를 사용했기 때문에 선언해줍니다.
  index.js 에서 modules 객체의 '키' 이름입니다.

  modules: {
    키: 값
    memberStore: memberStore,
    houseStore: houseStore
  }
*/
const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=439834d18e366d5397f074c9e64e8f43&libraries=services";
      document.head.appendChild(script);
    }
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      inputName: "",
      address: null,
      distance: 0,
      markers: [],
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "search_houses", "houses"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getHouseList",
      "getByName",
    ]),
    ...mapMutations(houseStore, ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST"]),
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchApt() {
      this.removeMarker();
      if (this.gugunCode) this.getHouseList(this.gugunCode);
      setTimeout(() => {
        this.setMarker2();
      }, 1000);
    },
    searchByName() {
      this.removeMarker();
      // if (this.inputName) this.getByName(this.inputName);
      this.getByName(this.inputName);
      setTimeout(() => {
        this.setMarker();
      }, 500);
    },
    initMap() {
      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      this.map = new kakao.maps.Map(mapContainer, mapOption);

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },
    // 아파트 이름검색 마커찍기
    setMarker() {
      console.log("마커 생성 완료");
      console.log(this.search_houses);

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imageOption = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          // spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };

      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var imageSrc2 =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize2 = new kakao.maps.Size(24, 35); // 마커이미지의 크기입니다

      var myMarkerImage = new kakao.maps.MarkerImage(imageSrc2, imageSize2);
      var temp_map = this.map;
      var temp_markers = this.markers;
      // var temp_address = this.address;
      var temp_distance = this.distance;
      var x = 0;
      var y = 0;

      // 내 위치만 마커 찍기
      if (this.address && this.distance > 0) {
        var geocoder = new kakao.maps.services.Geocoder();
        console.log(this.address, this.distance);

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(this.address, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(result[0].y, result[0].x);
            x = result[0].x;
            y = result[0].y;

            // 결과값으로 받은 위치를 마커로 표시합니다
            var my_marker = new kakao.maps.Marker({
              map: temp_map,
              position: coords,
              image: myMarkerImage,
            });
            my_marker.setMap(temp_map);
          }
        });
      }

      setTimeout(
        () =>
          this.search_houses.forEach(function (search_house) {
            console.log("내위치좌표", x, y);
            var marker;
            var customOverlay;
            if (x != 0 && y != 0) {
              var dist = Math.sqrt(
                (search_house.lat - y) * (search_house.lat - y) +
                  (search_house.lng - x) * (search_house.lng - x)
              );

              console.log("거리, 내가입력한거리 :", dist, temp_distance);
              if (dist <= temp_distance / 75000) {
                marker = new kakao.maps.Marker({
                  map: temp_map,
                  position: new kakao.maps.LatLng(
                    search_house.lat,
                    search_house.lng
                  ),
                  image: markerImage,
                });
              }
            } else {
              marker = new kakao.maps.Marker({
                map: temp_map,
                position: new kakao.maps.LatLng(
                  search_house.lat,
                  search_house.lng
                ),
                image: markerImage,
              });
            }
            if (marker != null) {
              customOverlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(
                  search_house.lat,
                  search_house.lng
                ),
                xAnchor: 0.5,
                yAnchor: 1.05,
              });

              var content = document.createElement("div");
              content.className = "overlaybox";
              content.style.backgroundColor = "#2D2D2D";
              content.style.borderRadius = "5px/5px";
              content.style.padding = "10px";

              var title = document.createElement("div");
              title.className = "map-popup-title";

              var store = document.createElement("h3");
              store.className = "popup-name";
              store.appendChild(document.createTextNode(search_house.aptName));
              store.style.fontSize = "20px";
              store.style.color = "#FFC52F";
              store.style.fontWeight = "bold";
              title.appendChild(store);
              content.appendChild(title);

              var dong = document.createElement("h3");
              dong.className = "popup-dong";
              dong.appendChild(
                document.createTextNode(
                  "법정동 이름 : " + search_house.dongName
                )
              );
              dong.style.fontSize = "16px";
              dong.style.color = "white";
              content.appendChild(dong);

              var price = document.createElement("h3");
              price.className = "popup-price";
              price.appendChild(
                document.createTextNode(
                  "거래 가격 : " + search_house.recentPrice
                )
              );
              price.style.fontSize = "16px";
              price.style.color = "white";
              content.appendChild(price);

              var buttonContainer = document.createElement("div");
              buttonContainer.className = "popup-buttons";

              var closeBtn = document.createElement("button");
              closeBtn.className = "popup-button";
              closeBtn.appendChild(document.createTextNode("닫기"));
              closeBtn.style.backgroundColor = "#2D2D2D";
              closeBtn.style.color = "#FFC52F";
              closeBtn.style.border = "0";
              closeBtn.style.outline = "0";
              closeBtn.onclick = function () {
                customOverlay.setMap(null);
              };

              buttonContainer.appendChild(closeBtn);
              content.appendChild(buttonContainer);

              kakao.maps.event.addListener(marker, "click", function () {
                customOverlay.setMap(temp_map);
              });

              temp_markers.push(marker);
              customOverlay.setContent(content);
            }
            // marker.setMap(temp_map);
          }),
        1000
      );
    },
    // 시도구군코드 마커찍기
    setMarker2() {
      console.log("마커 생성 완료");
      console.log(this.houses);

      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imageOption = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          // spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };

      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      var temp_map = this.map;
      var temp_markers = this.markers;

      this.houses.forEach(function (house) {
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(
          house.법정동 + house.법정동본번코드,
          function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              console.log(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: temp_map,
                position: coords,
                image: markerImage,
              });

              var customOverlay = new kakao.maps.CustomOverlay({
                position: coords,
                xAnchor: 0.5,
                yAnchor: 1.05,
              });

              var content = document.createElement("div");
              content.className = "overlaybox";
              content.style.backgroundColor = "#2D2D2D";
              content.style.borderRadius = "5px/5px";
              content.style.padding = "10px";

              var title = document.createElement("div");
              title.className = "map-popup-title";

              var store = document.createElement("h3");
              store.className = "popup-name";
              store.appendChild(document.createTextNode(house.아파트));
              store.style.fontSize = "20px";
              store.style.color = "#FFC52F";
              store.style.fontWeight = "bold";
              title.appendChild(store);
              content.appendChild(title);

              var dong = document.createElement("h3");
              dong.className = "popup-dong";
              dong.appendChild(
                document.createTextNode("법정동 이름 : " + house.법정동)
              );
              dong.style.fontSize = "16px";
              dong.style.color = "white";
              content.appendChild(dong);

              var price = document.createElement("h3");
              price.className = "popup-price";
              price.appendChild(
                document.createTextNode("거래 가격 : " + house.거래금액)
              );
              price.style.fontSize = "16px";
              price.style.color = "white";
              content.appendChild(price);

              var buttonContainer = document.createElement("div");
              buttonContainer.className = "popup-buttons";

              var closeBtn = document.createElement("button");
              closeBtn.className = "popup-button";
              closeBtn.appendChild(document.createTextNode("닫기"));
              closeBtn.style.backgroundColor = "#2D2D2D";
              closeBtn.style.color = "#FFC52F";
              closeBtn.style.border = "0";
              closeBtn.style.outline = "0";
              closeBtn.onclick = function () {
                customOverlay.setMap(null);
              };

              buttonContainer.appendChild(closeBtn);

              content.appendChild(buttonContainer);

              kakao.maps.event.addListener(marker, "click", function () {
                customOverlay.setMap(temp_map);
              });

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              temp_map.setCenter(coords);

              marker.setMap(temp_map);
              temp_markers.push(marker);
              customOverlay.setContent(content);
            }
          }
        );
      });
    },
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
