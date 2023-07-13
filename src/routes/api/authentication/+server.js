import 'dotenv/config';
import { json } from '@sveltejs/kit';

const PASSWORD = process.env.PSSWRD

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { pwd } = await request.json();
    if (pwd == PASSWORD) {
        return json({ auth: true})
    }
    return json({ auth: false})
}