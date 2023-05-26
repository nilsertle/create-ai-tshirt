<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class AuthController extends AbstractController
{
    #[Route('/api/auth/me', name: 'me')]
    public function me(SerializerInterface $serializer): Response
    {
        /** @var User */
        $authenticatedUser = $this->getUser();
        if (!$authenticatedUser) {
            $resp = new Response();
            $resp->headers->clearCookie("BEARER");
            $resp->setStatusCode(401);
            return $resp;
        }
        $json = $serializer->serialize(
            $authenticatedUser,
            'jsonld',
            ['groups' => 'user:read']
        );
        return new JsonResponse($json, 200, [], true);
    }

    #[Route('/api/auth/logout', name: 'logout-controller', methods: ['POST'])]
    public function logout(): Response
    {
        $authenticatedUser = $this->getUser();

        if (null === $authenticatedUser) {
            return new Response();
        }

        $resp = new Response();
        $resp->headers->clearCookie("BEARER");
        return $resp;
    }

    #[Route('/api/auth/reset-password', name: 'reset-password', methods: ['POST'])]
    public function resetPassword(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        $content = json_decode($request->getContent(), true);
        if (!array_key_exists("email", $content)) return new Response();

        $user = $em->getRepository(User::class)->findOneBy(["email" => $content["email"]]);
        $oldPassword = $content['oldPassword'];
        $newPassword = $content['plainPassword'];
        // if old password is correct, update the password
        if (password_verify($oldPassword, $user->getPassword())) {

            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $newPassword
            );

            $user->setPassword($hashedPassword);
            $em->persist($user);
            $em->flush();
            $resp = new Response("Password updated successfully");
            return $resp;
        }

        $resp = new Response("Old password is incorrect", 400);
        return $resp;
    }
}
