<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\CreateMediaObjectActionController;
use App\Controller\GetMediaObjectController;
use App\Repository\MediaObjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MediaObjectRepository::class)]
#[ApiResource(
    operations: [
        // new Get(
        //     controller: GetMediaObjectController::class,
        //     deserialize: false,
        //     openapiContext: [
        //         'parameters' => [
        //             [
        //                 "in" => "path",
        //                 "name" => "id",
        //                 "type" => "int",
        //                 "required" => true,
        //                 "description" => "media id"
        //             ]
        //         ],
        //     ]
        // ),
        new Get(),
        new Delete(security: "is_granted('ROLE_ADMIN') or object.owner == user"),
        new GetCollection(),
        new Post(controller: CreateMediaObjectActionController::class, deserialize: false, openapiContext: [
            'requestBody' => [
                'content' => [
                    'multipart/form-data' => [
                        'schema' => [
                            'type' => 'object',
                            'properties' => [
                                'file' => [
                                    'type' => 'string',
                                    'format' => 'binary',
                                ],
                                'public' => [
                                    'type' => 'boolean',
                                    'format' => 'binary',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ])
    ],
)]
// #[Vich\Uploadable]
#[ORM\HasLifecycleCallbacks]
class MediaObject
{

    #[ORM\PreUpdate]
    #[ORM\PrePersist]
    public function updateTimestamps(): void
    {
        $now = new \DateTime("now");
        $this->setUpdatedAt($now);
        if ($this->getCreatedAt() === null) {
            $this->setCreatedAt($now);
        }
    }

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['createEditorInstance:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $owner = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private $createdAt = null;

    #[ORM\Column(type: 'datetime', nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private $updatedAt = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private ?string $type = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private ?string $originalFileName = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private ?int $filesize = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private ?bool $public = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private ?string $fileName = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['createEditorInstance:read'])]
    private ?string $objectUrl = null;

    #[ORM\OneToMany(mappedBy: 'image', targetEntity: CreateEditorImages::class)]
    private Collection $createEditorImages;

    public function __construct()
    {
        $this->createEditorImages = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function getOwnerId(): ?string
    {
        if ($this->owner) {
            return $this->owner->getId();
        }
        return null;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getPublic(): ?bool
    {
        return $this->public;
    }

    public function setPublic(?bool $public): self
    {
        $this->public = $public;
        return $this;
    }


    public function getOriginalFileName(): ?string
    {
        return $this->originalFileName;
    }

    public function setOriginalFileName(?string $originalFileName): self
    {

        $this->originalFileName = $originalFileName;
        return $this;
    }

    public function getFilesize(): ?int
    {
        return $this->filesize;
    }

    public function setFilesize(?int $filesize): self
    {
        $this->filesize = $filesize;

        return $this;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(?string $fileName): self
    {
        $this->fileName = $fileName;

        return $this;
    }

    public function getObjectUrl(): ?string
    {
        return $this->objectUrl;
    }

    public function setObjectUrl(?string $objectUrl): self
    {
        $this->objectUrl = $objectUrl;

        return $this;
    }

    /**
     * @return Collection<int, CreateEditorImages>
     */
    public function getCreateEditorImages(): Collection
    {
        return $this->createEditorImages;
    }

    public function addCreateEditorImage(CreateEditorImages $createEditorImage): self
    {
        if (!$this->createEditorImages->contains($createEditorImage)) {
            $this->createEditorImages->add($createEditorImage);
            $createEditorImage->setImage($this);
        }

        return $this;
    }

    public function removeCreateEditorImage(CreateEditorImages $createEditorImage): self
    {
        if ($this->createEditorImages->removeElement($createEditorImage)) {
            // set the owning side to null (unless already changed)
            if ($createEditorImage->getImage() === $this) {
                $createEditorImage->setImage(null);
            }
        }

        return $this;
    }
}
