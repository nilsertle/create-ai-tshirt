<?php

namespace App\Controller;

use App\Entity\AiImage;
use App\Entity\Cart;
use App\Entity\Order;
use App\Entity\User;
use App\Service\PrintfulHelper;
use App\Service\StripeHelper;
use Doctrine\ORM\EntityManagerInterface;
use Printful\Exceptions\PrintfulException;
use Printful\Exceptions\PrintfulSdkException;
use Printful\PrintfulApiClient;
use Symfony\Contracts\HttpClient\HttpClientInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PrintfulController extends AbstractController
{
    private $printfulHelper;

    public function __construct(PrintfulHelper $pHelper)
    {
        $this->printfulHelper = $pHelper;
    }


    #[Route('/catalog', name: 'app_printful')]
    public function catalog(HttpClientInterface $client): Response
    {
        $response = $client->request(
            'GET',
            'https://api.printful.com/products'
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
        //return $this->json($response);
    }

    #[Route('/catalogProducts/{id}', name: 'catalogProduct')]
    public function fetchProduct(HttpClientInterface $client, $id): Response
    {
        $response = $client->request(
            'GET',
            'https://api.printful.com/products/' . $id
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
        //return $this->json($response);
    }

    #[Route('/printFiles/{id}', name: 'printFiles')]
    public function printFiles(HttpClientInterface $client, $id): Response
    {
        $encoded = base64_encode("Q5CifYu4b0LnxeXJ5MQHiqLF8s3t7LPeLEH8qusQ5");
        $response = $client->request(
            'GET',
            'https://api.printful.com/mockup-generator/printfiles/' . $id,
            [
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ],
            ]
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
        //return $this->json($response);
    }

    #[Route('/mockup-task-generator/{productId}', name: 'mockupTaskGenerator')]
    public function createMockup(HttpClientInterface $client, $productId, EntityManagerInterface $em, Request $request): Response
    {
        // $image = $em->getRepository(AiImage::class)->find($imageId);

        // $imagepath = $this->getParameter("kernel.project_dir") . "/public/images/ai/";
        // $base64_image = base64_encode(file_get_contents($imagepath . $image->getOriginalUrl()));
        // $imageURL = "data:image/jpg;base64," . $base64_image;

        $response = $client->request(
            'POST',
            'https://api.printful.com/mockup-generator/create-task/' . $productId,
            [
                "body" => $request->getContent(),
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ]
            ]
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
    }

    #[Route('/shirt-preview/{taskKey}', name: 'shirtPreview')]
    public function previewShirt(HttpClientInterface $client, $taskKey): Response
    {
        $response = $client->request(
            'GET',
            'https://api.printful.com/mockup-generator/task',
            [
                "query" => ["task_key" => $taskKey],
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ],
            ]
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
        //return $this->json($response);
    }

    #[Route('/mockup-templates/{id}', name: 'mockup-template')]
    public function fetchMockupTemplates(HttpClientInterface $client, $id): Response
    {
        $response = $client->request(
            'GET',
            'https://api.printful.com/mockup-generator/templates/' . $id,
            [
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ],
            ]
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
    }

    #[Route('/create-printful-sync-product', name: 'createPrintfulSyncProduct', methods: ['POST'])]
    public function createPrintfulSyncProduct(HttpClientInterface $client, Request $request)
    {
        $response = $client->request(
            'POST',
            'https://api.printful.com/store/products',
            [
                "body" => $request->getContent(),
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ]
            ]
        );
        if ($response->getStatusCode() == 200) {
            $content = $response->getContent();
            return new JsonResponse($content, 200, [], true);
        } else {
            return new JsonResponse(
                json_encode(["message" => "Something went wrong"]),
                $response->getStatusCode(),
                [],
                true
            );
        }
    }

    #[Route('/sync-product/{id}', name: 'get-sync-product')]
    public function fetchSyncProduct(HttpClientInterface $client, $id): Response
    {
        $response = $client->request(
            'GET',
            'https://api.printful.com/store/products/' . $id,
            [
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ],
            ]
        );
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
    }

    #[Route('/sync-products', name: 'get-sync-products')]
    public function fetchSyncProducts(HttpClientInterface $client): Response
    {
        $response = $client->request(
            'GET',
            'https://api.printful.com/store/products',
            [
                "headers" => [
                    'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
                ],
            ]
        );
        // $content = $this->printfulHelper->wrapper("get", "store/products");
        $content = $response->getContent();
        return new JsonResponse($content, 200, [], true);
    }

    #[Route('/printful-orders', name: 'get-printful-orders', methods: ['GET'])]
    public function fetchPrintfulOrders(HttpClientInterface $client, Request $request, EntityManagerInterface $em): Response
    {
        // $response = $client->request(
        //     'GET',
        //     'https://api.printful.com/orders',
        //     [
        //         "headers" => [
        //             'Authorization' => 'Bearer sxTDa6BtXL5YdUyYtFOqY9iOTv4JpbX1e6miQrjT',
        //         ]
        //     ]
        // );

        // get user with repository and useridentifier from security
        $email = $this->getUser()->getUserIdentifier();
        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        $orders = $em->getRepository(Order::class)->findBy(['relatedUser' => $user]);
        // write all orders ids in an array
        $orderIds = [];
        foreach ($orders as $order) {
            $orderIds[] = $order->getPrintfulOrderId();
        }

        $content = $this->printfulHelper->wrapper("get", "orders");
        $filteredOrders = [];
        foreach ($content as $order) {
            if (in_array($order['id'], $orderIds)) {
                $filteredOrders[] = $order;
            }
        }
        // $content = $response->getContent();
        return new JsonResponse(json_encode($filteredOrders), 200, [], true);
    }

    #[Route('/printful-orders-create/{sessionId}', name: 'create-printful-orders', methods: ['POST'])]
    public function createPrintfulOrder(Request $request, StripeHelper $stripeHelper, $sessionId, EntityManagerInterface $em): Response
    {

        $checkedSession = $stripeHelper->checkCheckoutSession($sessionId);
        $email = $this->getUser()->getUserIdentifier();
        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if ($checkedSession == false) {
            return new JsonResponse(
                json_encode(["message" => "Payment was not successful"]),
                400,
                [],
                true
            );
        }

        // if order is already created, return the order
        if ($user->getLastSuccessfulOrder()) {
            $response = $this->printfulHelper->wrapper("get", 'orders/' . $user->getLastSuccessfulOrder());
            return new JsonResponse(json_encode($response), 200, [], true);
        }

        $user->setCheckoutSessionId($checkedSession->id);
        $em->persist($user);
        $em->flush();

        /**
         * prepare request data for creating an order
         */
        $recipient = [
            'name' => 'John Doe',
            'address1' => '123 Main St',
            'city' => 'San Francisco',
            'state_code' => 'CA',
            'country_code' => 'US',
            'zip' => '94111'
        ];

        $carts = $em->getRepository(Cart::class)->findBy(['relatedUser' => $user->getId()]);

        $items = [];
        foreach ($carts as $item) {
            // get printful product from sync product id (from cart) with printful wrapper
            $printfulProduct = $this->printfulHelper->wrapper("get", "store/products/" . (string) $item->getSyncProductId());
            $printfulVariant = $printfulProduct["sync_variants"][0];
            $items[] = [
                'quantity' => $item->getQuantity(),
                'sync_variant_id' => $printfulVariant["id"]
            ];
        }

        $requestData = [
            'recipient' => $recipient,
            'items' => $items
        ];

        $response = $this->printfulHelper->wrapper("post", "orders", $requestData);
        $user->setLastSuccessfulOrder($response["id"]);
        $em->persist($user);
        $em->flush();

        // create api platform order to store user who created the order and payment_method_id
        $order = new Order();
        $order->setRelatedUser($user);
        $paymentIntent = $stripeHelper->client->paymentIntents->retrieve($checkedSession->payment_intent);
        $paymentMethod = $stripeHelper->client->paymentMethods->retrieve($paymentIntent->payment_method);
        $order->setPaymentMethodId($paymentMethod->id);
        $order->setPrintfulOrderId($response["id"]);
        $em->persist($order);
        $em->flush();

        // delete all cart items
        $cartItems = $em->getRepository(Cart::class)->findBy(['relatedUser' => $user->getId()]);
        foreach ($cartItems as $cartItem) {
            $em->remove($cartItem);
        }
        $em->flush();
        return new JsonResponse(json_encode($response), 200, [], true);
    }

    #[Route('/printful-orders/{id}', name: 'get-printful-order', methods: ['GET'])]
    public function fetchPrintfulOrder(HttpClientInterface $client, Request $request, $id): Response
    {
        $response = $this->printfulHelper->wrapper("get", "orders/" . $id);
        return new JsonResponse(json_encode($response), 200, [], true);
    }
}
