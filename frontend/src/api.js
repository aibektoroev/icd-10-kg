import axios from "axios";

const makeRequestCreator = () => {
  let cancelToken;

  return async (keyword) => {
    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    let results = [];
    try {
      results = await axios.get(
        `http://localhost:8000/api/livesearch?search=${keyword}`,

        { cancelToken: cancelToken.token } //Pass the cancel token to the current request
      );

      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        // Handle usual errors
        console.log("Something went wrong: ", error.message);
      }
    }

    return results;
  };
};

export const search = makeRequestCreator();
