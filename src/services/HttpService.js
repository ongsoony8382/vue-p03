import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {

    
    async findAll(params){ //조건 없으면 전체 조회, 조건 있으면 일부만 조회 
        const res = await axios.get('/memo', {params});
        return res.data;
    }

    async findById(id){
        const res = await axios.get(`/memo/${id}`);
        return res.data; 
    }

    async modify(jsonBody){
        const res = await axios.put('/memo', jsonBody);
        return res.data;
    }
}

export default new HttpService();