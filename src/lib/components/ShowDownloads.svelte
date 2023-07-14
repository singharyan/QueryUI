<script>
    import { onMount, onDestroy } from 'svelte';
    import { selected } from '$lib/stores.js';
    import { db } from "../../rxdb.js";
    import * as XLSX from "xlsx";

    export var result;
    var db$;
    var fileList=[];
    onMount(async()=>{
        db$ = await db();
        db$.dataFiles.find().$.subscribe((file) =>{fileList = file;});
        console.log(fileList);
    });

    function ExportData(file){
        var filename=file.id+'.xlsx';
        var ws = XLSX.utils.json_to_sheet(file.data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws);
        XLSX.writeFile(wb,filename);
    }

    async function handleClick(file){
        result = file.data;
        selected.set("");
    }

</script>

<div class="space-y-2 relative w-full h-[80vh]">
    <p class="text-3xl font-bold mb-6">Past Results</p>
    <button class="absolute -top-2 right-0 bg-white opacity-80 rounded-[25%] p-1 " on:click={()=>{selected.set("")}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>          
    </button>
    <div class="space-y-2 w-full max-h-[calc(100%-3.5rem)] rounded-xl overflow-y-auto pr-2">

        {#if fileList.length != 0}
            {#each fileList as file}
            <button on:click={()=>handleClick(file)} class="bg-white relative shadow-md hover:shadow-xl w-full rounded-lg p-4 border border-gray-100 flex flex-col">
                <p class="font-semibold"> {file.id} </p>
                <p class="text-xs text-gray-600"> {new Date(file.date).toLocaleString()} </p>
                <div class=" absolute right-2">
                    <button on:click={()=>{ExportData(file)}} class="px-3 py-2 group rounded-lg" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-gray-600 group-hover:text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>                  
                    </button>
                    <button on:click={()=>{file.remove();}} class="px-3 py-2 group rounded-lg" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-gray-600 group-hover:text-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>                                      
                    </button>
                </div>
            </button>
            {/each}
        {:else}
            <p class="text-sm font-semibold text-gray-600">No Results found!</p>
        {/if}
    </div>
</div>