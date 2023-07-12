import { createReadStream, appendFileSync } from 'fs';
import { createInterface } from 'readline';
import { json } from '@sveltejs/kit';
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.clients.forEach((client) => {
  client.send("hello");
});


const filePath = 'static/data.txt';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
  var currentLine= 0;
  
  const { locations, professions, start, condition, records } = await request.json();

  const locationFields = [
    'job_company_location_address_line_2',
    'job_company_location_continent',
    'job_company_location_country',
    'job_company_location_locality',
    'job_company_location_metro',
    'job_company_location_name',
    'job_company_location_region',
    'job_company_location_street_address',
    'location_address_line_2',
    'location_continent',
    'location_country',
    'location_locality',
    'location_metro',
    'location_name',
    'location_region',
  ];
  
  const professionFields = [
    'job_title',
    'job_company_industry',
    'job_company_name',
    'job_company_website',
    'job_summary',
    'industry',
    'job_title_role',
    'job_title_sub_role',
    'job_summary',
    'full_name',
  ];
  
  var count=0;
  var lines= [];
  var num = parseInt(records);
  await new Promise((resolve, reject) => {
    const rl = createInterface({
      input: createReadStream(filePath)
    });
    rl.on("line", function(line){
      
      currentLine++;
      if(currentLine % 100000 == 0) console.log(currentLine);
      try {
        if(lines.length < num && currentLine >= start && line){
          var temp = JSON.parse(line.trim());
          const isLocation = checkLocations(locationFields, temp, locations);
          const isProfession = checkIfMatchExists(professionFields, temp, professions, condition);

            if( isProfession && isLocation ){  
              lines.push(temp);
              count++;
              console.log(count +" found till line number " , currentLine);
            } 
        }else if(lines.length >= num){
          rl.close();
        }
      } catch (error) {
        console.log(error);
      }
    })
    rl.on("close", ()=>{
      console.log("Search Ended.", currentLine);
      resolve();
    })
    rl.on("error", (err) => {
      console.error(err);
      reject(err);
    });
  });

  return json({lines, currentLine})
  };

function textInArray(array, text){
  if(typeof text !== 'string') return false;
  const textWords = text.toLowerCase().split(' ');
  const commonWords = array.filter(word => textWords.includes(word.toLowerCase()));
  return commonWords;
}

function checkTokensInText(tokens, text) {
  text = text.toLowerCase().replace(/[.,!?]/g, ''); // Remove commas, dots, exclamation marks, and question marks
  const words = text.split(/\s+/); // Split text into individual words

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].toLowerCase().replace(/[.,!?]/g, ''); // Remove commas, dots, exclamation marks, and question marks
    const tokenFound = words.some((word) => word === token);

    if (!tokenFound) {
      return false;
    }
  }

  return true;
}

function checkLocations(fields, temp, array){
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const value = temp[field];
    if (value != null && textInArray(array, value).length > 0) {
      return true;
    }
  }

  return false;
}

function checkIfMatchExists(fields, temp, array, condition) {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const value = temp[field];

    if(condition == "OR" ){
      if (value != null && textInArray(array, value).length > 0) {
        return true;
      }
    }else if(condition == "AND"){
      if (value != null && checkTokensInText(array, value)) {
        return true;
      }
    }
  }

  return false;
}
