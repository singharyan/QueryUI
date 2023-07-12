<script>
  	import {clickOutside} from '$lib/clickOutside.js';
    export var handleClickOutside;
    import { fade, fly } from 'svelte/transition';

</script>

<div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

      <div class="fixed inset-0 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
 
      <div in:fly={{y:150, duration:77}} class="absolute w-[100vw] h-[100vh] inset-0 items-center flex justify-center">

        <div class="inline-block align-bottom bg-white/50 max-h-[90vh] backdrop-blur-md rounded-xl px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl mx-2 w-full sm:p-6 overflow-y-auto overflow-x-hidden pr-5" transition:fade={{duration:100}} use:clickOutside on:click_outside={()=>handleClickOutside()}>
          <slot/>
        </div>
        
      </div>

    </div>
  </div>
   