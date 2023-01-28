const AWSClientS3 = require("aws-client-s3");
require('dotenv').config()
const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
};
const client = new AWSClientS3(config);
const uploadFileToAWS = async (fileData) => {
    try {
        let fileExtension;
        if (fileData?.file?.mimetype) {
            if(fileData?.file?.mimetype.split("/")[0] === 'video' || fileData?.file?.mimetype.split("/")[1] === 'json'){
                fileExtension = fileData?.file?.mimetype.split("/")[1];
            }
            else{
                return false
            }
        }
        const fileUploadResult = await client.uploadFile(fileData?.file?.data, {
            bucket: process.env.AWS_BUCKET,
            key: `${fileData?.file?.name?.trim()}`
        });
        return { URL: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileData?.file?.name?.trim()}`, fileType : fileExtension }
    } catch (error) {
        return error
    }
}
module.exports = { uploadFileToAWS }