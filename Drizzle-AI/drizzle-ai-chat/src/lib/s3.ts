import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: "eu-west-2",
    });
    const file_key =
      // "upload/" + Date.now().toString() + file.name.replace(" ", "-");
      "upload/" + Date.now().toString() + ".pdf";
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: file,
    };
    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evnt) => {
        console.log(
          "uploading progress:",
          parseInt(((evnt.loaded * 100) / evnt.total).toString()) + "%"
        );
      })
      .promise();
    await upload.then((data) => {
      console.log("sucessful upload:", file_key);
    });

    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch (error) {
    console.log(error);
  }
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-west-2.amazon-aws.com/${file_key}`;
  return url;
}
