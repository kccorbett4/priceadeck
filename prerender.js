import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')

async function prerender() {
  const { render, getAllPaths } = await import('./dist/server/entry-server.js')
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')
  const routes = getAllPaths()
  console.log(`Pre-rendering ${routes.length} pages...`)

  for (const url of routes) {
    const { html, helmet } = render(url)
    let page = template

    page = page.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    )

    if (helmet) {
      const titleStr = helmet.title.toString()
      const metaStr = helmet.meta.toString()
      const linkStr = helmet.link.toString()
      const scriptStr = helmet.script.toString()

      if (titleStr || metaStr || linkStr) {
        const seoBlock = [titleStr, metaStr, linkStr].filter(Boolean).join('\n    ')
        page = page.replace(
          /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/,
          seoBlock
        )
      }

      if (scriptStr) {
        page = page.replace(
          /<!--page-schema-start-->[\s\S]*?<!--page-schema-end-->/,
          scriptStr
        )
      } else {
        page = page.replace(
          /<!--page-schema-start-->[\s\S]*?<!--page-schema-end-->/,
          ''
        )
      }
    }

    const filePath = url === '/'
      ? path.resolve(distDir, 'index.html')
      : path.resolve(distDir, `${url.slice(1)}/index.html`)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, page)
  }

  console.log(`Done! ${routes.length} pages pre-rendered.`)
}

prerender().catch(err => {
  console.error('Pre-render failed:', err)
  process.exit(1)
})
