<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\StripeHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BillingController extends AbstractController
{
    private $stripeHelper;

    public function __construct(StripeHelper $stripeHelper)
    {
        $this->stripeHelper = $stripeHelper;
    }

    #[Route('/api/billing/payment-methods', name: 'add_payment_method', methods: ['POST'])]
    public function addPaymentMethod(Request $request, EntityManagerInterface $em): Response
    {
        $securityUser = $this->getUser();
        $user = $em->getRepository(User::class)->findOneBy(['email' => $securityUser->getUserIdentifier()]);

        $paymentMethod = json_decode($request->getContent(), true);

        try {
            $newPaymentMethod = $this->stripeHelper->client->paymentMethods->create([
                'type' => 'card',
                'card' => [
                    'number' => $paymentMethod['card']['number'],
                    'exp_month' => $paymentMethod['card']['exp_month'],
                    'exp_year' => $paymentMethod['card']['exp_year'],
                    'cvc' => $paymentMethod['card']['cvc'],
                ],
            ]);
            $response = $this->stripeHelper->client->paymentMethods->attach(
                $newPaymentMethod["id"],
                ['customer' => $user->getStripeCustomerId()]
            );
            return new JsonResponse($response);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            return new JsonResponse(['error' => 'Payment method does not exist.'], 400);
        } catch (\Stripe\Exception\CardException $e) {
            return new JsonResponse(['error' => 'Card is declined.'], 400);
        }
    }

    #[Route('/api/billing/payment-methods/{paymentMethodId}', name: 'update_payment_method', methods: ['POST'])]
    public function updatePaymentMethod(Request $request, EntityManagerInterface $em, $paymentMethodId): Response
    {
        $securityUser = $this->getUser();
        $user = $em->getRepository(User::class)->findOneBy(['email' => $securityUser->getUserIdentifier()]);

        $response = $this->stripeHelper->client->customers->update(
            $user->getStripeCustomerId(),
            ['invoice_settings' => ['default_payment_method' => $paymentMethodId]]
        );
        return new JsonResponse($response);
    }

    #[Route('/api/billing/customers/{stripeCustomerId}', name: 'get_customer', methods: ['GET'])]
    public function getCustomer(Request $request, EntityManagerInterface $em, $stripeCustomerId): Response
    {
        $response = $this->stripeHelper->client->customers->retrieve(
            $stripeCustomerId
        );
        return new JsonResponse($response);
    }

    #[Route('/api/billing/payment-methods', name: 'get_payment_methods', methods: ['GET'])]
    public function getPaymentMethods(Request $request, EntityManagerInterface $em): Response
    {
        // get user by useridentifier from repository
        $securityUser = $this->getUser();
        $user = $em->getRepository(User::class)->findOneBy(['email' => $securityUser->getUserIdentifier()]);
        $paymentMethods = $this->stripeHelper->client->paymentMethods->all([
            'customer' => $user->getStripeCustomerId(),
            'type' => "card",
        ]);

        return new JsonResponse($paymentMethods);
    }

    #[Route('/api/billing/payment-methods/{paymentMethodId}', name: 'delete_payment_method', methods: ['DELETE'])]
    public function deletePaymentMethod(Request $request, EntityManagerInterface $em, $paymentMethodId): Response
    {
        try {
            $response = $this->stripeHelper->client->paymentMethods->detach(
                $paymentMethodId
            );
            return new JsonResponse($response);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Stripe\Exception\CardException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    // get a paymentmethod by id
    #[Route('/api/billing/payment-methods/{paymentMethodId}', name: 'get_payment_method', methods: ['GET'])]
    public function getPaymentMethod(Request $request, EntityManagerInterface $em, $paymentMethodId): Response
    {
        try {
            $response = $this->stripeHelper->client->paymentMethods->retrieve(
                $paymentMethodId
            );
            return new JsonResponse($response);
        } catch (\Stripe\Exception\InvalidRequestException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Stripe\Exception\CardException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
