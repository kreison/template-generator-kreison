import axios from 'axios';
import { BASE_URL } from 'shared/lib/variables/variables';


export const requester = axios.create({ baseURL: BASE_URL });
