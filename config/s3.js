module.exports = {
  dirname: 'uploads',
  bucket: process.env.PROJECT3_BUCKET_NAME,
  secretAccessKey: process.env.PROJECT3_SECRET_KEY,
  accessKeyId: process.env.PROJECT3_ACCESS_KEY,
  region: 'eu-west-1',
  endpoint: 'https://s3-eu-west-1.amazonaws.com/'
};