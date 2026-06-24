export default defineEventHandler(async () => {
  const release = await $fetch('https://api.github.com/repos/lqxp/app/releases/latest', {
    headers: {
      accept: 'application/vnd.github+json'
    }
  })

  return release
})