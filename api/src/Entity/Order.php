<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\OrderRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
#[ApiFilter(SearchFilter::class, properties: ['printfulOrderId' => 'exact', 'relatedUser' => 'exact'])]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
    ],
    normalizationContext: ['groups' => ['order:read']],
    denormalizationContext: ['groups' => ['order:create', 'order:update']],
)]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['order:read', 'order: create', 'order:update'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['order:read', 'order: create', 'order:update'])]
    private ?User $relatedUser = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['order:read', 'order: create', 'order:update'])]
    private ?string $payment_method_id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['order:read', 'order: create', 'order:update'])]
    private ?string $printfulOrderId = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRelatedUser(): ?User
    {
        return $this->relatedUser;
    }

    public function setRelatedUser(?User $relatedUser): self
    {
        $this->relatedUser = $relatedUser;

        return $this;
    }

    public function getPaymentMethodId(): ?string
    {
        return $this->payment_method_id;
    }

    public function setPaymentMethodId(string $payment_method_id): self
    {
        $this->payment_method_id = $payment_method_id;

        return $this;
    }

    public function getPrintfulOrderId(): ?string
    {
        return $this->printfulOrderId;
    }

    public function setPrintfulOrderId(string $printfulOrderId): self
    {
        $this->printfulOrderId = $printfulOrderId;

        return $this;
    }
}
