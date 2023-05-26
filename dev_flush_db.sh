#!/bin/bash
./dev_clear_cache.sh
docker compose exec php bin/console doctrine:schema:drop --force
docker compose exec php bin/console doctrine:schema:create --no-interaction
docker compose exec -T php bin/console doctrine:fixtures:load --no-interaction
docker compose exec php bin/console lexik:jwt:generate-keypair
