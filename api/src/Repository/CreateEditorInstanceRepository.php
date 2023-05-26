<?php

namespace App\Repository;

use App\Entity\CreateEditorInstance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CreateEditorInstance>
 *
 * @method CreateEditorInstance|null find($id, $lockMode = null, $lockVersion = null)
 * @method CreateEditorInstance|null findOneBy(array $criteria, array $orderBy = null)
 * @method CreateEditorInstance[]    findAll()
 * @method CreateEditorInstance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CreateEditorInstanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CreateEditorInstance::class);
    }

    public function save(CreateEditorInstance $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CreateEditorInstance $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return CreateEditorInstance[] Returns an array of CreateEditorInstance objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CreateEditorInstance
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
