<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

class SetOwnerProcessor implements ProcessorInterface
{

    public function __construct(private readonly ProcessorInterface $processor, private readonly Security $security, private readonly EntityManagerInterface $em)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $userIdentifier = $this->security->getUser()->getUserIdentifier();
        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $userIdentifier]);
        $data->setRelatedUser($user);

        return $this->processor->process($data, $operation, $uriVariables, $context);
    }
}
