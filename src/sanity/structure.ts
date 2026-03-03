import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Obsah')
    .items([
      // Singleton — Nastavení webu
      S.listItem()
        .title('Nastavení webu')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // Ostatní typy (bez siteSettings)
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings'
      ),
    ])
