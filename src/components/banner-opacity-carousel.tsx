import EmblaOpacity from '@/components/ui/Carousel/embla-opacity/embla-opacity'

const SLIDES = [
  'https://marvelous-fish-345.convex.cloud/api/storage/94f09924-9350-44a9-b14c-2924d9b51552',
//   "https://marvelous-fish-345.convex.cloud/api/storage/735b6886-85d5-443f-a539-1bbb5bb9131b",
  'https://marvelous-fish-345.convex.cloud/api/storage/192f89f5-63e9-4ea1-83a2-e8e7e6ea4890',
  "https://marvelous-fish-345.convex.cloud/api/storage/0b1559c9-5837-4dac-8e2c-a6a99cc3c442",
  'https://marvelous-fish-345.convex.cloud/api/storage/e2c429cd-5f26-4449-a9c5-903f0cf9360c',
  "https://marvelous-fish-345.convex.cloud/api/storage/9ea2df59-5186-4271-9ba5-1993ca7b887f",
  'https://marvelous-fish-345.convex.cloud/api/storage/ff9f8256-1df0-4eac-b00a-320796900c88',
  'https://marvelous-fish-345.convex.cloud/api/storage/238fa123-0e4e-4e9c-bd3b-a5e87c7a1627',
]
const BannerOpacityCarousel = () => {
  return (
    <EmblaOpacity
      disabledControls={SLIDES.length <= 1}
      options={{ loop: true, watchDrag: SLIDES.length > 1 }}
    >
      {(SLIDES.length <= 2
        ? [...SLIDES, ...SLIDES, ...SLIDES].slice(0, 3) // repeat slides to create a loop of 3
        : SLIDES
      ).map((slide, index) => (
        <a
          href="#"
          key={index}
          className="shrink-0 grow-0 basis-3/4 min-w-0 pl-4"
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="block border-r-4 w-full aspect-[4/2] object-cover"
          />
        </a>
      ))}
    </EmblaOpacity>
  )
}
export default BannerOpacityCarousel
