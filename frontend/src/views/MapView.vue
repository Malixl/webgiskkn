<template>
  <div style="height:600px;">
    <l-map ref="map" :zoom="zoom" :center="center">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <l-geo-json  
        :geojson="map"
        >
    </l-geo-json>
    </l-map>
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
            center:[0.377886, 123.298100],
            map:[],
        };
    },
    mounted() {
        this.getMap()
    },
    methods: {
        async getMap(){
            const response = await fetch('/map.geojson')
            this.map = await response.json()
        },
    }
}
</script>

<style>

</style>