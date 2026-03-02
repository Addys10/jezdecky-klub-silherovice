import { defineArrayMember, defineType } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normální text', value: 'normal' },
        { title: 'Nadpis H2', value: 'h2' },
        { title: 'Nadpis H3', value: 'h3' },
        { title: 'Citát', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Tučné', value: 'strong' },
          { title: 'Kurzíva', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Odkaz',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Popis obrázku',
        },
      ],
    }),
  ],
})