import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ScientificGroups: CollectionConfig = {
  slug: 'scientific_groups',
  labels: {
    singular: 'Scientific Group',
    plural: 'Scientific Groups',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['orderId', 'name', 'name_short', 'wallpaper', 'logo'],
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
        description: 'Numeric ID matching backend format (e.g. 0, 1, 2)',
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'name_short',
      type: 'text',
    },
    {
      name: 'wallpaper',
      type: 'text',
      admin: {
        description: 'Path in MinIO (e.g. /SG/Thumbnails/GameDev-SG-thumbnail.png)',
      },
    },
    {
      name: 'wallpaperMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or pick media from MinIO. Auto-populates wallpaper path if selected.',
      },
    },
    {
      name: 'logo',
      type: 'text',
      admin: {
        description: 'Path in MinIO (e.g. /SG/logos/GameDev-SG.png)',
      },
    },
    {
      name: 'logoMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload or pick media from MinIO. Auto-populates logo path if selected.',
      },
    },
    {
      name: 'images',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Image paths in MinIO (e.g. /SG/logos/GameDev.png)',
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
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'en',
          type: 'group',
          label: 'English Info',
          fields: [
            {
              name: 'description',
              type: 'textarea',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data.wallpaperMedia) {
          try {
            const mediaId =
              typeof data.wallpaperMedia === 'object' ? data.wallpaperMedia.id : data.wallpaperMedia
            const doc = await req.payload.findByID({ collection: 'media', id: mediaId })
            if (doc?.filename) {
              data.wallpaper = `/${doc.filename}`
            }
          } catch (e) {}
        }
        if (data.logoMedia) {
          try {
            const mediaId =
              typeof data.logoMedia === 'object' ? data.logoMedia.id : data.logoMedia
            const doc = await req.payload.findByID({ collection: 'media', id: mediaId })
            if (doc?.filename) {
              data.logo = `/${doc.filename}`
            }
          } catch (e) {}
        }
        return data
      },
    ],
  },
}
