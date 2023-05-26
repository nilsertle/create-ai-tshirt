<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\Review;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        $product = new Product();
        $product->setName('Unisex White T-Shirt');
        $product->setDescription('Unisex WHITE T-Shirt, smooth and comfortable material. 100% cotton.');
        $product->setPrice(30);
        $product->setType('t-shirt');
        $product->setColor('white');
        $product->setProductVariantId(4012);
        $product->setImage('https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvczgwLXBhaS0xNjIwXzYucG5n.png?s=5_YDyiVjrzybyXcDkifaGGQ11QIlcrfAAxBgftMOT7I');

        $manager->persist($product);

        $product = new Product();
        $product->setName('Unisex Black T-Shirt');
        $product->setDescription('Unisex Black T-Shirt, smooth and comfortable material. 100% cotton.');
        $product->setPrice(30);
        $product->setType('t-shirt');
        $product->setColor('black');
        $product->setProductVariantId(4018);
        $product->setImage('https://superzoom.onlinesuperimage.com/fsicache/server?source=/3D%20Images/strauss/88561-1/88_56_139_R001.png&height=600');
        $manager->persist($product);

        $user = new User();
        $user->setEmail('test@gmail.com');
        $user->setRoles(['ROLE_USER']);
        $user->setFirstName('John');
        $user->setLastName('Doe');
        $user->setStripeCustomerId("cus_NiZ3bO2CfkC7KO");
        $user->setAcceptsMarketingLicense(true);
        $password = $this->hasher->hashPassword($user, 'test');
        $user->setPassword($password);
        $manager->persist($user);

        $review = new Review();
        $review->setStars(4);
        $review->setComment('This is a great product!');
        $review->setProduct($product);
        $review->setAuthor($user);
        $manager->persist($review);

        $review = new Review();
        $review->setStars(1);
        $review->setComment('This product sucks. You can do better!');
        $review->setProduct($product);
        $review->setAuthor($user);
        $manager->persist($review);

        $review = new Review();
        $review->setStars(3);
        $review->setComment('Its ok but also not the best!');
        $review->setProduct($product);
        $review->setAuthor($user);
        $manager->persist($review);

        $review = new Review();
        $review->setStars(3);
        $review->setProduct($product);
        $manager->persist($review);


        $manager->flush();
    }
}
