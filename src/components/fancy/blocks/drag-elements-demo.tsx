import React from 'react'

import DragElements from '@/components/fancy/blocks/drag-elements'
import useScreenSize from '#/hooks/use-screen-size'

const urls = [
  'https://media.discordapp.net/attachments/1239894547761467424/1479667947785162954/529779cd-7345-436b-b199-3a99c027c428.jpg?ex=69acdfa9&is=69ab8e29&hm=bf9f9c60e1086b551a9511a374a5905f081a045c569dc0bbac68976320e3d58a&=&format=webp&width=408&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479667946920874084/d9bbe98a-c7e9-46fe-be5c-ab5cda2aef83.jpg?ex=69acdfa9&is=69ab8e29&hm=b7716cab98cb17ba2850356620083d36af7c57b9560dd6aa5801da207c5a17a4&=&format=webp&width=335&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479667946564620419/af73ef5d-ed12-4f01-9c4e-7f545d371d19.jpg?ex=69acdfa9&is=69ab8e29&hm=9774f810cdc60eb62eca527412478333fbb75cc700a8571816ee05433b9ba63b&=&format=webp&width=427&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479667946174546103/81a2ab2d-dcb5-4afe-a5a6-d6ab1d0a78ad.jpg?ex=69acdfa9&is=69ab8e29&hm=6391b074f3cf039b4838d1749f196611a47bd9b6c8838fa6f730ebe5115e3a74&=&format=webp&width=299&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479667945880686666/9f2efc13-0555-4a6f-823f-7fc442c71aa6.jpg?ex=69acdfa9&is=69ab8e29&hm=aca6da4e8de8385e0c95707ee19606f91d0dea76c93d34bbd8e894cd352f6222&=&format=webp&width=300&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479667945574764736/3fcc0bed-ea89-43cb-aee1-71a403adca45.jpg?ex=69acdfa9&is=69ab8e29&hm=a6d7fe0c87e2b23b4dc023e30c5e419f0971d19a5f45f6ea32801d3d497a4020&=&format=webp&width=251&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479669679478804620/55b7ee57-52a5-47aa-8e68-7a5cdafdb920.jpg?ex=69ace146&is=69ab8fc6&hm=d7d6d89ec0c2fee97818ead6c3ae59a0efbcd1757ce72f8a1c6dc8e4651f246d&=&format=webp&width=299&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479669679030272181/85f77785-2e5c-46d3-96ef-9f1f4d1b3b06.jpg?ex=69ace146&is=69ab8fc6&hm=8a9af35095bfa2fcbc1896af538b40340cb4060e9e72158a2aac2b1c5328a2c8&=&format=webp&width=311&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479669678610579487/6f9b4ad9-2692-4c72-a7cc-bb2600ade203.jpg?ex=69ace146&is=69ab8fc6&hm=2e75c20e120dc392f851ab9415595b85650b8265ec790b31cb85f810f4c9f3fb&=&format=webp&width=311&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479669678270972004/ee6adc4a-e055-44f2-9627-53511f11bb25.jpg?ex=69ace146&is=69ab8fc6&hm=960343496f32449faa1b8b15584d320da8bd861a9917662f81442977c566994f&=&format=webp&width=311&height=544',
  'https://media.discordapp.net/attachments/1239894547761467424/1479670046115762306/e8c16b4b-fb9c-46fc-8220-5771d3106e19.jpg?ex=69ace19d&is=69ab901d&hm=8de4dd382682d898b0b5ae15b30bad1c9ff5853084a9444151680c01632cd2a0&=&format=webp&width=371&height=648',
  'https://media.discordapp.net/attachments/1239894547761467424/1479671668900364475/4252a188-646e-48fa-b92d-6acf5d4f2267.jpg?ex=69ace320&is=69ab91a0&hm=92a0a4d12777541e6426f45683b15a1ffbffb9b348159e3da80319ec467d7303&=&format=webp&width=376&height=648',
  'https://media.discordapp.net/attachments/1239894547761467424/1479671653645680783/a47a25e5-b517-40e4-94ec-3e585ea6b24b.jpg?ex=69ace31d&is=69ab919d&hm=a6880ac3f256103115cff771e00cacfecd87137008db56acba70942775cd6e54&=&format=webp&width=372&height=648'
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
