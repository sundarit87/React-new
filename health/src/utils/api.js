var axios = require('axios');

// npm install axios
const fetchResponse = function (language) {

var encodedURI = window.encodeURI('http://localhost:8080/search/repositories?q=stars:>1+language:'+
language + '&sort=stars&order=desc&type=Repositories');

return axios.get(encodedURI)

.then(function (response) {

return response.data.items;

});

}

export default fetchResponse;