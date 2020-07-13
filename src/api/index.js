import axios from "axios";

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;

// Google Books API URL for all book queries
// Documentation URL: https://developers.google.com/books/docs/v1/using#WorkingVolumes
// You can perform a volumes search by sending an HTTP GET request to the following URI:
const googleAPIURL = "https://www.googleapis.com/books/v1/volumes";

const googleBookDetailURL = "https://www.googleapis.com/books/v1/volumes";

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error("Not authenticated");
  }
  return { Authorization: `Bearer ${authState.accessToken}` };
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const bookSearch = searchQuery => {
  return axios
    .get(`${googleAPIURL}?q=${searchQuery}`)
    .then(response => response.data.items);
};

const boodDetail = googleId => {
  return axios
    .get(`${googleBookDetailURL}/${googleId}`)
    .then(response => response.data);
};

export { sleep, getExampleData, getProfileData, bookSearch };
