import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { horse } from './horse'
import { page } from './page'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, horse, page, siteSettings],
}
