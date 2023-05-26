<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Service\PrintfulHelper;
use App\Service\StripeHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CheckoutController extends AbstractController
{
    #[Route('/api/checkout_sessions', name: 'app_checkout', methods: ['POST'])]
    public function index(SerializerInterface $serializer, Request $request, EntityManagerInterface $em, StripeHelper $stripeHelper, PrintfulHelper $printfulHelper)
    {
        /** @var User $user */
        $securityUser = $this->getUser();
        // get user by useridentifier
        $user = $em->getRepository(User::class)->findOneBy(['email' => $securityUser->getUserIdentifier()]);
        $carts = $user->getCarts();
        $carts = json_decode($serializer->serialize($carts, "json", ['groups' => ['cart:read']]));

        // fetch printful product with cart->syncProductId and get name and image


        $lineItems = [];
        foreach ($carts as $key => $cartItem) {
            $printfulProduct = $printfulHelper->wrapper("get", "store/products/" . $cartItem->syncProductId);

            $name = $printfulProduct['sync_product']['name'];

            $preview_file = null;
            foreach ($printfulProduct['sync_variants'] as $variant) {
                foreach ($variant['files'] as $file) {
                    if ($file['type'] === 'preview') {
                        $preview_file = $file;
                        break 2; // break out of both loops
                    }
                }
            }

            $url = null;
            if ($preview_file && $preview_file['preview_url']) {
                $url = $preview_file['preview_url'];
            } else {
                $url = $printfulProduct['sync_product']['thumbnail_url'];
            }


            array_push($lineItems, [
                'price_data' => [
                    'currency' => 'eur',
                    'unit_amount' => $cartItem->price,
                    'product_data' => [
                        'name' => $name,
                        'images' => [$url],
                    ],
                ],
                'quantity' => $cartItem->quantity,
            ]);
        }

        // set user last to null
        $user->setLastSuccessfulOrder(null);
        $em->persist($user);
        $em->flush();

        $session = $stripeHelper->createCheckoutSession($lineItems, $user->getStripeCustomerId());

        return new JsonResponse(array("sessionUrl" => $session->url), 200, []);
        // $res->isRedirect($session->url);
    }
}
