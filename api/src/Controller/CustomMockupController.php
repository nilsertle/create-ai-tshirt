<?php

namespace App\Controller;

use App\Entity\MediaObject;
use App\Service\SpacesHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class CustomMockupController extends AbstractController
{
    #[Route('/create-mockup/{productId}', name: 'createMockup')]
    public function createMockup(HttpClientInterface $client, Request $request, SpacesHelper $spacesHelper, $productId, EntityManagerInterface $em): Response
    {
        $jsonData = json_decode($request->getContent());
        $logoFiles = $jsonData->files;

        $response = $client->request(
            'GET',
            'https://api.printful.com/products/' . $productId
        );
        $content = $response->getContent();
        $content = json_decode($content);
        $productVariants = $content->result->variants;

        $determinedColors = [];
        foreach ($productVariants as $productVariant) {
            $color = strtolower($productVariant->color);
            if (!array_key_exists($color, $determinedColors)) {
                $determinedColors[$color] = [];
            }
            array_push($determinedColors[$color], $productVariant->id);
        }


        // {
        //     "template_id": 12480,
        //     "image_url": "https://files.cdn.printful.com/m/ec1000/medium/onman/front/05_ec1000_onman_front_base_whitebg.png?v=1675420344",
        //     "background_url": null,
        //     "background_color": "#161616",
        //     "printfile_id": 1,
        //     "template_width": 3000,
        //     "template_height": 3000,
        //     "print_area_width": 897,
        //     "print_area_height": 1196,
        //     "print_area_top": 690,
        //     "print_area_left": 1064,
        //     "is_template_on_front": true,
        //     "orientation": "any"
        // }



        // $response = [{
        //     "variant_id": 10291,
        //     "templates": [
        //         {
        //             "placement": "front",
        //             "template_id": 12488
        //         },
        //         {
        //             "placement": "back",
        //             "template_id": 12489
        //         },
        //         {
        //             "placement": "label_inside",
        //             "template_id": 47630
        //         },
        //         {
        //             "placement": "label_outside",
        //             "template_id": 45114
        //         },
        //         {
        //             "placement": "sleeve_left",
        //             "template_id": 12491
        //         },
        //         {
        //             "placement": "sleeve_right",
        //             "template_id": 12493
        //         }
        //     ]
        // },
        // {
        //     "variant_id": 10292,
        //     "templates": [
        //         {
        //             "placement": "front",
        //             "template_id": 12488
        //         },
        //         {
        //             "placement": "back",
        //             "template_id": 12489
        //         },
        //         {
        //             "placement": "label_inside",
        //             "template_id": 47630
        //         },
        //         {
        //             "placement": "label_outside",
        //             "template_id": 45114
        //         },
        //         {
        //             "placement": "sleeve_left",
        //             "template_id": 12491
        //         },
        //         {
        //             "placement": "sleeve_right",
        //             "template_id": 12493
        //         }
        //     ]
        // },]
        $response2 = $client->request(
            'GET',
            'https://api.printful.com/mockup-generator/templates/' . $productId,
            [
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ],
            ]
        );
        // $response2 = $client->request(
        //     'GET',
        //     'https://api.printful.com/products/' . $productId
        // );
        $content2 = $response2->getContent();
        $printfulMockupTemplates = json_decode($content2);




        $mockups = [];
        $mockupColors = array_keys($determinedColors);
        foreach ($logoFiles as $logoFile) {
            $placement = $logoFile->placement;
            $image_url = $logoFile->image_url;
            // $variantIds = $determinedColors[$mockupColor];





            $mockupTemplates = [];
            foreach ($printfulMockupTemplates->result->variant_mapping as $printfulMockupTemplateVariantMappings) {
                foreach ($printfulMockupTemplateVariantMappings->templates as $printfulMockupTemplate) {
                    if ($printfulMockupTemplate->placement == $placement) {
                        $found = false;
                        foreach ($mockupTemplates as &$mockupTemplate) {
                            if ($mockupTemplate["template_id"] == $printfulMockupTemplate->template_id) {
                                $mockupTemplate["variant_ids"][] = $printfulMockupTemplateVariantMappings->variant_id;
                                $found = true;
                                break;
                            }
                        }
                        if (!$found) {
                            $mockupTemplates[] = [
                                "template_id" => $printfulMockupTemplate->template_id,
                                "variant_ids" => [$printfulMockupTemplateVariantMappings->variant_id]
                            ];
                        }
                    }
                }
            }

            // map through all mockup templates
            foreach ($mockupTemplates as $mockupTemplate) {
                $mockupTemplateId = $mockupTemplate["template_id"];
                $mockupTemplateVariantIds = $mockupTemplate["variant_ids"];
                // find the template from the $printfulMockupTemplates->result->templates with the mockupTemplateId
                foreach ($printfulMockupTemplates->result->templates as $printfulMockupTemplate) {
                    if ($printfulMockupTemplate->template_id == $mockupTemplateId) {
                        $productImageUrl = $printfulMockupTemplate->image_url;
                        $productImage = imagecreatefromstring(file_get_contents($productImageUrl));
                        $productImage = imagescale($productImage, $printfulMockupTemplate->template_width, $printfulMockupTemplate->template_height);

                        // ****** logo sizing ******
                        $logo = imagecreatefromstring(file_get_contents($image_url));

                        // resize logo (only 1/4 of the original size)
                        $logo = imagescale($logo, imagesx($logo), imagesy($logo));

                        // Get the dimensions of the t-shirt and the logo
                        // set width of tshirt to 3000px * 3000px

                        // ****** calculate the position and size of the logo ******
                        $logo_width = imagesx($logo);
                        $logo_height = imagesy($logo);

                        // Resize the logo if it doesn't fit inside the designated area
                        if ($logo_width > $printfulMockupTemplate->print_area_width || $logo_height > $printfulMockupTemplate->print_area_height) {
                            $ratio = min($printfulMockupTemplate->print_area_width / $logo_width, $printfulMockupTemplate->print_area_height / $logo_height);
                            $new_width = intval($logo_width * $ratio);
                            $new_height = intval($logo_height * $ratio);
                            $resized_logo = imagecreatetruecolor($new_width, $new_height);
                            imagecopyresampled($resized_logo, $logo, 0, 0, 0, 0, $new_width, $new_height, $logo_width, $logo_height);
                            $logo = $resized_logo;
                            $logo_width = $new_width;
                            $logo_height = $new_height;
                        }

                        // offset position of the logo
                        $logoX = $printfulMockupTemplate->print_area_left;
                        $logoY = $printfulMockupTemplate->print_area_top;

                        // Place the logo on the t-shirt
                        imagecopy($productImage, $logo, $logoX, $logoY, 0, 0, $logo_width, $logo_height);

                        // convert $tshirt into actual file (save in temp folder)
                        $fileFromProductImage = $this->getParameter("kernel.project_dir") . "/public/images/mockups/temp/" . $placement . "-temp.jpeg";
                        imagejpeg($productImage, $fileFromProductImage);

                        $userIdendifierWithoutEnding = explode('@', $this->getUser()->getUserIdentifier())[0];
                        $newFileName = $userIdendifierWithoutEnding . "/" . uniqid() . "." . "jpeg";
                        $result = $spacesHelper->uploadFile('create-image-upload', $fileFromProductImage, $newFileName);

                        // create a media object
                        $mediaObject = new MediaObject();
                        $mediaObject->setPublic(false);
                        $mediaObject->setOwner($this->getUser());
                        $mediaObject->setType("image/jpeg");
                        $mediaObject->setFileName($newFileName);
                        // $mediaObject->setOriginalFileName($jsonData->originalFileName);
                        $mediaObject->setObjectUrl($result['ObjectURL']);

                        $em->persist($mediaObject);
                        $em->flush();

                        // Cleanup
                        imagedestroy($productImage);
                        imagedestroy($logo);
                        // delete temp file
                        unlink($fileFromProductImage);

                        $mockup = [
                            "placement" => $placement,
                            "variant_ids" => $mockupTemplateVariantIds,
                            "mockup_url" => $result['ObjectURL'],
                        ];
                        array_push($mockups, $mockup);
                    }
                }
            }
        }

        $response = new JsonResponse(json_encode($mockups), 200, [], true);
        return $response;
    }
}
