fetch('https://dummyjson.com/products?limit=10')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

