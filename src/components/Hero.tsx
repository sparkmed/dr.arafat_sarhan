import { Button } from "./ui/button"
import { Highlighter } from "./ui/highlighter"
import { PixelImage } from "./ui/pixel-image"

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 bg-card border-border border-[1px] rounded-[2rem] shadow-sm gap-12">
      {/* Text Side */}
      <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 gap-y-6">
        <h1 className="display-title text-4xl lg:text-6xl text-center lg:text-start leading-tight">
          <Highlighter action="underline" color="#FF9800">
            Your Perfect Smile
          </Highlighter>{' '}
          <br /> <span className="text-primary">Starts Here</span>
        </h1>
        <p className="text-center lg:text-start text-lg text-foreground max-w-xl leading-relaxed">
          <Highlighter action="highlight" color="#FF9800">
            <span className="text-2xl gap-x-2">Dr. Arafat Sarhan</span>
          </Highlighter>{' '}
          is a dedicated dental professional committed to delivering
          high-quality care with precision and compassion.
        </p>

        {/* Modern Badge for Experience */}
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          20+ Years of Expert Dental Experience
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" className="rounded-full px-8">
            Book Appointment
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Our Services
          </Button>
        </div>
      </div>

      {/* Image Side */}
      <div className=" ">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-0 hover:rotate-1 transition-transform duration-200">
          <PixelImage
            customGrid={{ rows: 3, cols: 3 }}
            src="https://marvelous-fish-345.convex.cloud/api/storage/ebfeb54d-4bf5-4df1-abbe-59562bd2f2a4"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
