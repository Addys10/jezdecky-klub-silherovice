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
    sire,
    dam,
    milestones,
    photos,
    videos
  }
`)

export const horsesSlugsQuery = defineQuery(`
  *[_type == "horse" && defined(slug.current)] {
    "slug": slug.current
  }
`)

export const featuredHorsesQuery = defineQuery(`
  *[_type == "horse" && status == "active"] | order(name asc) [0...3] {
    _id,
    name,
    slug,
    breed,
    mainImage
  }
`)

// Site settings (singleton)
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    address,
    city,
    phone,
    email,
    facebook,
    instagram,
    heroImage
  }
`)

// Gallery — all horses with photos
export const galleryQuery = defineQuery(`
  *[_type == "horse" && defined(photos) && count(photos) > 0] | order(name asc) {
    name,
    "slug": slug.current,
    "photos": photos[] {
      _key,
      alt,
      asset
    }
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