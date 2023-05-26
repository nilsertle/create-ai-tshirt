<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CartRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CartRepository::class)]
#[ApiResource(
    operations: [
        new Post(),
        new Get(),
        new Put(
            denormalizationContext: ['groups' => ['cart:update']]
        ),
        new Delete(
            denormalizationContext: ['groups' => ['cart:delete']]
        ),
        new GetCollection()
    ],
    normalizationContext: ['groups' => ['cart:read']],
    denormalizationContext: ['groups' => ['cart:create']],
)]
class Cart
{
    #[Groups(['cart:read', "cart:delete", 'user:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['cart:read', "cart:create", "cart:update", 'user:read'])]
    #[ORM\Column]
    private ?int $quantity = null;

    #[Groups(['cart:read', "cart:create", "cart:update"])]
    #[ORM\Column]
    private ?string $size = null;

    #[Groups(['cart:read', "cart:create", "cart:update"])]
    #[ORM\Column]
    private ?string $color = null;

    #[ORM\Column]
    #[Groups(['cart:read', "cart:create", "cart:update", 'user:read'])]
    private ?int $price = null;

    #[Groups(['cart:read', "cart:create", "cart:update"])]
    #[ORM\ManyToOne(inversedBy: 'carts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $relatedUser = null;

    #[Groups(['cart:read', "cart:create", 'user:read'])]
    #[ORM\Column]
    private ?int $syncProductId = null;

    #[Groups(['cart:read', "cart:create", "cart:update", 'user:read'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $position = null;

    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(string $size): self
    {
        $this->size = $size;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
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

    public function getSyncProductId(): ?int
    {
        return $this->syncProductId;
    }

    public function setSyncProductId(int $syncProductId): self
    {
        $this->syncProductId = $syncProductId;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(?string $position): self
    {
        $this->position = $position;

        return $this;
    }
}
