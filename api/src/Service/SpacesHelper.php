<?php

namespace App\Service;

use Aws\S3\S3Client;

class SpacesHelper
{
    private $client;

    public function __construct($spacesKey, $spacesSecret)
    {
        $this->client = new S3Client([
            'version' => 'latest',
            'region' => 'us-east-1',
            'endpoint' => 'https://fra1.digitaloceanspaces.com',
            'use_path_style_endpoint' => false,
            'credentials' => [
                'key' => $spacesKey,
                'secret' => $spacesSecret,
            ],
        ]);
    }

    public function createNewBucket($bucketName)
    {
        $result = $this->client->createBucket([
            'Bucket' => $bucketName,
        ]);
        return $result;
    }

    public function listBuckets()
    {
        $buckets = $this->client->listBuckets();
        return $buckets;
    }

    public function uploadFile($bucketName, $file, $fileName, $folderName = 'generated-mockups')
    {
        $result = $this->client->putObject([
            'Bucket' => $bucketName,
            'Key' => $folderName . "/" . $fileName,
            'Body' => fopen($file->getPathname(), 'r'),
            'ACL' => 'public-read',
            'Metadata'   => array(
                'x-amz-meta-my-key' => 'your-value'
            )
        ]);
        return $result;
    }

    public function listFilesOfBucket($bucketName)
    {
        $result = $this->client->listObjects([
            'Bucket' => $bucketName,
        ]);
        return $result;
    }

    public function getFileOfBucket($bucketName, $fileName, $folderName = 'generated-mockups')
    {
        $result = $this->client->getObject([
            'Bucket' => $bucketName,
            'Key' => $folderName . "/" . $fileName,
        ]);
        return $result;
    }

    public function createPresignedUrl($bucketName, $fileName, $expires = '+20 minutes')
    {
        $cmd = $this->client->getCommand('GetObject', [
            'Bucket' => $bucketName,
            'Key' => $fileName,
        ]);
        $request = $this->client->createPresignedRequest($cmd, $expires);
        $presignedUrl = (string)$request->getUri();
        return $presignedUrl;
    }

    public function deleteFileFromBucket($bucketName, $fileName)
    {
        $result = $this->client->deleteObject([
            'Bucket' => $bucketName,
            'Key' => $fileName,
        ]);
        return $result;
    }

    public function deleteBucket($bucketName)
    {
        $result = $this->client->deleteBucket([
            'Bucket' => $bucketName,
        ]);
        return $result;
    }
}
