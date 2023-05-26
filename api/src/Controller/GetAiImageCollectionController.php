<?php

namespace App\Controller;

use App\Entity\AiImage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

#[AsController]
class GetAiImageCollectionController extends AbstractController
{
    private $em;
    private $serializer;

    public function __construct(EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $this->em = $em;
        $this->serializer = $serializer;
    }

    public function __invoke()
    {
        $apiPlatformReturnObject = [];
        $imagepath = $this->getParameter("kernel.project_dir") . "/public/images/ai/";
        $data = $this->em->getRepository(AiImage::class)->findAll();

        foreach ($data as $key => $value) {
            $tempItemObject = [];

            if ($value->getOriginalUrl() && file_exists($imagepath . $value->getOriginalUrl())) {
                $tempItemObject["originalImageBase64"] = base64_encode(file_get_contents($imagepath . $value->getOriginalUrl()));
            }

            if ($value->getRemovedBackgroundUrl() && file_exists($imagepath . $value->getRemovedBackgroundUrl())) {
                $tempItemObject["backgroundRemovedImageBase64"] = base64_encode(file_get_contents($imagepath . $value->getRemovedBackgroundUrl()));
            }

            $rest = $this->serializer->serialize($value, 'jsonld', ['groups' => ['aiImages:read']]);
            $tempItemObject = array_merge($tempItemObject, json_decode($rest, true));
            array_push($apiPlatformReturnObject, $tempItemObject);
        }

        $json = json_encode($apiPlatformReturnObject);
        $responseWithFiles = new JsonResponse($json, 200, [], true);
        return $responseWithFiles;
    }
}
