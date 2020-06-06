import env from "../../enviroment/enviroment";

const baseUrl = env.baseUrl;
const noteUrl = `${baseUrl}/notes`;

export default {
  async getAll(filter = null) {
    let url = `${noteUrl}`;
    if (filter != null) {
      url += "?";
      for (const [key, value] of Object.entries(filter)) {
        url += `&${key}=${value}`;
      }
    }
    return await fetch(url).then(res => res.json());
  }
};
