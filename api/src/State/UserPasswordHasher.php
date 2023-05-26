<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Cart;
use App\Service\StripeHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserPasswordHasher implements ProcessorInterface
{
    private $em;
    public function __construct(private readonly ProcessorInterface $processor, private readonly UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em, private readonly StripeHelper $stripeHelper)
    {
        $this->em = $em;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if (!$data->getPlainPassword()) {
            return $this->processor->process($data, $operation, $uriVariables, $context);
        }

        $hashedPassword = $this->passwordHasher->hashPassword(
            $data,
            $data->getPlainPassword()
        );
        $data->setPassword($hashedPassword);
        $data->eraseCredentials();

        $stripeCustomer = $this->stripeHelper->createCustomer($data->getEmail());
        // update this customer with the name
        $stripeCustomer = $this->stripeHelper->client->customers->update(
            $stripeCustomer->id,
            ["name" => $data->getFirstName() . " " . $data->getLastName()]
        );
        $data->setStripeCustomerId($stripeCustomer->id);

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
