import axios from 'axios';
const baseDomain = 'http://88.198.152.58:1337/';
// const baseDomain = 'http://10.0.11.149:9000/';

const baseURL = `${baseDomain}`;
export default axios.create({
 baseURL,
 headers: { 'Access-Control-Allow-Origin': '*','Content-Type' : '', 'Cache-Control': 'no-cache', 'Authorization' : '' },
});
