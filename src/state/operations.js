import axios from 'axios';

const getByProxy = async (url, options) => {
  try {
    const response = await axios.get(url, options);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export {
  getByProxy
};