<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    // allowed operations
    operations: [
        new GetCollection(),
        new Post(processor: UserPasswordHasher::class),
        new Get(),
        new Put(processor: UserPasswordHasher::class),
        new Patch(processor: UserPasswordHasher::class),
        new Delete(),
    ],
    // read access
    normalizationContext: ['groups' => ['user:read']],
    // write access
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity('email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['user:read', 'review:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['user:read', 'user:create', 'user:update', 'review:read'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update', 'review:read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:create', 'user:update', 'review:read'])]
    private ?string $lastName = null;

    #[ORM\Column]
    #[Groups(['user:read', 'user:create', 'user:update'])]
    private ?bool $acceptsMarketingLicense = null;

    #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\ManyToMany(targetEntity: AiImage::class, inversedBy: 'users', cascade: ["persist"])]
    private Collection $aiImages;

    #[Groups(['user:read', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'relatedUser', targetEntity: Cart::class, orphanRemoval: true)]
    private Collection $carts;

    #[ORM\OneToMany(mappedBy: 'author', targetEntity: Review::class)]
    private Collection $reviews;

    // #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'relatedUser', targetEntity: Address::class)]
    private Collection $shippingAddresses;

    // #[Groups(['user:read', 'user:create', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'billingUser', targetEntity: Address::class)]
    private Collection $billingAddresses;

    #[Groups(['user:read', 'user:update'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $checkoutSessionId = null;

    #[Groups(['user:read', 'user:update'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $lastSuccessfulOrder = null;

    #[Groups(['user:read', "user:create"])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $stripeCustomerId = null;

    #[Groups(['user:read', 'user:update'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $profilePicture = null;

    #[ORM\OneToMany(mappedBy: 'relatedUser', targetEntity: Order::class)]
    private Collection $orders;

    #[ORM\OneToMany(mappedBy: 'relatedUser', targetEntity: CreateEditorInstance::class)]
    private Collection $createEditorInstances;

    public function __construct()
    {
        $this->aiImages = new ArrayCollection();
        $this->carts = new ArrayCollection();
        $this->reviews = new ArrayCollection();
        $this->shippingAddresses = new ArrayCollection();
        $this->billingAddresses = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->createEditorInstances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $painPassword): self
    {
        $this->plainPassword = $painPassword;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function isAcceptsMarketingLicense(): ?bool
    {
        return $this->acceptsMarketingLicense;
    }

    public function setAcceptsMarketingLicense(bool $acceptsMarketingLicense): self
    {
        $this->acceptsMarketingLicense = $acceptsMarketingLicense;

        return $this;
    }

    /**
     * @return Collection<int, AiImage>
     */
    public function getAiImages(): Collection
    {
        return $this->aiImages;
    }

    public function addAiImage(AiImage $aiImage): self
    {
        if (!$this->aiImages->contains($aiImage)) {
            $this->aiImages->add($aiImage);
        }

        return $this;
    }

    public function removeAiImage(AiImage $aiImage): self
    {
        $this->aiImages->removeElement($aiImage);

        return $this;
    }

    /**
     * @return Collection<int, Cart>
     */
    public function getCarts(): Collection
    {
        return $this->carts;
    }

    public function addCart(Cart $cart): self
    {
        if (!$this->carts->contains($cart)) {
            $this->carts->add($cart);
            $cart->setRelatedUser($this);
        }

        return $this;
    }

    public function removeCart(Cart $cart): self
    {
        if ($this->carts->removeElement($cart)) {
            // set the owning side to null (unless already changed)
            if ($cart->getRelatedUser() === $this) {
                $cart->setRelatedUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews->add($review);
            $review->setAuthor($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getAuthor() === $this) {
                $review->setAuthor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Address>
     */
    public function getShippingAddresses(): Collection
    {
        return $this->shippingAddresses;
    }

    public function addShippingAddress(Address $shippingAddress): self
    {
        if (!$this->shippingAddresses->contains($shippingAddress)) {
            $this->shippingAddresses->add($shippingAddress);
            $shippingAddress->setRelatedUser($this);
        }

        return $this;
    }

    public function removeShippingAddress(Address $shippingAddress): self
    {
        if ($this->shippingAddresses->removeElement($shippingAddress)) {
            // set the owning side to null (unless already changed)
            if ($shippingAddress->getRelatedUser() === $this) {
                $shippingAddress->setRelatedUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Address>
     */
    public function getBillingAddresses(): Collection
    {
        return $this->billingAddresses;
    }

    public function addBillingAddress(Address $billingAddress): self
    {
        if (!$this->billingAddresses->contains($billingAddress)) {
            $this->billingAddresses->add($billingAddress);
            $billingAddress->setBillingUser($this);
        }

        return $this;
    }

    public function removeBillingAddress(Address $billingAddress): self
    {
        if ($this->billingAddresses->removeElement($billingAddress)) {
            // set the owning side to null (unless already changed)
            if ($billingAddress->getBillingUser() === $this) {
                $billingAddress->setBillingUser(null);
            }
        }

        return $this;
    }

    public function getCheckoutSessionId(): ?string
    {
        return $this->checkoutSessionId;
    }

    public function setCheckoutSessionId(?string $checkoutSessionId): self
    {
        $this->checkoutSessionId = $checkoutSessionId;

        return $this;
    }

    public function getLastSuccessfulOrder(): ?string
    {
        return $this->lastSuccessfulOrder;
    }

    public function setLastSuccessfulOrder(?string $lastSuccessfulOrder): self
    {
        $this->lastSuccessfulOrder = $lastSuccessfulOrder;

        return $this;
    }

    public function getStripeCustomerId(): ?string
    {
        return $this->stripeCustomerId;
    }

    public function setStripeCustomerId(?string $stripeCustomerId): self
    {
        $this->stripeCustomerId = $stripeCustomerId;

        return $this;
    }

    public function getProfilePicture(): ?string
    {
        return $this->profilePicture;
    }

    public function setProfilePicture(?string $profilePicture): self
    {
        $this->profilePicture = $profilePicture;

        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setRelatedUser($this);
        }

        return $this;
    }

    public function removeOrder(Order $order): self
    {
        if ($this->orders->removeElement($order)) {
            // set the owning side to null (unless already changed)
            if ($order->getRelatedUser() === $this) {
                $order->setRelatedUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, CreateEditorInstance>
     */
    public function getCreateEditorInstances(): Collection
    {
        return $this->createEditorInstances;
    }

    public function addCreateEditorInstance(CreateEditorInstance $createEditorInstance): self
    {
        if (!$this->createEditorInstances->contains($createEditorInstance)) {
            $this->createEditorInstances->add($createEditorInstance);
            $createEditorInstance->setRelatedUser($this);
        }

        return $this;
    }

    public function removeCreateEditorInstance(CreateEditorInstance $createEditorInstance): self
    {
        if ($this->createEditorInstances->removeElement($createEditorInstance)) {
            // set the owning side to null (unless already changed)
            if ($createEditorInstance->getRelatedUser() === $this) {
                $createEditorInstance->setRelatedUser(null);
            }
        }

        return $this;
    }
}
