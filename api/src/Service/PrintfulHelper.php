<?php

namespace App\Service;

use Printful\Exceptions\PrintfulException;
use Printful\Exceptions\PrintfulSdkException;
use Printful\PrintfulApiClient;
use Symfony\Component\HttpFoundation\JsonResponse;

class PrintfulHelper extends PrintfulApiClient
{
    public $client;

    public function __construct($printfulSecret)
    {
        $this->client = PrintfulApiClient::createOauthClient($printfulSecret);
    }

    // try {
    //     if ($user->getLastSuccessfulOrder()) {
    //         // $response = $this->clientTest->get('orders', [
    //         //     'id' => $user->getLastSuccessfulOrder()
    //         // ]);
    //         $response = $this->clientTest->get('orders/' . $user->getLastSuccessfulOrder());
    //         return new JsonResponse(json_encode($response), 200, [], true);
    //     }
    // } catch (PrintfulSdkException $e) {
    //     // Handle SDK errors
    //     dump($e);
    //     return new JsonResponse(
    //         json_encode(["message" => $e->getMessage()]),
    //         $e->getCode(),
    //         [],
    //         true
    //     );
    // } catch (PrintfulException $e) {
    //     // Handle API errors
    //     dump($e);
    //     return new JsonResponse(
    //         json_encode(["message" => $e->getMessage()]),
    //         $e->getCode(),
    //         [],
    //         true
    //     );
    // }
    public function wrapper($method, $endpoint, $params = [])
    {
        try {
            $response = $this->client->$method($endpoint, $params);
            return $response;
        } catch (PrintfulSdkException $e) {
            // Handle SDK errors
            return new JsonResponse(
                json_encode(["message" => $e->getMessage()]),
                $e->getCode(),
                [],
                true
            );
        } catch (PrintfulException $e) {
            // Handle API errors
            return new JsonResponse(
                json_encode(["message" => $e->getMessage()]),
                $e->getCode(),
                [],
                true
            );
        }
    }
}
