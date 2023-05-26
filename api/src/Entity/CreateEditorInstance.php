<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CreateEditorInstanceRepository;
use App\State\SetOwnerProcessor;
use App\State\UpdateChosenImagesProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CreateEditorInstanceRepository::class)]
#[ApiResource(
    operations: [
        new Post(processor: SetOwnerProcessor::class),
        new Get(),
        new Put(),
    ],
    normalizationContext: ['groups' => ['createEditorInstance:read']],
    denormalizationContext: ['groups' => ['createEditorInstance:create', 'createEditorInstance:update']],

)]
class CreateEditorInstance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['createEditorInstance:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'createEditorInstances')]
    #[Groups(['createEditorInstance:read'])]
    private ?User $relatedUser = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['createEditorInstance:read', 'createEditorInstance:create', 'createEditorInstance:update'])]
    private ?string $printfulCatalogProductId = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['createEditorInstance:read', 'createEditorInstance:create', 'createEditorInstance:update'])]
    private ?string $selectedPrintfulVariant = null;

    #[ORM\OneToMany(mappedBy: 'createEditorInstance', targetEntity: CreateEditorImages::class)]
    #[Groups(['createEditorInstance:read', 'createEditorInstance:create', 'createEditorInstance:update'])]
    private Collection $chosenImages;

    public function __construct()
    {
        $this->chosenImages = new ArrayCollection();
    }

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

    public function getPrintfulCatalogProductId(): ?string
    {
        return $this->printfulCatalogProductId;
    }

    public function setPrintfulCatalogProductId(string $printfulCatalogProductId): self
    {
        $this->printfulCatalogProductId = $printfulCatalogProductId;

        return $this;
    }

    public function getSelectedPrintfulVariant(): ?string
    {
        return $this->selectedPrintfulVariant;
    }

    public function setSelectedPrintfulVariant(?string $selectedPrintfulVariant): self
    {
        $this->selectedPrintfulVariant = $selectedPrintfulVariant;

        return $this;
    }

    /**
     * @return Collection<int, CreateEditorImages>
     */
    public function getChosenImages(): Collection
    {
        return $this->chosenImages;
    }

    public function addChosenImage(CreateEditorImages $chosenImage): self
    {
        if (!$this->chosenImages->contains($chosenImage)) {
            $this->chosenImages->add($chosenImage);
            $chosenImage->setCreateEditorInstance($this);
        }

        return $this;
    }

    public function removeChosenImage(CreateEditorImages $chosenImage): self
    {
        if ($this->chosenImages->removeElement($chosenImage)) {
            // set the owning side to null (unless already changed)
            if ($chosenImage->getCreateEditorInstance() === $this) {
                $chosenImage->setCreateEditorInstance(null);
            }
        }

        return $this;
    }
}
