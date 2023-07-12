<script>
	import { fade, fly } from 'svelte/transition';
	export var data, closeModal, sidebar;

	sidebar = true;

	function getCompAddress(data){
		var address="";
		var indexes=[
			'job_company_location_locality',
			'job_company_location_region',
			'job_company_location_country',
			'job_company_location_continent'
		];

		if(data['job_company_location_name'] == null){
			indexes.forEach(index => {
				if(data[index] != null){
					address += data[index] + ", ";
				}
			});
			address = address.substring(0,address.length-2);
		}else{
			address = data['job_company_location_name']
		}
		return address;
	}

	function getPersonalAddress(data){
		var address="";
		var indexes=[
			'location_locality',
			'location_region',
			'location_country',
			'location_continent'
		];

		if(data['location_name'] == null){
			indexes.forEach(index => {
				if(data[index] != null){
					address += data[index] + ", ";
				}
			});
			address = address.substring(0,address.length-2);
		}else{
			address = data['location_name']
		}
		return address;
	}

	function getLocation(loc){
		if(loc == null) return
		var indexes= ["locality", "region", "country", "continent"];
		var location = "";

		if(loc["name"] == null){
			indexes.forEach(index => {
				if(loc[index] != null){
					location += loc[index] + ", ";
				}
			});
			location = location.substring(0,location.length-2);
		}else{
			location = loc["name"];
		}
		return location;
	}

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

	function checkAndFixLink(link) {
		if (!/^https?:\/\//i.test(link)) {
			link = "https://" + link;
		}
		return link;
	}

var screenState = "Personal Details";
</script>

