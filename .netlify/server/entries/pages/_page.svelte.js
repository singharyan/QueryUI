import { c as create_ssr_component, e as escape, b as each, d as get_store_value, f as add_attribute, a as subscribe, o as onDestroy, v as validate_component } from "../../chunks/index3.js";
import { B as BROWSER, w as writable } from "../../chunks/index.js";
import { addRxPlugin } from "rxdb";
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments";
const browser = BROWSER;
const modalStore = writable(false);
modalStore.subscribe((val) => browser);
const indexModalStore = writable(false);
indexModalStore.subscribe((val) => browser);
const sidebarStore = writable(false);
sidebarStore.subscribe((val) => browser);
const selectedSearch = writable("");
selectedSearch.subscribe((val) => browser);
const selected = writable("");
addRxPlugin(RxDBAttachmentsPlugin);
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { handleClickOutside } = $$props;
  if ($$props.handleClickOutside === void 0 && $$bindings.handleClickOutside && handleClickOutside !== void 0)
    $$bindings.handleClickOutside(handleClickOutside);
  return `<div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"><div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"><div class="fixed inset-0 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
 
      <div class="absolute w-[100vw] h-[100vh] inset-0 items-center flex justify-center"><div class="inline-block align-bottom bg-white/50 max-h-[90vh] backdrop-blur-md rounded-xl px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6 max-h overflow-y-auto overflow-x-hidden pr-5">${slots.default ? slots.default({}) : ``}</div></div></div></div>`;
});
function getPersonalAddress(data) {
  var address = "";
  var indexes = [
    "location_locality",
    "location_region",
    "location_country",
    "location_continent"
  ];
  if (data["location_name"] == null) {
    indexes.forEach((index) => {
      if (data[index] != null) {
        address += data[index] + ", ";
      }
    });
    address = address.substring(0, address.length - 2);
  } else {
    address = data["location_name"];
  }
  return address;
}
function capitalizeFirstLetterOfEachWord$1(string) {
  const words = string.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word[0].toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetter + remainingLetters;
  });
  const capitalizedString = capitalizedWords.join(" ");
  return capitalizedString;
}
const ShowDetails = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data, closeModal, sidebar } = $$props;
  sidebar = true;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.closeModal === void 0 && $$bindings.closeModal && closeModal !== void 0)
    $$bindings.closeModal(closeModal);
  if ($$props.sidebar === void 0 && $$bindings.sidebar && sidebar !== void 0)
    $$bindings.sidebar(sidebar);
  return `<button class="absolute right-2 top-2 p-1 bg-white rounded-[25%] opacity-80"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
<div class="h-[70vh] overflow-clip"><div><div class="sm:hidden"><label for="tabs" class="sm:sr-only text-md font-bold text-gray-800">Select a tab</label>
		  
		  <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"><option value="Personal Details">Personal Details</option><option value="Company Details">Company Details</option><option value="Experience">Experience</option><option value="Education">Education</option><option value="Contact Info">Contact Info</option></select></div>
		<div class="hidden sm:block"><div class="border-b border-gray-200"><nav class="-mb-px flex" aria-label="Tabs">
					<button class="${"" + escape(
    "border-indigo-500 text-indigo-600",
    true
  ) + " w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"}">Personal Details </button>
			
					<button class="${escape(
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    true
  ) + " w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"}">Company Details </button>
			
					<button class="${escape(
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    true
  ) + " w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"}" aria-current="page">Experience </button>
			
					<button class="${escape(
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    true
  ) + " w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"}">Education </button>

					<button class="${escape(
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
    true
  ) + " w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"}">Contact Info </button></nav></div></div></div>
	<div class="w-full h-full rounded-xl">${`<div class="mt-5"><p class="text-gray-800 text-3xl font-semibold">${escape(capitalizeFirstLetterOfEachWord$1(data?.full_name))}</p>
			<p class="${"text-gray-700 text-md " + escape(data.summary == null ? "hidden" : "", true)}">${escape(data?.summary)}</p>
			<p class="${"text-md font-semibold my-1 " + escape(
    getPersonalAddress(data) == "" || getPersonalAddress(data) == null ? "hidden" : "",
    true
  )}">Address: <span class="font-normal">${escape(getPersonalAddress(data))}</span></p>
			<p class="${"text-md font-semibold mb-1 " + escape(data.skills.length == 0 ? "hidden" : "", true)}">Skills</p>
			<div class="grid grid-cols-4 gap-2 max-w-full overflow-x-auto">${each(data.skills, (skill) => {
    return `<div class="bg-gray-800 px-2 py-1 rounded-lg"><p class="text-xs text-white font whitespace-nowrap">${escape(skill)}</p>
					</div>`;
  })}</div>
			<p class="${"text-md font-semibold my-1 " + escape(data.interests.length == 0 ? "hidden" : "", true)}">Interests</p>
			<div class="grid grid-cols-4 gap-2 max-w-full overflow-x-auto">${each(data.interests, (interest) => {
    return `<div class="bg-gray-800 px-2 py-1 rounded-lg"><p class="text-xs text-white font whitespace-nowrap">${escape(interest)}</p>
				</div>`;
  })}</div></div>`}</div></div>`;
});
const ToolBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="select-none absolute bg-white/30 backdrop-blur-md rounded-xl shadow-xl z-20 top-4 p-2 right-4 flex space-x-2"><div class="handle rounded-xl flex justify-center items-center -px-4"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
    <div class="w-32 h-10 bg-white rounded-xl flex justify-center opacity-70"><img class="h-10 px-[3px] rounded-xl" src="/logo.jpg" alt=""></div>
    <button class="w-10 h-10 bg-white rounded-xl flex justify-center items-center pt-0.5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"></path></svg></button>
    <button class="w-10 h-10 bg-white rounded-xl flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path></svg></button>
    <button class="w-10 h-10 bg-white rounded-xl flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button></div>`;
});
const ShowDownloads = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { result } = $$props;
  var fileList = [];
  if ($$props.result === void 0 && $$bindings.result && result !== void 0)
    $$bindings.result(result);
  return `<div class="space-y-2 relative w-full h-[80vh]"><p class="text-3xl font-bold mb-6">Past Results</p>
    <button class="absolute -top-2 right-0 bg-white opacity-80 rounded-[25%] p-1 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
    <div class="space-y-2 w-full max-h-[90%] overflow-y-auto pr-2">${fileList.length != 0 ? `${each(fileList, (file) => {
    return `<button class="bg-white relative shadow-md hover:shadow-xl w-full rounded-lg p-4 border border-gray-100 flex flex-col"><p class="font-semibold">${escape(file.id)}</p>
                <p class="text-xs text-gray-600">${escape(new Date(file.date).toLocaleString())}</p>
                <div class="absolute right-2"><button class="px-3 py-2 group rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-gray-600 group-hover:text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path></svg></button>
                    <button class="px-3 py-2 group rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-gray-600 group-hover:text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>                                      
                    </button></div>
            </button>`;
  })}` : `<p class="text-sm font-semibold text-gray-600">No Results found!</p>`}</div></div>`;
});
const stores = {};
function localStorageStore(key, initialValue, options) {
  options?.serializer ?? JSON;
  options?.storage ?? "local";
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe: subscribe2, set } = store;
    stores[key] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
