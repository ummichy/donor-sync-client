import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL : "https://assignment-no-twelve-server.vercel.app",
  });
  return instance;
};

export default useAxiosPublic;
