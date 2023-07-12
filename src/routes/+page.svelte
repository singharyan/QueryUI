<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import {selected} from "$lib/stores.js";
  import { db } from "../rxdb.js";
  import Modal from '$lib/components/Modal.svelte';
  import ShowDetails from '$lib/components/showDetails.svelte';
  import ToolBar from "$lib/components/ToolBar.svelte"
  import ShowDownloads from '$lib/components/ShowDownloads.svelte';
  import ShowSearch from '$lib/components/showSearch.svelte';
  import ShowResults from '$lib/components/showResults.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  var db$;
  var result=[];
  var details="";

  var markerData;
  var sub, fileList=[];

  onMount(async () => {
       await mapInit();
       db$ = await db();
       getFiles();
   });

   const getFiles=()=>{
    sub = db$.dataFiles.find().$.subscribe((file) =>{fileList = file;});
  }

   onDestroy(async () => {
       if(map) {
           console.log('Unloading Leaflet map.');
           map.remove();
       }
   });

  var mapElement;
  let map;
  var leaflet;
  var def = [51.505, -0.09];
  var layerGroup;
  $: if(browser && leaflet) setMarkers(result);

  
  const mapInit=async ()=>{
    if(browser) {
      
      leaflet = await import('leaflet');
      map = leaflet.map(mapElement).setView(def, 3);
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      layerGroup = leaflet.layerGroup().addTo(map);
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          allMarkers.push(layer);
        }
      });
      
      map.on('move', ()=>{filterMarkers(allMarkers)});
    }
  }
  
  var allMarkers=[];
  var sidebarData=[];

  async function filterMarkers(allMarkers) {
    console.log("markers",allMarkers);
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    const visibleMarkers = allMarkers.filter((marker) => {
      const isWithinBounds = bounds.contains(marker.marker.getLatLng());
      const isWithinZoom = zoom <= 13;
      const isVisible = isWithinBounds && isWithinZoom;
      return isVisible;
    });
    console.log("visible", visibleMarkers);

    // Remove all markers from the map
    map.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker) {
        map.removeLayer(layer);
      }
    });
    sidebarData = [];
    // Add visible markers to the map
    visibleMarkers.forEach((marker) => {
      var icon = leaflet.icon({
        iconUrl: './triangle.svg',
        iconSize: [10, 10],
        shadowSize: [0,0]
      });

      var temp = idToData(marker.id);
      sidebarData.push(temp);
      var m = leaflet.marker(marker.marker._latlng, {icon}).bindPopup(marker.name).addTo(map);
      m.on('click', ()=>{
        console.log(marker.name);
        markerData = temp;
        console.log(markerData);
      })
    });

    console.log(sidebarData);
  };

  function idToData(id){
    var q = result.filter((data)=>{
      return data.id == id;
    });
    return q[0];
  };

  const setMarkers =async (result)=>{
    var icon = leaflet.icon({
      iconUrl: './triangle.svg',
      iconSize: [10, 10],
      shadowSize: [0,0]
    });
    allMarkers=[];
    result.forEach(element => {
      if(element.job_company_location_geo != null){
        var coords = element.job_company_location_geo.split(",");
        const marker = leaflet.marker(coords, {icon:icon}).bindPopup(element.full_name).addTo(layerGroup);
        allMarkers.push({marker, name: element.full_name, id: element.id});
      }else if(element.location_geo != null){
        var coords = element.location_geo.split(",");
        const marker = leaflet.marker(coords, {icon:icon}).bindPopup(element.full_name).addTo(layerGroup);
        allMarkers.push({marker, name: element.full_name, id: element.id});
      } 
    });
    filterMarkers(allMarkers);
    console.log("Markers Set.");
  };

  var sidebar = true;
</script>

<div class="grid h-screen max-h-screen overflow-hidden w-full">
  <ToolBar />
  <div class="z-10 rounded-xl shadow-xl m-2 bg-gray-400" bind:this={mapElement}></div>
</div>

{#if $selected !==""}
  <Modal handleClickOutside={()=>{selected.set("")}}>
    {#if $selected == "Downloads"}
      <ShowDownloads bind:result/>
    {:else if $selected == "Results"  && details == ""}
      <ShowResults {result} bind:details />
    {:else if $selected == "Search"}
      <ShowSearch bind:result />
    {/if}
  </Modal>
{/if}

{#if details != ""}
  <Modal handleClickOutside={()=>{details=""; sidebar=false;}}>
    <ShowDetails bind:sidebar bind:data={details} closeModal={()=>{details = ""; sidebar = false;}} />
  </Modal>
{/if}

<!--Sidebar-->
<Sidebar bind:sidebar bind:sidebarData bind:details />

<style>
    @import 'leaflet/dist/leaflet.css';
</style>