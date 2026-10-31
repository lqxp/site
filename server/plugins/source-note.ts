const note = `<!--
  Hello, source reader.
  This page loads nothing from other hosts: fonts, icons and scripts are ours.
  The code is MIT licensed: https://github.com/lqxp/site
  Animated emoji: Google Noto Emoji Animation, CC BY 4.0.
  There are a few things hidden on this site.
-->`

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head.unshift(note)
  })
})
