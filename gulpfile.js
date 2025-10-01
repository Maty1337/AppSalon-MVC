import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import { src, dest, watch, series } from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import terser from 'gulp-terser'
import sharp from 'sharp'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

const sass = gulpSass(dartSass)

const paths = {
  scss: 'src/scss/**/*.scss',
  js:   'src/js/**/*.js',
  img:  'src/img/**/*.{png,jpg,jpeg,svg}'
}

// CSS (stream devuelto + plumber + postcss)
export function css() {
  return src(paths.scss, { sourcemaps: true })
    .pipe(plumber({ errorHandler: sass.logError }))
    .pipe(sass.sync({ outputStyle: 'compressed' }))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('public/build/css', { sourcemaps: '.' }))
}

// JS (stream devuelto)
export function js() {
  return src(paths.js)
    .pipe(terser())
    .pipe(dest('public/build/js'))
}

// IMÁGENES (promesa devuelta, espera a sharp)
export async function imagenes() {
  const srcDir = 'src/img'
  const buildDir = 'public/build/img'
  const files = await glob(`${srcDir}/**/*`, { nodir: true })

  await Promise.all(files.map(async (file) => {
    const relativePath = path.relative(srcDir, path.dirname(file))
    const outDir = path.join(buildDir, relativePath)
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

    const base = path.basename(file, path.extname(file))
    const ext  = path.extname(file).toLowerCase()

    if (ext === '.svg') {
      fs.copyFileSync(file, path.join(outDir, `${base}${ext}`))
      return
    }

    const jpgOut  = path.join(outDir, `${base}${ext}`)
    const webpOut = path.join(outDir, `${base}.webp`)
    const avifOut = path.join(outDir, `${base}.avif`)

    const opts = { quality: 80 }
    // procesamos en paralelo y esperamos
    await Promise.all([
      sharp(file).toFormat('jpeg', opts).toFile(jpgOut),
      sharp(file).webp(opts).toFile(webpOut),
      sharp(file).avif().toFile(avifOut),
    ])
  }))
}

// WATCH
export function dev() {
  watch(paths.scss, css)
  watch(paths.js, js)
  watch(paths.img, imagenes)
}

// orden por defecto
export default series(js, css, imagenes, dev)
export const build = series(js, css, imagenes);
