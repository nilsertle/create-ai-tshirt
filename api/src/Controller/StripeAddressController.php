<?php

namespace App\Controller;

use App\Service\StripeHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Entity\User;

class StripeAddressController extends AbstractController
{
    private $stripeHelper;

    public function __construct(StripeHelper $stripeHelper, private EntityManagerInterface $em)
    {
        $this->stripeHelper = $stripeHelper;
    }

    #[Route('/stripe/{stripeCustomerId}/new/address', name: 'app_stripe_new_address')]
    public function createAddress(Request $request, $stripeCustomerId): Response
    {
        // retrieve user with em repository
        $email = $this->getUser()->getUserIdentifier();
        $user = $this->em->getRepository(User::class)->findOneBy(["email" => $email]);
        dump(json_decode($request->getContent(), true));

        $this->stripeHelper->client->customers->update(
            $stripeCustomerId,
            ["shipping" => ["name" => $user->getFirstName() . " " . $user->getLastName(), "address" => json_decode($request->getContent(), true)]]
        );
        return new JsonResponse(['success' => 'works!!!!'], 200);
    }

    #[Route('/stripe/{stripeCustomerId}/retrieve/address', name: 'app_stripe_retrieve_address')]
    public function retrieveAddress($stripeCustomerId): Response
    {
        $customer = $this->stripeHelper->client->customers->retrieve(
            $stripeCustomerId,
            []
        );
        return new JsonResponse(['customer' => $customer], 200);
    }
}
