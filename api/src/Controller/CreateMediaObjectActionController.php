<?php
// api/src/Controller/CreateMediaObjectAction.php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Service\SpacesHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Vich\UploaderBundle\Entity\File;
use Vich\UploaderBundle\Form\Type\VichFileType;

#[AsController]
final class CreateMediaObjectActionController extends AbstractController
{
    public function __construct()
    {
    }

    public function __invoke(Request $request, SpacesHelper $spacesHelper): MediaObject
    {
        $uploadedFile = null;

        if ($request->getContentTypeFormat() === 'form') {
            $uploadedFile = $request->files->get('file');
            if (!$uploadedFile) {
                throw new BadRequestHttpException('"file" is required');
            }
        } else if ($request->getContentTypeFormat() === 'json') {
            $data = json_decode($request->getContent(), true);
            $url = $data['url'];
            $tempFile = tempnam(sys_get_temp_dir(), 'upload_');
            copy($url, $tempFile);
            $uploadedFile = new UploadedFile($tempFile, basename($url));
        } else {
            throw new BadRequestHttpException('Content-Type must be multipart/form-data or json');
        }

        if (!$uploadedFile) {
            throw new BadRequestHttpException('Something went wrong');
        }

        $userIdendifierWithoutEnding = explode('@', $this->getUser()->getUserIdentifier())[0];
        $newFileName = $userIdendifierWithoutEnding . "/" . uniqid() . "." . $uploadedFile->getClientOriginalExtension();
        $result = $spacesHelper->uploadFile('create-image-upload', $uploadedFile, $newFileName, "general");

        $mediaObject = new MediaObject();
        $mediaObject->setPublic(false);
        $mediaObject->setOwner($this->getUser());
        $mediaObject->setType($uploadedFile->getMimeType());
        $mediaObject->setFileName($newFileName);
        $mediaObject->setOriginalFileName($uploadedFile->getClientOriginalName());
        $mediaObject->setObjectUrl($result['ObjectURL']);

        return $mediaObject;
    }
}
