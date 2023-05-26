<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CreateEditorImagesRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CreateEditorImagesRepository::class)]
#[ApiResource(
    // allowed operations
    operations: [
        new Post(),
        new Get(),
        new Put(),
        new GetCollection(),
    ],
    // read access
    normalizationContext: ['groups' => ['createEditorImages:read']],
    // write access
    denormalizationContext: ['groups' => ['createEditorImages:create', 'createEditorImages:update']],
)]
class CreateEditorImages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['createEditorInstance:read', 'createEditorImages:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['createEditorInstance:read', 'createEditorImages:create', 'createEditorImages:update', 'createEditorImages:read'])]
    private ?string $position = null;

    #[ORM\ManyToOne(inversedBy: 'createEditorImages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['createEditorInstance:read', 'createEditorImages:create', 'createEditorImages:update', 'createEditorImages:read'])]
    private ?MediaObject $image = null;

    #[ORM\ManyToOne(inversedBy: 'chosenImages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['createEditorImages:read', 'createEditorImages:create', 'createEditorImages:update'])]
    private ?CreateEditorInstance $createEditorInstance = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    public function setImage(?MediaObject $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getCreateEditorInstance(): ?CreateEditorInstance
    {
        return $this->createEditorInstance;
    }

    public function setCreateEditorInstance(?CreateEditorInstance $createEditorInstance): self
    {
        $this->createEditorInstance = $createEditorInstance;

        return $this;
    }
}
