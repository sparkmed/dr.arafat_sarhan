import { emptyLocalized, newId } from '#/lib/site-content'
import type { SectionId } from '#/lib/site-content'

/**
 * Editors are described, not hand-written. Every section below is rendered by
 * `FieldControl`, so adding a field to the content model means adding one line
 * here — the form, dirty tracking, and save flow follow automatically.
 */
export type AdminField =
  | {
      kind: 'switch'
      key: string
      label: string
      description?: string
    }
  | {
      kind: 'text'
      key: string
      label: string
      placeholder?: string
      description?: string
      dir?: 'ltr' | 'rtl'
    }
  | {
      kind: 'url'
      key: string
      label: string
      placeholder?: string
      description?: string
    }
  | {
      kind: 'localized'
      key: string
      label: string
      multiline?: boolean
      description?: string
    }
  | {
      kind: 'image'
      key: string
      label: string
      folder: string
      description?: string
      aspect?: 'square' | 'video' | 'portrait'
    }
  | {
      kind: 'gallery'
      key: string
      label: string
      folder: string
      description?: string
      withAlt?: boolean
    }
  | {
      kind: 'repeater'
      key: string
      label: string
      description?: string
      addLabel: string
      /** Field key whose value labels each collapsed row. */
      titleKey?: string
      createItem: () => Record<string, unknown>
      fields: Array<AdminField>
    }

export type SectionSchema = {
  id: SectionId
  title: string
  description: string
  fields: Array<AdminField>
}

const enabledField = (what: string): AdminField => ({
  kind: 'switch',
  key: 'enabled',
  label: 'Show this section',
  description: `Turn off to hide ${what} from the landing page without deleting anything.`,
})