localStorageStore("modeCurrent", false);
const ProgressBar_svelte_svelte_type_style_lang = "";
const Loader_svelte_svelte_type_style_lang = "";
if (typeof WebSocket !== "undefined") {
  new WebSocket("wss://ws-server-tensax.onrender.com/:5000");
} else {
  console.warn("WebSocket is not supported");
}
const showSearch_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "input.svelte-7ncpjn::-webkit-outer-spin-button,input.svelte-7ncpjn::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number].svelte-7ncpjn{-moz-appearance:textfield}",
  map: null
};
const ShowSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { result = [] } = $$props;
  var password;
  var errormsg = "";
  if ($$props.result === void 0 && $$bindings.result && result !== void 0)
    $$bindings.result(result);
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${`<div class="w-full h-[70vh] "><div class="mt-3 w-full"><label for="count" class="block text-sm font-medium text-gray-700">Enter password</label>
    <input type="password" class="mt-1 block w-full rounded-md border bg-white p-2 border-[#808cb1] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-1 focus:ring-green-600  svelte-7ncpjn"${add_attribute("value", password, 0)}>
    <button class="bg-blue-400 text-md font-semibold mt-2 px-2 py-1 rounded-lg text-gray-800 shadow hover:shadow-md hover:bg-blue-300">Submit</button></div>

  <p class="mt-2 text-red-500">${escape(errormsg)}</p></div>`}`;
  } while (!$$settled);
  return $$rendered;
});
const ShowResults = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { result, details } = $$props;
  if ($$props.result === void 0 && $$bindings.result && result !== void 0)
    $$bindings.result(result);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  return `<div class="space-y-2 relative w-full h-[80vh]"><p class="text-3xl font-bold mb-6">Search Results</p>
    <button class="absolute -top-2 right-0 bg-white opacity-80 rounded-[25%] p-1 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button>
    <div class="w-full max-h-[90%] overflow-y-auto space-y-2 pr-2">${result.length != 0 ? `${each(result, (r) => {
    return `<div class="relative"><button class="border p-4 w-full rounded-xl shadow-md bg-white relative"><p class="text-left font-semibold">Name : <span>${escape(r.full_name)} </span></p>  
                    <p class="text-left">Summary : <span>${escape(r.summary)} </span></p></button>
                <button class="z-20 absolute top-4 right-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"></path></svg></button>
            </div>`;
  })}` : `<div><p>No Results found!</p></div>`}</div></div>`;
});
const Sidebar_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".wrapper.svelte-pkk0pc{display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;-webkit-box-orient:vertical}",
  map: null
};
function capitalizeFirstLetterOfEachWord(string) {
  const words = string.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word[0].toUpperCase();
    const remainingLetters = word.slice(1);
    return firstLetter + remainingLetters;
  });
  const capitalizedString = capitalizedWords.join(" ");
  return capitalizedString;
}
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { sidebar, sidebarData, details } = $$props;
  if ($$props.sidebar === void 0 && $$bindings.sidebar && sidebar !== void 0)
    $$bindings.sidebar(sidebar);
  if ($$props.sidebarData === void 0 && $$bindings.sidebarData && sidebarData !== void 0)
    $$bindings.sidebarData(sidebarData);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  $$result.css.add(css$1);
  return `${!sidebar ? `<div class="absolute z-20 w-80 h-[55%] m-4 bottom-0 right-0 bg-white/40 backdrop-blur rounded-xl shadow-xl"><div class="dragger p-4 rounded-t-xl flex flex-1 justify-center items-center float-left "><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
    <div class="w-full h-full p-3 200 rounded-xl select-none"><div class="flex"><div class="flex-1"><p class="block text-2xl font-bold text-gray-800">Results </p>
          <p class="text-xs mb-2 font-semibold text-gray-600 ">${escape(sidebarData.length)} ${escape(sidebarData.length == 1 ? "result" : "results")}</p></div>
        <button><svg enable-background="new 0 0 26 26" class="w-3 h-4 m-2" id="Layer_1" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#231F20" points="0.046,2.582 2.13,0.498 12.967,11.334 23.803,0.498 25.887,2.582 12.967,15.502  "></polygon><polygon fill="#231F20" points="0.046,13.582 2.13,11.498 12.967,22.334 23.803,11.498 25.887,13.582 12.967,26.502  "></polygon></g></svg></button></div>

      <div class="w-full h-[85%] space-y-3 overflow-y-auto pr-1 rounded-xl">${each(sidebarData, (data) => {
    return `<div>
            <button class="w-full h-1/3 rounded-xl bg-white px-3 pt-1 pb-2 shadow-md"><p class="text-left text-sm my-1 font-bold text-gray-800"><span>${escape(capitalizeFirstLetterOfEachWord(data.full_name))}</span></p>
              <p class="text-xs text-left wrapper svelte-pkk0pc">Summary : ${escape(data.summary == null ? "Not Found" : data.summary)}</p></button>
          </div>`;
  })}</div></div></div>` : `<div class="group w-80 h-16 bg-white/40 backdrop-blur z-20 absolute bottom-4 right-4 flex p-2 items-center select-none rounded-xl"><div class="handle rounded-xl flex justify-center items-center "><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></div>
      <p class="block text-2xl ml-2 font-bold text-center">Results 
        <span class="text-sm font-semibold text-gray-600 ">(${escape(sidebarData.length)} ${escape(sidebarData.length == 1 ? "result" : "results")}) </span></p>
      ${sidebarData.length != 0 ? `<button class="flex justify-center items-center absolute right-4 "><svg enable-background="new 0 0 26 26" class="w-3" id="Layer_1" version="1.1" viewBox="0 0 26 26" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><polygon fill="#231F20" points="0.046,24.418 2.13,26.502 12.967,15.666 23.803,26.502 25.887,24.418 12.967,11.498  "></polygon><polygon fill="#231F20" points="0.046,13.418 2.13,15.502 12.967,4.666 23.803,15.502 25.887,13.418 12.967,0.498  "></polygon></g></svg></button>` : ``}</div>`}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import 'leaflet/dist/leaflet.css';",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selected, $$unsubscribe_selected;
  $$unsubscribe_selected = subscribe(selected, (value) => $selected = value);
  var result = [];
  var details = "";
  onDestroy(async () => {
  });
  var mapElement;
  var sidebarData = [];
  var sidebar = true;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="grid h-screen max-h-screen overflow-hidden w-full">${validate_component(ToolBar, "ToolBar").$$render($$result, {}, {}, {})}
  <div class="z-10 rounded-xl shadow-xl m-2 bg-gray-400"${add_attribute("this", mapElement, 0)}></div></div>

