<script>
  import { draggable } from '@neodrag/svelte';
  import { fade, fly } from 'svelte/transition';

  export var sidebar, sidebarData, details

  function capitalizeFirstLetterOfEachWord(string) {
    // Split the string into words.
    const words = string.split(" ");

    // Capitalize the first letter of each word.
    const capitalizedWords = words.map(word => {
      const firstLetter = word[0].toUpperCase();
      const remainingLetters = word.slice(1);
      return firstLetter + remainingLetters;
    });

    // Join the capitalized words back together into a string.
    const capitalizedString = capitalizedWords.join(" ");

    return capitalizedString;
  }

</script>

{#if !sidebar}
<div use:draggable={{ handle: '.dragger', bounds: 'body' }} in:fly={{ y: 400, duration: 200 }} out:fly={{y: 200, duration: 200}} class=" absolute z-20 w-80 h-[55%] m-4 bottom-0 right-0 bg-white/40 backdrop-blur rounded-xl shadow-xl">
  <div class="dragger p-4 rounded-t-xl flex flex-1 justify-center items-center float-left ">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
  </div>
    <div class="w-full h-full p-3 200 rounded-xl select-none">
      <div class="flex">
        <div class="flex-1">
          <p class="block text-2xl font-bold text-gray-800"> Results </p>
          <p class="text-xs mb-2 font-semibold text-gray-600 "> {sidebarData.length} {sidebarData.length == 1 ? "result" : "results" } </p>
        </div>
        <button on:click={()=>sidebar = true}>
          <svg enable-background="new 0 0 26 26" class="w-3 h-4 m-2" id="Layer_1" version="1.1" viewBox="0 0 26 26"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#231F20" points="0.046,2.582 2.13,0.498 12.967,11.334 23.803,0.498 25.887,2.582 12.967,15.502  "/><polygon fill="#231F20" points="0.046,13.582 2.13,11.498 12.967,22.334 23.803,11.498 25.887,13.582 12.967,26.502  "/></g></svg>
        </button>
      </div>

      <div class="w-full h-[85%] space-y-3 overflow-y-auto pr-1 rounded-xl">
        {#each sidebarData as data}
          <div in:fade={{duration:200}}>
          <!-- for animation -->
            <button in:fly={{y: 150, duration: 200}} out:fade={{duration:150}} class="w-full h-1/3 rounded-xl bg-white px-3 pt-1 pb-2 shadow-md" on:click={()=>{details = data; sidebar = true;}}>
              <p class="text-left text-sm my-1 font-bold text-gray-800"> <span>{capitalizeFirstLetterOfEachWord(data.full_name)}</span></p>
              <p class="text-xs text-left wrapper">Summary : {data.summary == null ? "Not Found" : data.summary}</p>
            </button>
          </div>
            {/each}
      </div>

    </div>
  </div>

  {:else}
    <div use:draggable={{ handle: '.handle', bounds: 'body' }} out:fade={{duration: 100}} class="group w-80 h-16 bg-white/40 backdrop-blur  z-20 absolute bottom-4 right-4 flex p-2 items-center select-none rounded-xl">
      <div class="handle  rounded-xl flex justify-center items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
      </div>
      <p class="block text-2xl ml-2 font-bold text-center"> Results 
        <span class="text-sm font-semibold text-gray-600 "> ({sidebarData.length} {sidebarData.length == 1 ? "result" : "results" }) </span>
      </p>
      {#if sidebarData.length !=0} 
        <button class="flex justify-center items-center absolute right-4 " on:click={()=>sidebar = false}>
          <svg enable-background="new 0 0 26 26" class="w-3" id="Layer_1" version="1.1" viewBox="0 0 26 26"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#231F20" points="0.046,24.418 2.13,26.502 12.967,15.666 23.803,26.502 25.887,24.418 12.967,11.498  "/><polygon fill="#231F20" points="0.046,13.418 2.13,15.502 12.967,4.666 23.803,15.502 25.887,13.418 12.967,0.498  "/></g></svg>        
        </button>
      {/if}
    </div>
{/if}

<style>
  .wrapper{
  display: -webkit-box;
  overflow : hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
}

</style>