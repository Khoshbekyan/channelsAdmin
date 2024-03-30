import axios from "axios"
const API_KEY = "AIzaSyAa2hZYYzhioB-JCz-Uz3HFFTHjavkUXHk"
const getAddress =  async (address) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAa2hZYYzhioB-JCz-Uz3HFFTHjavkUXHk&address=${address}&key=${API_KEY}`)
    const res = response.data.results[0].geometry.location
    return res
}
export default getAddress