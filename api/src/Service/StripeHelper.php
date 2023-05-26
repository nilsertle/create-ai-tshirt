<?php

namespace App\Service;

use Stripe\Checkout\Session;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class StripeHelper
{
    public $client;
    public $domain;


    public function __construct($stripeSecret, $domain)
    {
        $this->client = new \Stripe\StripeClient($stripeSecret);
        $this->domain = $domain;
    }

    public function createCheckoutSession($lineItems, $customer = null)
    {
        try {
            $serverName = getenv('APP_ENV') === 'prod' ? $this->domain : 'localhost';
            $success_url = "https://" . $serverName . '/cart/success?session_id={CHECKOUT_SESSION_ID}';
            $cancel_url = "https://" . $serverName . '/cart?canceled=true';

            $session = $this->client->checkout->sessions->create([
                'payment_method_types' => ['card'],
                'customer' => $customer,
                'line_items' => [$lineItems],
                'mode' => 'payment',
                'success_url' => $success_url,
                'cancel_url' => $cancel_url,
                "automatic_tax" => ["enabled" => false],
            ]);
            return $session;
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }

    public function checkCheckoutSession($sessionId)
    {
        $session = $this->client->checkout->sessions->retrieve($sessionId);
        if ($session->payment_status == "paid") {
            return $session;
        } else {
            return false;
        }
    }

    public function createCustomer($email)
    {
        $customer = $this->client->customers->create([
            'email' => $email,
        ]);

        return $customer;
    }
}