export const SECTION_SCHEMAS: Array<SectionSchema> = [
  {
    id: 'hero',
    title: 'Hero',
    description:
      'The first thing visitors see: headline, the doctor introduction, and the two call-to-action buttons.',
    fields: [
      enabledField('the hero'),
      { kind: 'image', key: 'image', label: 'Portrait photo', folder: 'hero' },
      { kind: 'localized', key: 'title1', label: 'Headline — first line' },
      { kind: 'localized', key: 'title2', label: 'Headline — second line' },
      { kind: 'localized', key: 'doctorName', label: 'Doctor name' },
      {
        kind: 'localized',
        key: 'paragraph1',
        label: 'Intro paragraph — before the university',
        multiline: true,
        description:
          'Rendered right after the doctor name, ending just before the highlighted university.',
      },
      {
        kind: 'localized',
        key: 'university',
        label: 'University (highlighted)',
      },
      {
        kind: 'localized',
        key: 'paragraph1After',
        label: 'Intro paragraph — after the university',
        multiline: true,
        description: 'Leave empty if the sentence ends at the university.',
      },
      {
        kind: 'localized',
        key: 'quote',
        label: 'Pull quote',
        multiline: true,
        description: 'Shown on large screens only, in quotation marks.',
      },
      {
        kind: 'localized',
        key: 'paragraph2',
        label: 'Closing paragraph',
        multiline: true,
      },
      { kind: 'localized', key: 'badge', label: 'Experience badge' },
      {
        kind: 'localized',
        key: 'primaryCta',
        label: 'Primary button label',
        description: 'Links to the booking page.',
      },
      {
        kind: 'localized',
        key: 'secondaryCta',
        label: 'Secondary button label',
        description: 'Scrolls down to the services section.',
      },
    ],
  },

  {
    id: 'showcase',
    title: 'Phone Showcase',
    description:
      'The rotating iPhone mock-up under the hero. Portrait screenshots work best.',
    fields: [
      enabledField('the phone showcase'),
      {
        kind: 'gallery',
        key: 'images',
        label: 'Screens',
        folder: 'showcase',
        withAlt: true,
        description: 'Shown in order, auto-advancing every 3 seconds.',
      },
    ],
  },

  {
    id: 'services',
    title: 'Services',
    description:
      'The list of treatments. Rows alternate left/right on the landing page automatically.',
    fields: [
      enabledField('the services list'),
      { kind: 'localized', key: 'title', label: 'Section title' },
      {
        kind: 'localized',
        key: 'subtitle',
        label: 'Section subtitle',
        multiline: true,
      },
      {
        kind: 'repeater',
        key: 'items',
        label: 'Treatments',
        addLabel: 'Add treatment',
        titleKey: 'title',
        createItem: () => ({
          id: newId('service'),
          image: '',
          title: emptyLocalized(),
          details: emptyLocalized(),
        }),
        fields: [
          {
            kind: 'image',
            key: 'image',
            label: 'Photo',
            folder: 'services',
            aspect: 'video',
          },
          { kind: 'localized', key: 'title', label: 'Treatment name' },
          {
            kind: 'localized',
            key: 'details',
            label: 'Description',
            multiline: true,
          },
        ],
      },
    ],
  },

  {
    id: 'beforeAfter',
    title: 'Before & After',
    description:
      'Draggable comparison slider. Each case needs a matching pair of photos taken from the same angle.',
    fields: [
      enabledField('the before & after slider'),
      { kind: 'localized', key: 'title', label: 'Section title' },
      {
        kind: 'localized',
        key: 'description',
        label: 'Section description',
        multiline: true,
      },
      { kind: 'localized', key: 'beforeLabel', label: '"Before" chip label' },
      { kind: 'localized', key: 'afterLabel', label: '"After" chip label' },
      {
        kind: 'repeater',
        key: 'cases',
        label: 'Cases',
        addLabel: 'Add case',
        createItem: () => ({ id: newId('case'), before: '', after: '' }),
        fields: [
          {
            kind: 'image',
            key: 'before',
            label: 'Before photo',
            folder: 'cases',
            aspect: 'video',
          },
          {
            kind: 'image',
            key: 'after',
            label: 'After photo',
            folder: 'cases',
            aspect: 'video',
          },
        ],
      },
    ],
  },

  {
    id: 'vibes',
    title: 'Our Vibes',
    description:
      'The scattered, draggable photo pile. Casual clinic and team photos belong here.',
    fields: [
      enabledField('the vibes gallery'),
      { kind: 'localized', key: 'title', label: 'Section title' },
      {
        kind: 'localized',
        key: 'description',
        label: 'Section description',
        multiline: true,
      },
      { kind: 'localized', key: 'instruction', label: 'Drag hint' },
      {
        kind: 'localized',
        key: 'overlayPrefix',
        label: 'Backdrop text — normal weight',
      },
      {
        kind: 'localized',
        key: 'overlayHighlight',
        label: 'Backdrop text — bold',
      },
      {
        kind: 'gallery',
        key: 'images',
        label: 'Photos',
        folder: 'vibes',
        description: 'Scattered at random rotations each time the page loads.',
      },
    ],
  },

  {
    id: 'team',
    title: 'Team',
    description:
      'The doctors behind the clinic. Portrait photos work best — they are cropped to a tall 3:4 frame.',
    fields: [
      enabledField('the team section'),
      { kind: 'localized', key: 'badge', label: 'Badge above the title' },
      { kind: 'localized', key: 'title', label: 'Section title' },
      {
        kind: 'localized',
        key: 'description',
        label: 'Section description',
        multiline: true,
      },
      {
        kind: 'repeater',
        key: 'members',
        label: 'Team members',
        addLabel: 'Add team member',
        titleKey: 'name',
        createItem: () => ({
          id: newId('member'),
          name: emptyLocalized(),
          photo: '',
          speciality: emptyLocalized(),
          experience: emptyLocalized(),
          description: emptyLocalized(),
        }),
        fields: [
          {
            kind: 'image',
            key: 'photo',
            label: 'Portrait photo',
            folder: 'team',
            aspect: 'portrait',
          },
          { kind: 'localized', key: 'name', label: 'Name' },
          { kind: 'localized', key: 'speciality', label: 'Speciality' },
          {
            kind: 'localized',
            key: 'experience',
            label: 'Years of experience',
            description:
              'Shown as a chip on the photo. Keep it short, e.g. "15+ years".',
          },
          {
            kind: 'localized',
            key: 'description',
            label: 'Short bio',
            multiline: true,
            description: 'Revealed over the photo on hover.',
          },
        ],
      },
      {
        kind: 'localized',
        key: 'footerText',
        label: 'Closing line under the grid',
        multiline: true,
      },
    ],
  },

  {
    id: 'findUs',
    title: 'Find Us',
    description:
      'Address, phone, opening hours, and the embedded Google map.',
    fields: [
      enabledField('the find us section'),
      { kind: 'localized', key: 'title', label: 'Section title' },
      {
        kind: 'localized',
        key: 'description',
        label: 'Section description',
        multiline: true,
      },
      { kind: 'localized', key: 'locationTitle', label: 'Location card title' },
      { kind: 'localized', key: 'address', label: 'Address' },
      { kind: 'localized', key: 'callUsLabel', label: 'Phone card title' },
      {
        kind: 'text',
        key: 'phone',
        label: 'Phone number',
        placeholder: '+970 597 55 99 22',
        dir: 'ltr',
        description: 'Shown as written, and used for the tap-to-call link.',
      },
      { kind: 'localized', key: 'hoursTitle', label: 'Opening hours title' },
      { kind: 'localized', key: 'hoursDetail', label: 'Opening hours' },
      { kind: 'localized', key: 'closed', label: 'Closing day note' },
      {
        kind: 'url',
        key: 'mapEmbedUrl',
        label: 'Google Maps embed URL',
        description:
          'From Google Maps → Share → Embed a map → copy the src="..." value.',
      },
      {
        kind: 'url',
        key: 'mapUrl',
        label: 'Google Maps link',
        description: 'Opened by the "Open in Maps" button.',
      },
      { kind: 'localized', key: 'openMapLabel', label: 'Map button label' },
      {
        kind: 'url',
        key: 'reviewUrl',
        label: 'Google review link',
      },
      {
        kind: 'localized',
        key: 'addReviewLabel',
        label: 'Review button label',
      },
    ],
  },

  {
    id: 'reviews',
    title: 'Reviews',
    description: 'Patient testimonials shown in the auto-playing carousel.',
    fields: [
      enabledField('the reviews carousel'),
      { kind: 'localized', key: 'title', label: 'Section title' },
      {
        kind: 'localized',
        key: 'description',
        label: 'Section description',
        multiline: true,
      },
      {
        kind: 'text',
        key: 'badgeCount',
        label: 'Badge count',
        placeholder: '43+',
        dir: 'ltr',
      },
      { kind: 'localized', key: 'badgeLabel', label: 'Badge label' },
      {
        kind: 'repeater',
        key: 'items',
        label: 'Testimonials',
        addLabel: 'Add testimonial',
        titleKey: 'author',
        createItem: () => ({
          id: newId('review'),
          author: '',
          role: emptyLocalized(),
          body: emptyLocalized(),
        }),
        fields: [
          { kind: 'text', key: 'author', label: 'Patient name' },
          {
            kind: 'localized',
            key: 'role',
            label: 'Caption under the name',
          },
          {
            kind: 'localized',
            key: 'body',
            label: 'Review text',
            multiline: true,
          },
        ],
      },
    ],
  },

  {
    id: 'footer',
    title: 'Footer',
    description:
      'Logos, contact details, and social links shown at the bottom of every page.',
    fields: [
      enabledField('the footer'),
      {
        kind: 'image',
        key: 'logoLight',
        label: 'Logo — light mode',
        folder: 'branding',
        aspect: 'video',
      },
      {
        kind: 'image',
        key: 'logoDark',
        label: 'Logo — dark mode',
        folder: 'branding',
        aspect: 'video',
      },
      {
        kind: 'localized',
        key: 'description',
        label: 'Tagline',
        multiline: true,
      },
      { kind: 'localized', key: 'contactTitle', label: 'Contact column title' },
      { kind: 'localized', key: 'followTitle', label: 'Social column title' },
      { kind: 'localized', key: 'rights', label: 'Copyright line' },
      {
        kind: 'text',
        key: 'phonePrimary',
        label: 'Mobile number',
        dir: 'ltr',
      },
      {
        kind: 'text',
        key: 'phoneSecondary',
        label: 'Landline number',
        dir: 'ltr',
      },
      { kind: 'text', key: 'email', label: 'Email address', dir: 'ltr' },
      { kind: 'localized', key: 'address', label: 'Address' },
      { kind: 'url', key: 'addressUrl', label: 'Address link' },
      { kind: 'url', key: 'instagramUrl', label: 'Instagram URL' },
      { kind: 'url', key: 'facebookUrl', label: 'Facebook URL' },
    ],
  },
]
