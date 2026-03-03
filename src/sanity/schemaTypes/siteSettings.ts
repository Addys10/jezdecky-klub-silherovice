import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'address',
      title: 'Ulice a číslo popisné',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Město a PSČ',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero obrázek (úvodní stránka)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Popis obrázku' }),
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Provozní doba',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'days', title: 'Dny', type: 'string' }),
            defineField({ name: 'hours', title: 'Hodiny', type: 'string' }),
          ],
          preview: {
            select: { title: 'days', subtitle: 'hours' },
          },
        }),
      ],
    }),
  ],
  // Singleton — prevent creating multiple documents
  // @ts-ignore
  __experimental_actions: ['update', 'publish'],
})
