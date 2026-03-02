import { defineQuery } from 'next-sanity'

// Horses
export const horsesQuery = defineQuery(`
  *[_type == "horse"] | order(name asc) {
    _id,
    name,
    slug,
    breed,
    birthYear,
    status,
    mainImage
  }
`)

export const horseBySlugQuery = defineQuery(`
  *[_type == "horse" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    breed,
    birthYear,
    status,
    mainImage,
    description,
    photos,
    videos
  }
`)

export const horsesSlugsQuery = defineQuery(`
  *[_type == "horse" && defined(slug.current)] {
    "slug": slug.current
  }
`)

// Pages
export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body
  }
`)