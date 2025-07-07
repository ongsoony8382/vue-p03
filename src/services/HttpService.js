import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';

class HttpService {

    
    async findAll(params){ //조건 없으면 전체 조회, 조건 있으면 일부만 조회 
        const res = await axios.get('/memo', {params});
        return res.data;
    }

    async findById(id){
        const res = await axios.get(`/memo/${id}`); //패스 베리어블 방식 
        return res.data; 
    }

    async modify(jsonBody){
        const res = await axios.put('/memo', jsonBody);
        return res.data;
    }

    async save(jsonBody){
        const res = await axios.post('/memo', jsonBody);
        return res.data;
    }

    async deleteById(id){
        const res = await axios.delete('/memo', { // 쿼리스트링 1번 방식 
            //axios.delete(`/memo?id=${id}`) // 쿼리스트링 2번 방식 
            params: { id }
        });
        return res.data;
    }
}

export default new HttpService();