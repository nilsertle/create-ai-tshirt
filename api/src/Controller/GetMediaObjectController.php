<?php

namespace App\Controller;

use App\Entity\AiImage;
use App\Entity\MediaObject;
use App\Service\SpacesHelper;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class GetMediaObjectController extends AbstractController
{
    public function __construct()
    {
    }

    public function __invoke(SpacesHelper $spacesHelper, Request $request, EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        //   /** @var User */
        //   $authenticatedUser = $this->getUser();
        //   if (!$authenticatedUser) {
        //       $resp = new Response();
        //       $resp->headers->clearCookie("BEARER");
        //       $resp->setStatusCode(401);
        //       return $resp;
        //   }

        // $json = $serializer->serialize(
        //     $authenticatedUser,
        //     'jsonld',
        //     ['groups' => 'user:read']
        // );

        $data = $em->getRepository(MediaObject::class)->find($request->get('id'));
        $image = $spacesHelper->getFileOfBucket('create-image-upload', $data->getFileName());


        return new JsonResponse($image);
    }
}
