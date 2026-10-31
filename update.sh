git pull
bun install
bun run build
sudo rsync -a --delete .output/public/ /var/www/qxch.at/
