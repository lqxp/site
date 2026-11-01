{
set -e
git fetch origin
git reset --hard origin/main
bun install
bun run build
sudo rsync -a --delete .output/public/ /var/www/qxch.at/
exit
}
