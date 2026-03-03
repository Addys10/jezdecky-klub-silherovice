import { defineArrayMember, defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const horse = defineType({
  name: 'horse',
  title: 'Kůň',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'breed',
      title: 'Plemeno',
      type: 'string',
    }),
    defineField({
      name: 'birthYear',
      title: 'Rok narození',
      type: 'number',
      validation: (rule) => rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'status',
      title: 'Stav',
      type: 'string',
      options: {
        list: [
          { title: 'Aktivní', value: 'active' },
          { title: 'V důchodu', value: 'retired' },
          { title: 'Na prodej', value: 'forSale' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hlavní fotka',
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
      name: 'description',
      title: 'Popis',
      type: 'blockContent',
    }),
    defineField({
      name: 'photos',
      title: 'Fotogalerie',
      type: 'array',
      of: [
        defineArrayMember({
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
      ],
    }),
    defineField({
      name: 'sire',
      title: 'Otec (sire)',
      type: 'string',
    }),
    defineField({
      name: 'dam',
      title: 'Matka (dam)',
      type: 'string',
    }),
    defineField({
      name: 'milestones',
      title: 'Milníky',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Rok', type: 'number' }),
            defineField({ name: 'event', title: 'Událost', type: 'string' }),
          ],
          preview: {
            select: { title: 'year', subtitle: 'event' },
          },
        }),
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Videa (YouTube)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Název', type: 'string' }),
            defineField({
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: (rule) =>
                rule.uri({ scheme: ['https', 'http'] }),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'breed',
      media: 'mainImage',
    },
  },
})