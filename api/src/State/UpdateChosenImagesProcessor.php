<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\CreateEditorImages;
use Doctrine\ORM\EntityManagerInterface;

class UpdateChosenImagesProcessor implements ProcessorInterface
{
    public function __construct(private ProcessorInterface $persistProcessor, private readonly EntityManagerInterface $em)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $existingImages = $this->em->getRepository(CreateEditorImages::class)->findBy(['createEditorInstance' => $data->getId()]);
        $chosenImages =  $data->getChosenImages();

        foreach ($chosenImages as $chosenImage) {
            $existingImage = null;
            foreach ($existingImages as $image) {
                if ($image->getPosition() === $chosenImage->getPosition()) {
                    $existingImage = $image;
                    break;
                }
            }
            if (!$existingImage) {
                $existingImage = new CreateEditorImages();
                $existingImage->setPosition($chosenImage->getPosition());
                $existingImage->setCreateEditorInstance($data);
                $data->addChosenImage($existingImage);
            }
            $existingImage->setImage($chosenImage->getImage());
        }
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
