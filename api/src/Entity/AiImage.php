<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\CreateAiImageController;
use App\Controller\GetAiImageCollectionController;
use App\Controller\GetAiImageItemController;
use App\Controller\GetMediaObjectController;
use App\Repository\AiImageRepository;
use App\State\CreateAiImageSaveUrl;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AiImageRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            controller: GetAiImageCollectionController::class,
        ),
        new Post(
            controller: CreateAiImageController::class,
        ),
        new Get(
            controller: GetAiImageItemController::class,
        ),
        new Put()
    ],
    normalizationContext: ['groups' => ['aiImage:read', "aiImages:read"]],
    denormalizationContext: ['groups' => ['aiImage:create']],
    paginationItemsPerPage: 10,
)]
class AiImage
{
    #[Groups(['aiImage:read', 'user:read', "aiImages:read"])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['aiImage:read', 'user:read', 'aiImage:create'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $originalUrl = null;

    #[Groups(['aiImage:read', 'user:read', 'aiImage:create'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $removedBackgroundUrl = null;

    #[Groups(['aiImage:read', 'user:read', 'aiImage:create'])]
    #[ORM\Column(nullable: true)]
    private ?int $size = null;

    #[Groups(['aiImage:read', 'aiImage:create'])]
    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'aiImages', cascade: ["persist"])]
    private Collection $users;

    #[Groups(['aiImage:read', 'user:read', 'aiImage:create', "aiImages:read"])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $prompt = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOriginalUrl(): ?string
    {
        return $this->originalUrl;
    }

    public function setOriginalUrl(string $originalUrl): self
    {
        $this->originalUrl = $originalUrl;

        return $this;
    }

    public function getRemovedBackgroundUrl(): ?string
    {
        return $this->removedBackgroundUrl;
    }

    public function setRemovedBackgroundUrl(?string $removedBackgroundUrl): self
    {
        $this->removedBackgroundUrl = $removedBackgroundUrl;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(?int $size): self
    {
        $this->size = $size;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addAiImage($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            $user->removeAiImage($this);
        }

        return $this;
    }

    public function getPrompt(): ?string
    {
        return $this->prompt;
    }

    public function setPrompt(string $prompt): self
    {
        $this->prompt = $prompt;

        return $this;
    }
}
