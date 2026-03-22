import { defineType } from 'sanity';

export default defineType({
  name: 'specialEvent',
  title: 'Special Event / Banner',
  type: 'document',
  fields: [
    { name: 'title', title: 'Titel', type: 'string', validation: Rule => Rule.required() },
    { name: 'description', title: 'Beschreibung (DE)', type: 'text' },
    { name: 'description_en', title: 'Beschreibung (EN)', type: 'text' },
    { name: 'description_am', title: 'Beschreibung (AM)', type: 'text' },
    { name: 'validFrom', title: 'Gültig ab', type: 'datetime' },
    { name: 'validUntil', title: 'Gültig bis', type: 'datetime' },
    { name: 'image', title: 'Banner Bild', type: 'image', options: { hotspot: true } },
    { name: 'isActive', title: 'Aktiv', type: 'boolean', initialValue: true },
    { name: 'badge', title: 'Badge Text', type: 'string' },
  ],
});
