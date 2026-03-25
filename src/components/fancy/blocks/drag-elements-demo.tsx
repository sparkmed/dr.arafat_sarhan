import React, { useMemo, useState } from 'react'
import DragElements from '@/components/fancy/blocks/drag-elements'
import useScreenSize from '#/hooks/use-screen-size'

const urls = [
  'https://www.sparkmedagency.com/9f2efc13-0555-4a6f-823f-7fc442c71aa6.jpg',
  'https://www.sparkmedagency.com/85f77785-2e5c-46d3-96ef-9f1f4d1b3b06.jpg',
  'https://www.sparkmedagency.com/3fcc0bed-ea89-43cb-aee1-71a403adca45.jpg',
  'https://www.sparkmedagency.com/4252a188-646e-48fa-b92d-6acf5d4f2267.jpg',
  'https://www.sparkmedagency.com/529779cd-7345-436b-b199-3a99c027c428.jpg',
  'https://www.sparkmedagency.com/55b7ee57-52a5-47aa-8e68-7a5cdafdb920.jpg',
  'https://www.sparkmedagency.com/6f9b4ad9-2692-4c72-a7cc-bb2600ade203.jpg',
  'https://www.sparkmedagency.com/81a2ab2d-dcb5-4afe-a5a6-d6ab1d0a78ad.jpg',
  'https://www.sparkmedagency.com/a47a25e5-b517-40e4-94ec-3e585ea6b24b.jpg',
  'https://www.sparkmedagency.com/af73ef5d-ed12-4f01-9c4e-7f545d371d19.jpg',
  'https://www.sparkmedagency.com/d9bbe98a-c7e9-46fe-be5c-ab5cda2aef83.jpg',
  'https://www.sparkmedagency.com/e8c16b4b-fb9c-46fc-8220-5771d3106e19.jpg',
  'https://www.sparkmedagency.com/ee6adc4a-e055-44f2-9627-53511f11bb25.jpg'
]

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const DragElementsComponent: React.FC = () => {
  const screenSize = useScreenSize()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // 2. Lock the random values so they don't change on every mouse move
  const photoSettings = useMemo(() => {
    return urls.map(() => ({
      rotation: randomInt(-12, 12),
      widthDesktop: randomInt(140, 150),
      heightDesktop: randomInt(170, 180),
      widthMobile: randomInt(90, 120),
      heightMobile: randomInt(120, 140),
    }))
  }, []) // Empty dependency array means this only runs ONCE on mount

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div 
      className="w-dvw h-125 relative bg-[#eeeeee] rounded-3xl py-4 overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{ cursor: isHovering ? 'none' : 'auto' }}
    >
      {/* Custom Cursor Text */}
      {isHovering && (
        <div 
          className="pointer-events-none absolute z-[100] px-4 py-2 bg-[#db7a5f] text-white text-sm font-bold rounded-full shadow-xl"
          style={{ 
            left: mousePos.x, 
            top: mousePos.y,
            transform: 'translate(10px, 10px)', // Offset so it doesn't sit exactly under the pointer
            willChange: 'transform' // Optimization for smooth movement
          }}
        >
          Drag me! 📸
        </div>
      )}

      <h1 className="absolute text-xl md:text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground uppercase w-full pointer-events-none select-none">
        all your <span className="font-bold text-foreground">memories.</span>
      </h1>

      <DragElements dragMomentum={false} className="p-40">
        {urls.map((url, index) => {
          const settings = photoSettings[index]
          const isMobile = screenSize.lessThan('md')
          
          const width = isMobile ? settings.widthMobile : settings.widthDesktop
          const height = isMobile ? settings.heightMobile : settings.heightDesktop

          return (
            <div
              key={index}
              className="flex items-start justify-center bg-white shadow-2xl p-4 hover:scale-105 transition-transform duration-200"
              style={{
                transform: `rotate(${settings.rotation}deg)`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <div className="relative overflow-hidden pointer-events-none" style={{ width: `${width - 4}px`, height: `${height - 30}px` }}>
                <img src={url} alt="" className="object-cover w-full h-full" draggable={false} />
              </div>
            </div>
          )
        })}
      </DragElements>
    </div>
  )
}

export default DragElementsComponent