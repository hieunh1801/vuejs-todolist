import env from "../../enviroment/enviroment";

const baseUrl = env.baseUrl;
const todoUrl = `${baseUrl}/tags`;

export default {
  async getAll(filter = null) {
    let url = `${todoUrl}`;
    if (filter != null) {
      url += "?";
      for (const [key, value] of Object.entries(filter)) {
        url += `&${key}=${value}`;
      }
    }
    return await fetch(url).then(res => res.json());
  }
};
