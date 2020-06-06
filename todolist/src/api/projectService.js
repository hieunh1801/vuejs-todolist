import env from "../../enviroment/enviroment";

const baseUrl = env.baseUrl;
const projectUrl = `${baseUrl}/projects`;

export default {
  async getAll(_page = 1, _limit = 20, filter = null) {
    let url = `${projectUrl}?_page=${_page}&_limit=${_limit}`;
    if (filter != null) {
      for (const [key, value] of Object.entries(filter)) {
        url += `&${key}=${value}`;
      }
    }
    return await fetch(url).then(res => res.json());
  }
};
