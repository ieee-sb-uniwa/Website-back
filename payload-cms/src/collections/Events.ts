import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'thumbnail',
    defaultColumns: ['orderId', 'thumbnail', 'date'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'orderId',
      type: 'number',
      label: 'ID (Backend id field)',
      admin: {
        description: 'Numeric ID matching backend format (e.g. 0, 1, 22)',
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            return data?.id ?? data?.orderId
          },
        ],
        beforeChange: [
          ({ value, data }) => {
            if (value !== undefined && data) {
              data.id = value
            }
            return value
          },
        ],
      },
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'Start Date (ISO format, e.g. 2026-04-24T15:30:00)',
    },
    {
      name: 'end_date',
      type: 'text',
      label: 'End Date (ISO format, e.g. 2026-04-25T18:00:00)',
    },
    {
      name: 'registration_deadline',
      type: 'text',
      label: 'Registration Deadline',
    },
    {
      name: 'registration_form',
      type: 'text',
      label: 'Registration Form URL',
    },
    {
      name: 'thumbnail',
      type: 'text',
      required: true,
      admin: {
        description: 'Thumbnail path in MinIO (e.g. /events/shaping-ai-and-metaverse.jpg)',
      },
    },
    {
      name: 'thumbnailMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or pick media from MinIO. Auto-populates thumbnail path.',
      },
    },
    {
      name: 'images',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Image paths in MinIO (e.g. /events/shaping-ai-and-metaverse.jpg)',
      },
    },
    {
      name: 'info',
      type: 'group',
      fields: [
        {
          name: 'gr',
          type: 'group',
          label: 'Greek Info',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'keywords', type: 'text', hasMany: true },
            {
              name: 'links',
              type: 'json',
              label: 'Links JSON (e.g. [{ "id": 0, "title": "...", "url": "..." }])',
            },
          ],
        },
        {
          name: 'en',
          type: 'group',
          label: 'English Info',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'keywords', type: 'text', hasMany: true },
            {
              name: 'links',
              type: 'json',
              label: 'Links JSON (e.g. [{ "id": 0, "title": "...", "url": "..." }])',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.thumbnailMedia) {
          try {
            const mediaId =
              typeof data.thumbnailMedia === 'object' ? data.thumbnailMedia.id : data.thumbnailMedia
            const doc = await req.payload.findByID({ collection: 'media', id: mediaId })
            if (doc?.filename) {
              data.thumbnail = `/${doc.filename}`
            }
          } catch (e) {}
        }
        return data
      },
    ],
  },
}
