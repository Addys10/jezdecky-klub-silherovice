import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Stránka',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Název stránky',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní obrázek',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Popis obrázku',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Obsah',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : '',
        media,
      }
    },
  },
})