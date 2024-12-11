import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const searchImages = async (query, page) => {
  const { data } = await axios("/search/photos", {
    params: {
      client_id: "Z8YeBm2gs902Q0iGzC5Fk0FJoQFnRKecF1qnAMipbA0",
      query,
      page,
      per_page: 12,
    },
  });

  return data;
};
export default searchImages;
