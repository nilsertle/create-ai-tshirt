<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\AddressRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AddressRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Put(),
        new Patch(),
        new Delete(),
    ],
    // read access
    normalizationContext: ['groups' => ['address:read']],
    // write access
    denormalizationContext: ['groups' => ['address:create', 'address:update']],
)]
class Address
{
    #[Groups(['address:read', 'user:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $country = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $state = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $street = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\Column]
    private ?int $streetNumber = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\Column]
    private ?int $zip = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $city = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\ManyToOne(inversedBy: 'shippingAddresses')]
    private ?User $relatedUser = null;

    #[Groups(['address:read', 'address:create', 'address:update', 'user:read'])]
    #[ORM\ManyToOne(inversedBy: 'billingAddresses')]
    private ?User $billingUser = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getState(): ?string
    {
        return $this->state;
    }

    public function setState(string $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getStreetNumber(): ?int
    {
        return $this->streetNumber;
    }

    public function setStreetNumber(int $streetNumber): self
    {
        $this->streetNumber = $streetNumber;

        return $this;
    }

    public function getZip(): ?int
    {
        return $this->zip;
    }

    public function setZip(int $zip): self
    {
        $this->zip = $zip;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

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

    public function getBillingUser(): ?User
    {
        return $this->billingUser;
    }

    public function setBillingUser(?User $billingUser): self
    {
        $this->billingUser = $billingUser;

        return $this;
    }
}