<button class="absolute right-2 top-2 p-1 bg-white rounded-[25%] opacity-80" on:click={closeModal()}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>      
</button>
<div class="h-[70vh] overflow-clip">
	<div>
		<div class="sm:hidden">
		  <label for="tabs" class="sm:sr-only text-md font-bold text-gray-800">Select a tab</label>
		  <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
		  <select bind:value={screenState} id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
			<option value="Personal Details">Personal Details</option>
	  
			<option value="Company Details">Company Details</option>
	  
			<option value="Experience">Experience</option>
	  
			<option value="Education">Education</option>

			<option value="Contact Info">Contact Info</option>
		  </select>
		</div>
		<div class="hidden sm:block">
			<div class="border-b border-gray-200">
				<nav class="-mb-px flex" aria-label="Tabs">
					<!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
					<button on:click={()=>screenState = "Personal Details"} class=" {screenState == "Personal Details" ?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"> Personal Details </button>
			
					<button on:click={()=>screenState = "Company Details"} class="{screenState == "Company Details" ?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"> Company Details </button>
			
					<button on:click={()=>screenState = "Experience"} class="{screenState == "Experience" ?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md" aria-current="page"> Experience </button>
			
					<button on:click={()=>screenState = "Education"} class="{screenState == "Education" ?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"> Education </button>

					<button on:click={()=>screenState = "Contact Info"} class="{screenState == "Contact Info" ?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} w-1/5 py-4 px-1 text-center border-b-2 font-medium text-md"> Contact Info </button>
				</nav>
			</div>
		</div>
	</div>
	<div class="w-full h-full rounded-xl">
	{#if screenState == "Personal Details"}
		<div class="mt-5" in:fade={{duration: 400}}>		  
			<p class="text-gray-800 text-3xl font-semibold">{capitalizeFirstLetterOfEachWord(data?.full_name)}</p>
			<p class="text-gray-700 text-md {data.summary == null ?"hidden":""}"> {data?.summary}</p>
			<p class= "text-md font-semibold my-1 {(getPersonalAddress(data) == "" || getPersonalAddress(data) == null) ? "hidden":""}">Address: <span class="font-normal">{getPersonalAddress(data)}</span></p>
			<p class="text-md font-semibold mb-1 {data.skills.length == 0 ?"hidden":""}">Skills</p>
			<div class="grid grid-cols-4 gap-2 max-w-full overflow-x-auto">
				{#each data.skills as skill }
					<div class="bg-gray-800 px-2 py-1 rounded-lg">
						<p class="text-xs text-white font whitespace-nowrap">{skill}</p>
					</div>
				{/each}
			</div>
			<p class="text-md font-semibold my-1 {data.interests.length == 0 ?"hidden":""}">Interests</p>
			<div class="grid grid-cols-4 gap-2 max-w-full overflow-x-auto">
				{#each data.interests as interest }
				<div class="bg-gray-800 px-2 py-1 rounded-lg">
					<p class="text-xs text-white font whitespace-nowrap">{interest}</p>
				</div>
				{/each}
			</div>
		</div>
	{:else if screenState == "Company Details"}
		<div class="mt-5" in:fade={{duration: 400}}>
			<!-- <p class="text-xl font-semibold">Job Details</p> -->
			<p class="font-semibold text-md  {data.job_title == null ?"hidden":""}">Job Title: <span class="font-normal"> {data.job_title}</span></p>
			<p class="font-semibold text-md  {data.job_summary == null ?"hidden":""}"> Job Summary: <span class="font-normal"> {data.job_summary} </span></p>
			<p class="font-semibold text-md  {data.job_company_name == null ?"hidden":""}">Company: <span class="font-normal"> {data.job_company_name} </span></p>
			<p class="font-semibold text-md  {data.job_company_size == null ?"hidden":""}"> Company Size: <span class="font-normal"> {data.job_company_size} </span> </p>
			<p class="font-semibold text-md  {data.job_company_website == null ?"hidden":""}"> Company Website: <span class="font-normal"> {data.job_company_website} </span></p>
			<p class="font-semibold text-md  {data.job_company_industry == null ?"hidden":""}"> Company Industry: <span class="font-normal"> {data.job_company_industry} </span></p>
			<p class="font-semibold text-md  {(getCompAddress(data) == "" || getCompAddress(data) == null) ? "hidden":""}">Address: <span class="font-normal"> {getCompAddress(data)}</span></p>
			<div class="font-semibold text-md group inline {data.job_company_linkedin_url == null ?"hidden":""}"> Company Linkedin: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.job_company_linkedin_url)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.job_company_linkedin_url}</a> </span>
				<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.job_company_linkedin_url));}}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
					</svg>					  
				</button>
			</div><br/>
			<div class="font-semibold text-md group inline-block {data.job_company_twitter_url == null ?"hidden":""}"> Company Twitter: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.job_company_twitter_url)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.job_company_twitter_url}</a> </span>
				<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.job_company_twitter_url));}}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
					</svg>					  
				</button>
			</div>
			{#if data.job_title == null &&
				data.job_summary == null &&
				data.job_company_name == null &&
				data.job_company_size == null &&
				data.job_company_website == null &&
				data.job_company_industry == null &&
				(getCompAddress(data) == "" || getCompAddress(data) == null) &&
				data.job_company_linkedin_url == null &&
				data.job_company_twitter_url == null
				}
				<p>No Records Found!</p>
			{/if}
		</div>
	{:else if screenState == "Experience"}
		<div class="mt-3 p-2 space-y-3 max-h-[85%] rounded-xl overflow-y-auto" in:fade={{duration: 400}}>
			{#each data.experience as ed}
				<div class="bg-white px-4 py-3 rounded-xl shadow-lg">	
					<p class="font-semibold text-md {ed.title.name == null ?"hidden":""}">Job Title: <span class="font-normal"> {ed.title.name}</span></p>
					<p class="font-semibold text-md {ed.summary == null ?"hidden":""}"> Job Summary: <span class="font-normal"> {ed.summary} </span></p>		
					<p class="font-semibold text-md {ed.company.name == null ?"hidden":""}">Company Name: <span class="font-normal"> {ed.company.name}</span></p>
					<p class="font-semibold text-md {ed.company.size == null ?"hidden":""}"> Company Size: <span class="font-normal"> {ed.company.size} </span></p>
					<p class="font-semibold text-md {ed.company.industry == null ?"hidden":""}">Company Industry: <span class="font-normal"> {ed.company.industry} </span></p>
					<p class="font-semibold text-md {(ed.company.location == null) ? "hidden":""}"> Company Address: <span class="font-normal"> {getLocation(ed.company.location)}</span></p>
					<p class="font-semibold text-md {ed.start_date == null && ed.end_date == null ?"hidden":""}"> Employment period: <span class="font-normal {ed.start_date == null ?"hidden":""}"> {ed.start_date} </span> - <span class="font-normal"> {ed.end_date == null ? "Present": ed.end_date} </span></p>
					<div class="flex space-x-2 mt-1 {(ed.company.website == null && ed.company.linkedin_url == null && ed.company.facebook_url == null && ed.company.twitter_url == null) ?"hidden":""} "> 
						<p class="font-semibold text-md">Contact: </p>
						<div class="flex space-x-2">
							<button on:click={()=>window.open(checkAndFixLink(ed.company.website), "_blank")} class="{ed.company.website == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1 rounded-lg">
								<svg viewBox="0 0 24 24" class="w-4" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63605 5.63605C7.19815 4.07395 9.73081 4.07395 11.2929 5.63605L14.1213 8.46448C15.6834 10.0266 15.6834 12.5592 14.1213 14.1213C13.7308 14.5119 13.0976 14.5119 12.7071 14.1213C12.3166 13.7308 12.3166 13.0976 12.7071 12.7071C13.4882 11.9261 13.4882 10.6597 12.7071 9.87869L9.87869 7.05026C9.09764 6.26922 7.83131 6.26922 7.05026 7.05026C6.26922 7.83131 6.26922 9.09764 7.05026 9.87869L7.75737 10.5858C8.1479 10.9763 8.14789 11.6095 7.75737 12C7.36685 12.3905 6.73368 12.3905 6.34316 12L5.63605 11.2929C4.07395 9.73081 4.07395 7.19815 5.63605 5.63605ZM11.2929 9.8787C11.6834 10.2692 11.6834 10.9024 11.2929 11.2929C10.5119 12.074 10.5119 13.3403 11.2929 14.1213L14.1213 16.9498C14.9024 17.7308 16.1687 17.7308 16.9498 16.9498C17.7308 16.1687 17.7308 14.9024 16.9498 14.1213L16.2427 13.4142C15.8521 13.0237 15.8521 12.3905 16.2427 12C16.6332 11.6095 17.2663 11.6095 17.6569 12L18.364 12.7071C19.9261 14.2692 19.9261 16.8019 18.364 18.364C16.8019 19.9261 14.2692 19.9261 12.7071 18.364L9.8787 15.5356C8.3166 13.9735 8.3166 11.4408 9.8787 9.8787C10.2692 9.48817 10.9024 9.48817 11.2929 9.8787Z" fill="#fff"></path> </g></svg>
							</button>
							<button on:click={()=>window.open(checkAndFixLink(ed.company.linkedin_url), "_blank")} class="{ed.company.linkedin_url == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1.5 rounded-lg">
								<svg fill="#fff" class="w-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_801_"> <path id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"></path> <path id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"></path> <path id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"></path> </g> </g></svg>
							</button>
							<button on:click={()=>window.open(checkAndFixLink(ed.company.facebook_url), "_blank")} class="{ed.company.facebook_url == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1.5 rounded-lg">
								<svg fill="#fff" class="w-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_834_"> <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"></path> </g> </g></svg>					
							</button>
							<button on:click={()=>window.open(checkAndFixLink(ed.company.twitter_url), "_blank")} class="{ed.company.twitter_url == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1.5 rounded-lg">
								<svg fill="#fff" class="w-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_826_"> <path id="XMLID_827_" d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73 c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783 c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598 C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467 c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977 c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889 c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597 c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961 c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895 c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367 c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998 C307.394,57.037,305.009,56.486,302.973,57.388z"></path> </g> </g></svg>
							</button>
						</div>
					</div>
				</div>
			{/each}
			{#if data.experience.length == 0 || data.experience == null}
				<p>No Records Found!</p>
			{/if}
		</div>
	{:else if screenState == "Education"}
		<div class="mt-3 p-2 space-y-3 max-h-[90%] rounded-xl overflow-y-auto" in:fade={{duration: 400}}>
			{#each data.education as ed}
				<div class="bg-white px-4 py-3 rounded-xl shadow-lg">			
					<p class="font-semibold text-md {ed.school.name == null ?"hidden":""}">School Name: <span class="font-normal"> {ed.school.name}</span></p>
					<p class="font-semibold text-md {ed.school.type == null ?"hidden":""}"> Education Type: <span class="font-normal"> {ed.school.type} </span></p>
					<p class="font-semibold text-md {ed.summary == null ?"hidden":""}">Education Summary: <span class="font-normal"> {ed.summary} </span></p>
					<p class="font-semibold text-md {(ed.school.location == null) ? "hidden":""}"> School Address: <span class="font-normal"> {getLocation(ed.school.location)}</span></p>
					<p class="font-semibold text-md {ed.start_date == null && ed.end_date == null ?"hidden":""}"> Education period: <span class="font-normal {ed.start_date == null ?"hidden":""}"> {ed.start_date} </span> - <span class="font-normal {ed.end_date == null ?"hidden":""}"> {ed.end_date} </span></p>
					<p class="font-semibold text-md {ed.gpa == null ?"hidden":""}"> GPA: <span class="font-normal"> {ed.gpa} </span></p>
					<div class="flex space-x-2 mt-1 {(ed.school.website == null && ed.school.linkedin_url == null && ed.school.facebook_url == null && ed.school.twitter_url == null) ?"hidden":""} "> 
						<p class="font-semibold text-md">Contact: </p>
						<div class="flex space-x-2">
							<button on:click={()=>window.open(checkAndFixLink(ed.school.website), "_blank")} class="{ed.school.website == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1 rounded-lg">
								<svg viewBox="0 0 24 24" class="w-4" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63605 5.63605C7.19815 4.07395 9.73081 4.07395 11.2929 5.63605L14.1213 8.46448C15.6834 10.0266 15.6834 12.5592 14.1213 14.1213C13.7308 14.5119 13.0976 14.5119 12.7071 14.1213C12.3166 13.7308 12.3166 13.0976 12.7071 12.7071C13.4882 11.9261 13.4882 10.6597 12.7071 9.87869L9.87869 7.05026C9.09764 6.26922 7.83131 6.26922 7.05026 7.05026C6.26922 7.83131 6.26922 9.09764 7.05026 9.87869L7.75737 10.5858C8.1479 10.9763 8.14789 11.6095 7.75737 12C7.36685 12.3905 6.73368 12.3905 6.34316 12L5.63605 11.2929C4.07395 9.73081 4.07395 7.19815 5.63605 5.63605ZM11.2929 9.8787C11.6834 10.2692 11.6834 10.9024 11.2929 11.2929C10.5119 12.074 10.5119 13.3403 11.2929 14.1213L14.1213 16.9498C14.9024 17.7308 16.1687 17.7308 16.9498 16.9498C17.7308 16.1687 17.7308 14.9024 16.9498 14.1213L16.2427 13.4142C15.8521 13.0237 15.8521 12.3905 16.2427 12C16.6332 11.6095 17.2663 11.6095 17.6569 12L18.364 12.7071C19.9261 14.2692 19.9261 16.8019 18.364 18.364C16.8019 19.9261 14.2692 19.9261 12.7071 18.364L9.8787 15.5356C8.3166 13.9735 8.3166 11.4408 9.8787 9.8787C10.2692 9.48817 10.9024 9.48817 11.2929 9.8787Z" fill="#fff"></path> </g></svg>
							</button>
							<button on:click={()=>window.open(checkAndFixLink(ed.school.linkedin_url), "_blank")} class="{ed.school.linkedin_url == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1.5 rounded-lg">
								<svg fill="#fff" class="w-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_801_"> <path id="XMLID_802_" d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"></path> <path id="XMLID_803_" d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"></path> <path id="XMLID_804_" d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"></path> </g> </g></svg>
							</button>
							<button on:click={()=>window.open(checkAndFixLink(ed.school.facebook_url), "_blank")} class="{ed.school.facebook_url == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1.5 rounded-lg">
								<svg fill="#fff" class="w-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_834_"> <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"></path> </g> </g></svg>					
							</button>
							<button on:click={()=>window.open(checkAndFixLink(ed.school.twitter_url), "_blank")} class="{ed.school.twitter_url == null ?"hidden":""} bg-gray-600 hover:bg-blue-600 p-1.5 rounded-lg">
								<svg fill="#fff" class="w-3" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_826_"> <path id="XMLID_827_" d="M302.973,57.388c-4.87,2.16-9.877,3.983-14.993,5.463c6.057-6.85,10.675-14.91,13.494-23.73 c0.632-1.977-0.023-4.141-1.648-5.434c-1.623-1.294-3.878-1.449-5.665-0.39c-10.865,6.444-22.587,11.075-34.878,13.783 c-12.381-12.098-29.197-18.983-46.581-18.983c-36.695,0-66.549,29.853-66.549,66.547c0,2.89,0.183,5.764,0.545,8.598 C101.163,99.244,58.83,76.863,29.76,41.204c-1.036-1.271-2.632-1.956-4.266-1.825c-1.635,0.128-3.104,1.05-3.93,2.467 c-5.896,10.117-9.013,21.688-9.013,33.461c0,16.035,5.725,31.249,15.838,43.137c-3.075-1.065-6.059-2.396-8.907-3.977 c-1.529-0.851-3.395-0.838-4.914,0.033c-1.52,0.871-2.473,2.473-2.513,4.224c-0.007,0.295-0.007,0.59-0.007,0.889 c0,23.935,12.882,45.484,32.577,57.229c-1.692-0.169-3.383-0.414-5.063-0.735c-1.732-0.331-3.513,0.276-4.681,1.597 c-1.17,1.32-1.557,3.16-1.018,4.84c7.29,22.76,26.059,39.501,48.749,44.605c-18.819,11.787-40.34,17.961-62.932,17.961 c-4.714,0-9.455-0.277-14.095-0.826c-2.305-0.274-4.509,1.087-5.294,3.279c-0.785,2.193,0.047,4.638,2.008,5.895 c29.023,18.609,62.582,28.445,97.047,28.445c67.754,0,110.139-31.95,133.764-58.753c29.46-33.421,46.356-77.658,46.356-121.367 c0-1.826-0.028-3.67-0.084-5.508c11.623-8.757,21.63-19.355,29.773-31.536c1.237-1.85,1.103-4.295-0.33-5.998 C307.394,57.037,305.009,56.486,302.973,57.388z"></path> </g> </g></svg>
							</button>
						</div>
					</div>
				</div>
			{/each}
			{#if data.education.length == 0 || data.education == null}
				<p>No Records Found!</p>
			{/if}
		</div>
	{:else if screenState == "Contact Info"}
		<div class="mt-3 p-2 space-y-3 max-h-[85%] rounded-xl overflow-y-auto" in:fade={{duration: 400}}>
				<div class="flex flex-col px-4 py-3">
					<div class="font-semibold text-md group inline-block {data.linkedin_url == null ?"hidden":""}"> LinkedIn: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.linkedin_url)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.linkedin_url}</a> </span>
						<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.linkedin_url));}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
							</svg>					  
						</button>
					</div>
					<div class="font-semibold text-md group inline-block {data.facebook_url == null ?"hidden":""}"> Facebook: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.facebook_url)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.facebook_url}</a> </span>
						<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.facebook_url));}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
							</svg>					  
						</button>
					</div>
					<div class="font-semibold text-md group inline-block {data.twitter_url == null ?"hidden":""}"> Twitter: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.twitter_url)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.twitter_url}</a> </span>
						<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.facebook_url));}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
							</svg>					  
						</button>
					</div>
					<div class="font-semibold text-md group inline-block {data.github_url == null ?"hidden":""}"> Github: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.github_url)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.github_url}</a> </span>
						<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.github_url));}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
							</svg>					  
						</button>
					</div>
					<div class="font-semibold text-md group inline-block {data.work_email == null ?"hidden":""}"> Work Email: <span class="font-normal ml-1"> <a href="{checkAndFixLink(data.work_email)}" target="_blank" class="text-blue-600 hover:text-blue-900"> {data.work_email}</a> </span>
						<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.work_email));}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
							</svg>					  
						</button>
					</div>
					<div class="font-semibold text-md group inline-block {data.mobile_phone == null ?"hidden":""}"> Mobile Phone: <span class="font-normal ml-1">{data.mobile_phone} </span>
						<button class="hidden group-hover:inline" on:click={()=>{navigator.clipboard.writeText(checkAndFixLink(data.mobile_phone));}}>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-500 hover:text-black w-6 h-4">
								<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
							</svg>					  
						</button>
					</div>
				</div>
		</div>
	{/if}
</div>
</div>