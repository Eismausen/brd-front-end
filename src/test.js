import fetch from 'node-fetch';

 
fetch('http://www.google.com')
.then(res => res.json())
.then(() => console.log("Crash?"));