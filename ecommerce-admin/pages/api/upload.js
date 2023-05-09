import React from 'react'
import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs';
import mime from 'mime-types'

export default async function handle(req, res) {
    const bucket_name = 'scottnextecommerce'
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })

        });
    });
    console.log('length:', files);
    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    });
    const links = []
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        // console.log({ ext, file })
        const newFileName = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: bucket_name,
            Key: newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path)
        }))
        const link = `https://${bucket_name}.s3.amazonaws.com/${newFileName}`;
        await links.push(link)
    }

    return res.json({ links })
}

export const config = {
    api: {
        bodyParser: false
    }
}
