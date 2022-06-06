const axios = require('axios').default;

const options = {
    method: 'GET',
    url: 'https://api.jsonbin.io/b/629d0f95402a5b38021d8346/latest',
    headers: {
      'secret-key': '$2b$10$yJBxI6cXBjzDtHtiKqc5J.gF80lyJNsMZLrwKfOISAL9a0ZOn09K.'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});