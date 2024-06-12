const app = require('./app.js');
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(process.env.PORT || 4000, () => {

  console.log(`Server is running on port ${process.env.PORT || 4000}`);

});