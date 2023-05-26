<?php

namespace App\Controller;

use App\Entity\AiImage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[AsController]
class CreateAiImageController extends AbstractController
{

    public function __invoke(Request $request, EntityManagerInterface $entityManager, Security $security)
    {
        $data = json_decode($request->getContent(), true);
        $image = $data["originalUrl"];
        $tempImg = file_get_contents($image);
        $imagepath = $this->getParameter("kernel.project_dir") . "/public/images";
        $fileName = md5(date('Y-m-d H:i:s:u')) . '.jpg';
        file_put_contents($imagepath . '/ai/' . $fileName, $tempImg);

        $aiImage = new AiImage();
        $aiImage->setOriginalUrl($fileName);
        $aiImage->setPrompt($data["prompt"]);
        // $aiImage->addUser();
        $aiImage->addUser($security->getUser());
        // $security->getUser()->addAiImage($aiImage);
        $entityManager->persist($aiImage);
        $entityManager->flush();

        return $aiImage;
    }
}
