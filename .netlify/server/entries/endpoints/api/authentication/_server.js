import "dotenv/config";
import { j as json } from "../../../../chunks/index2.js";
const PASSWORD = process.env.PWD;
async function POST({ request }) {
  const { pwd } = await request.json();
  if (pwd == PASSWORD) {
    return json({ auth: true });
  }
  return json({ auth: false });
}
export {
  POST
};