${$selected !== "" ? `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        handleClickOutside: () => {
          selected.set("");
        }
      },
      {},
      {
        default: () => {
          return `${$selected == "Downloads" ? `${validate_component(ShowDownloads, "ShowDownloads").$$render(
            $$result,
            { result },
            {
              result: ($$value) => {
                result = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : `${$selected == "Results" && details == "" ? `${validate_component(ShowResults, "ShowResults").$$render(
            $$result,
            { result, details },
            {
              details: ($$value) => {
                details = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : `${$selected == "Search" ? `${validate_component(ShowSearch, "ShowSearch").$$render(
            $$result,
            { result },
            {
              result: ($$value) => {
                result = $$value;
                $$settled = false;
              }
            },
            {}
          )}` : ``}`}`}`;
        }
      }
    )}` : ``}

${details != "" ? `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        handleClickOutside: () => {
          details = "";
          sidebar = false;
        }
      },
      {},
      {
        default: () => {
          return `${validate_component(ShowDetails, "ShowDetails").$$render(
            $$result,
            {
              closeModal: () => {
                details = "";
                sidebar = false;
              },
              sidebar,
              data: details
            },
            {
              sidebar: ($$value) => {
                sidebar = $$value;
                $$settled = false;
              },
              data: ($$value) => {
                details = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : ``}


${validate_component(Sidebar, "Sidebar").$$render(
      $$result,
      { sidebar, sidebarData, details },
      {
        sidebar: ($$value) => {
          sidebar = $$value;
          $$settled = false;
        },
        sidebarData: ($$value) => {
          sidebarData = $$value;
          $$settled = false;
        },
        details: ($$value) => {
          details = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_selected();
  return $$rendered;
});
export {
  Page as default
};
