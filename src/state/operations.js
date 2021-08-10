import axios from 'axios';

const get = async (url, options) => {
  try {
    const response = await axios.get(url, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export {
  get
};