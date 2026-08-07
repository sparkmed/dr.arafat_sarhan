/** Every editable string on the landing page exists in both languages. */
export type Localized = { en: string; ar: string }

export type SectionId =
  | 'hero'
  | 'showcase'
  | 'services'
  | 'beforeAfter'
  | 'vibes'
  | 'team'
  | 'findUs'
  | 'reviews'
  | 'footer'

export type HeroContent = {
  enabled: boolean
  title1: Localized
  title2: Localized
  doctorName: Localized
  paragraph1: Localized
  university: Localized
  paragraph1After: Localized
  quote: Localized
  paragraph2: Localized
  badge: Localized
  primaryCta: Localized
  secondaryCta: Localized
  image: string
}

export type ShowcaseImage = { id: string; url: string; alt: string }

export type ShowcaseContent = {
  enabled: boolean
  images: Array<ShowcaseImage>
}

export type ServiceItem = {
  id: string
  image: string
  title: Localized
  details: Localized
}

export type ServicesContent = {
  enabled: boolean
  title: Localized
  subtitle: Localized
  items: Array<ServiceItem>
}

export type BeforeAfterCase = { id: string; before: string; after: string }

export type BeforeAfterContent = {
  enabled: boolean
  title: Localized
  description: Localized
  beforeLabel: Localized
  afterLabel: Localized
  cases: Array<BeforeAfterCase>
}

export type VibesImage = { id: string; url: string }

export type VibesContent = {
  enabled: boolean
  title: Localized
  description: Localized
  instruction: Localized
  overlayPrefix: Localized
  overlayHighlight: Localized
  images: Array<VibesImage>
}

export type TeamMember = {
  id: string
  name: Localized
  photo: string
  speciality: Localized
  experience: Localized
  description: Localized
}

export type TeamContent = {
  enabled: boolean
  badge: Localized
  title: Localized
  description: Localized
  footerText: Localized
  members: Array<TeamMember>
}

export type FindUsContent = {
  enabled: boolean
  title: Localized
  description: Localized
  addReviewLabel: Localized
  reviewUrl: string
  locationTitle: Localized
  address: Localized
  callUsLabel: Localized
  phone: string
  hoursTitle: Localized
  hoursDetail: Localized
  closed: Localized
  mapEmbedUrl: string
  mapUrl: string
  openMapLabel: Localized
}

export type ReviewItem = {
  id: string
  author: string
  role: Localized
  body: Localized
}

export type ReviewsContent = {
  enabled: boolean
  badgeCount: string
  badgeLabel: Localized
  title: Localized
  description: Localized
  items: Array<ReviewItem>
}

export type FooterContent = {
  enabled: boolean
  logoLight: string
  logoDark: string
  description: Localized
  contactTitle: Localized
  followTitle: Localized
  rights: Localized
  phonePrimary: string
  phoneSecondary: string
  email: string
  address: Localized
  addressUrl: string
  instagramUrl: string
  facebookUrl: string
}

export type SiteContent = {
  hero: HeroContent
  showcase: ShowcaseContent
  services: ServicesContent
  beforeAfter: BeforeAfterContent
  vibes: VibesContent
  team: TeamContent
  findUs: FindUsContent
  reviews: ReviewsContent
  footer: FooterContent
}
