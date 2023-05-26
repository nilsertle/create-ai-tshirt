<?php

namespace App\Controller;

use App\Entity\AiImage;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class GetAiImageItemController extends AbstractController
{
    public function __construct()
    {
    }

    public function __invoke(AiImage $data, Request $request, SerializerInterface $serializer): Response
    {
        $imagepath = $this->getParameter("kernel.project_dir") . "/public/images/ai/";
        if (file_exists($imagepath . $data->getOriginalUrl()) === false) {
            return new Response("File not found", 404);
        }

        $apiPlatformReturnObject = [];
        if ($data->getOriginalUrl() && file_exists($imagepath . $data->getOriginalUrl())) {
            $apiPlatformReturnObject["originalImageBase64"] = base64_encode(file_get_contents($imagepath . $data->getOriginalUrl()));
        }

        if ($data->getRemovedBackgroundUrl() && file_exists($imagepath . $data->getRemovedBackgroundUrl())) {
            $apiPlatformReturnObject["backgroundRemovedImageBase64"] = base64_encode(file_get_contents($imagepath . $data->getRemovedBackgroundUrl()));
        }

        $rest = $serializer->serialize($data, 'jsonld', ['groups' => ['aiImages:read']]);
        $apiPlatformReturnObject = array_merge($apiPlatformReturnObject, json_decode($rest, true));
        $json = json_encode($apiPlatformReturnObject);
        $responseWithFiles = new JsonResponse($json, 200, [], true);
        return $responseWithFiles;
    }
}
