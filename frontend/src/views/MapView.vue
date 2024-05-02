<template>
  <div class="main-view">
    <div class="mapview">
      <div style="height:600px;">
        <l-map ref="map" :zoom="zoom" :center="center">
          <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
            name="OpenStreetMap"></l-tile-layer>
          <l-geo-json :geojson="map" v-if="batas_kecamatanbulawa" :options-style="getGeoJSONStyle('blue')">
          </l-geo-json>
          <l-geo-json :geojson="bukithijau" v-if="batas_desabukithijau" :options-style="getGeoJSONStyle('green')">
          </l-geo-json>
          <l-geo-json :geojson="kaidundu" v-if="batas_desakaidundu" :options-style="getGeoJSONStyle('red')">
          </l-geo-json>
          <l-geo-json :geojson="patoa" v-if="batas_desapatoa" :options-style="getGeoJSONStyle('purple')">
          </l-geo-json>
          <l-geo-json :geojson="mamungaatimur" v-if="batas_desamamungaatimur"
            :options-style="getGeoJSONStyle('yellow')">
          </l-geo-json>
        </l-map>
      </div>
    </div>
    <div class="sidebar">
      <h3 class="text-dark">Peta Kecamatan Bulawa</h3>
      <ul>
        <li>
          <input type="checkbox" name="desakaidundu" v-model="batas_kecamatanbulawa" /><label for=""
            class="text-dark ms-3">Batas Kecamatan Bulawa</label>
        </li>
        <li>
          <input type="checkbox" name="desabukithijau" v-model="batas_desabukithijau" /><label for=""
            class="text-dark ms-3">Batas Desa Bukit Hijau</label>
        </li>
        <li>
          <input type="checkbox" name="desakaidundu" v-model="batas_desakaidundu" /><label for=""
            class="text-dark ms-3">Batas Desa Kaidundu</label>
        </li>
        <li>
          <input type="checkbox" name="desapatoa" v-model="batas_desapatoa" /><label for="" class="text-dark ms-3">Batas
            Desa Patoa</label>
        </li>
        <li>
          <input type="checkbox" name="desamamungaatimur" v-model="batas_desamamungaatimur" /><label for=""
            class="text-dark ms-3">Batas Desa Mamungaa Timur</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data() {
    return {
      zoom: 12,
      batas_kecamatanbulawa: false,
      batas_desabukithijau: false,
      batas_desakaidundu: false,
      batas_desapatoa: false,
      batas_desamamungaatimur: false,
      center: [0.377886, 123.298100],
      map: [],
      bukithijau: [],
      kaidundu: [],
      patoa: [],
      mamungaatimur: [],
    };
  },
  mounted() {
    this.getMap();
  },
  methods: {
    async getMap() {
      const response = await fetch('/map.geojson');
      this.map = await response.json();

      const responseBukitHijau = await fetch('/bukithijau.geojson');
      this.bukithijau = await responseBukitHijau.json();

      const responseKaidundu = await fetch('/kaidundu.geojson');
      this.kaidundu = await responseKaidundu.json();

      const responsePatoa = await fetch('/patoa.geojson');
      this.patoa = await responsePatoa.json();

      const responseMamungaaTimur = await fetch('/mamungaatimur.geojson');
      this.mamungaatimur = await responseMamungaaTimur.json();

    },
    getGeoJSONStyle(color) {
      return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }
  }
};
</script>

<style>
.main-view {
  display: flex;
}

.sidebar {
  background: #fff;
  width: 25%;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
}

.mapview {
  width: 80%;
}
</style>
