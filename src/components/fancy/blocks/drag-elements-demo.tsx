import React from 'react'

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
  // 'https://www.sparkmedagency.com/25e42622-449d-4084-a801-cf68a454a599.jpg',
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
  return (
    <div className="w-dvw h-125 relative bg-[#eeeeee] rounded-3xl py-4 overflow-hidden">
      <h1 className="absolute  text-xl md:text-4xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground uppercase w-full">
        all your
        <span className="font-bold text-foreground dark:text-muted">
          {' '}
          memories.{' '}
        </span>
      </h1>
      <DragElements dragMomentum={false} className="p-40">
        {urls.map((url, index) => {
          const rotation = randomInt(-12, 12)
          const width = screenSize.lessThan(`md`)
            ? randomInt(90, 120)
            : randomInt(140, 150)
          const height = screenSize.lessThan(`md`)
            ? randomInt(120, 140)
            : randomInt(170, 180)

          return (
            <div
              key={index}
              className={`flex items-start justify-center bg-white shadow-2xl p-4`}
              style={{
                transform: `rotate(${rotation}deg)`,
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <div
                className={`relative overflow-hidden`}
                style={{
                  width: `${width - 4}px`,
                  height: `${height - 30}px`,
                }}
              >
                <img
                  src={url}
                  alt={`Analog photo ${index + 1}`}
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </DragElements>
    </div>
  )
}

export default DragElementsComponent
