<script>
    import { InputChip } from '@skeletonlabs/skeleton';
    import {selected} from "$lib/stores.js";
    import { db } from "../../rxdb.js";
    import Loader from './Loader.svelte';
    import { socket } from '$lib/socket';
    import {onMount} from "svelte"

    let msg;
    const handleMessage = (event) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        const data = JSON.parse(reader.result);
        console.log(data);
        var {res} = data
        if(res != undefined){
          console.log(res);
          result = [...result, res];
        }else if(data == "end"){
          msg= "fin";
        }
      });
      reader.readAsText(event.data);
    };

    onMount(() => {
      socket.onmessage = handleMessage;
    });

    $:if(msg == "fin"){
        console.log("hey");
        let id = query_name; // file name
          let db$ = db()
          db$.dataFiles.insert({
            id: id,
            data: result,
            date: new Date().toISOString()
          })
        search_start =false;
        selected.set("Results")
      }
    export var result=[];
    var start=0, records, query_name;
    var search_start = false;
    async function getStream() {
        console.clear();
        var message={request:{locations, professions, start, condition, records}};
        if (message) {
        // Emit a 'message' event to the server
        socket.send(JSON.stringify(message));
      }
      search_start =true;
    }
    var locations, professions, condition, password, auth = false;

    async function handleAuth(){
      const response = await fetch("/api/authentication", {
        method: "POST",
        body: JSON.stringify({pwd: password}),
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        }
      });
      var temp = await response.json();
      console.log(temp);
      auth = temp.auth;

      if(!auth){
        errormsg="Please enter correct Password.";
        password="";
      }
    };
    var errormsg = "";
</script>


{#if auth}
<div class="sm:flex sm:items-start max-w-full">
  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
    </svg>              
  </div>
  <div class="mt-0 text-left sm:mx-4 w-full">
    <h3 class="text-xl mt-1 leading-6 font-medium text-gray-900" id="modal-title">Choose the search indexes</h3>
    <div class="my-4 w-full">
      <div class="w-full">
        <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
        <div class="mt-1">
          <InputChip class="bg-white" bind:value={locations} name="chips" placeholder="Enter locations..." />
        </div>
      </div>
      <div class="mt-3">
        <label for="p2" class="block text-sm font-medium text-gray-700">Profession</label>
        <div class="flex ">
          <p class="text-xs font-semibold mr-4 mt-1">Choose Condition</p>
          <button class="rounded-l-xl text-xs font-semibold border-2 border-r-0 px-2 py-0.5 {condition==="OR"?"bg-gray-400 hover:bg-gray-400":"bg-gray-100 hover:bg-gray-200 "}" on:click={()=>condition="OR"}>OR</button>
          <button class="rounded-r-xl text-xs font-semibold border-2 px-2 py-0.5 {condition==="AND"?"bg-gray-400 hover:bg-gray-400":"bg-gray-100 hover:bg-gray-200"}" on:click={()=>condition="AND"}>AND</button>
        </div>
        <div class="mt-1">
          <InputChip class="bg-white" bind:value={professions} name="chips" placeholder="Enter professions..." />
        </div>
      </div>
      <div class="mt-3">
          <label for="count" class="block text-sm font-medium text-gray-700">Number of records</label>
          <input bind:value={records} type="number" class=" mt-1 block w-full rounded-md border bg-white focus:bg-white p-2 border-[#808cb1] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-green-600 " placeholder="Enter Number of records...">
      </div>
      <div class="mt-3">
          <label for="count" class="block text-sm font-medium text-gray-700">Name the result</label>
          <input bind:value={query_name} type="text" class="mt-1 block w-full rounded-md border bg-white p-2 border-[#808cb1] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-green-600 " placeholder="Give the unique name of the result...">
      </div>
    </div>
  </div>
</div>
<div class="sm:flex sm:ml-14 sm:mr-4 sm:space-x-3 justify-end mt-16">
  {#if search_start}
  <div class="flex items-center space-x-6 flex-1">
    <p class="text-sm font-semibold">Searching peoples...</p>
    <Loader />
  </div>
  {/if}
  <div class="flex space-x-3 mt-3 sm:mt-0">
    <button type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm" on:click={()=>{selected.set("")}}>Cancel</button>
    <button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" on:click={()=>{getStream()}}>Select</button>
  </div>
</div>

{:else}
<div class="w-full h-[70vh] ">
  <div class="mt-3 w-full">
    <label for="count" class="block text-sm font-medium text-gray-700">Enter password</label>
    <input bind:value={password} type="password" class="mt-1 block w-full rounded-md border bg-white p-2 border-[#808cb1] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-green-600 ">
    <button on:click={()=>handleAuth()} class="bg-blue-400 text-md font-semibold mt-2 px-2 py-1 rounded-lg text-gray-800 shadow hover:shadow-md hover:bg-blue-300">Submit</button>
  </div>

  <p class="mt-2 text-red-500">{errormsg}</p>
</div>
{/if}

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>