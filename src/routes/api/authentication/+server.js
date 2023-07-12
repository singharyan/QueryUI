import 'dotenv/config';
import { json } from '@sveltejs/kit';

const PASSWORD = process.env.PWD

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const {pwd} = await request.json();
    if(pwd == PASSWORD){
        return json({auth: true, pwd: PASSWORD})
    }
    return json({auth: false, pwd: PASSWORD})
}