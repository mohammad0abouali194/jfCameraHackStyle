import React from 'react'
import { Video } from 'lucide-react'
import StatusCard from './StatusCard'

interface VideoBoxProps {
  data: {
    pellet_size_dist: number
    sphericity: number
    broken_pellet_percent: number
    sponge_iron_size_dist: number
    broken_sponge_iron_percent: number
    not_reduced_sponge_iron_percent: number
  }
}

const VideoBox: React.FC<VideoBoxProps> = ({ data }) => {
  return (
    <div className="bg-gray-900 bg-opacity-60 p-4 rounded-lg relative">
      <h2 className="text-xl font-bold mb-4 flex items-center justify-center">
        <Video className="mr-2" /> Live Transmitter Feed
      </h2>
      <div className="aspect-w-16 aspect-h-9 relative">
        <iframe
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
        <div className="absolute inset-0 bg-green-500 bg-opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4">
          <StatusCard title="Pellet Size Distribution" value={data.pellet_size_dist} unit="mm" />
          <StatusCard title="Sphericity" value={data.sphericity} />
          <StatusCard title="Broken Pellet %" value={data.broken_pellet_percent * 100} unit="%" />
          <StatusCard title="Sponge Iron Size Distribution" value={data.sponge_iron_size_dist} unit="mm" />
          <StatusCard title="Broken Sponge Iron %" value={data.broken_sponge_iron_percent * 100} unit="%" />
          <StatusCard title="Not Reduced Sponge Iron %" value={data.not_reduced_sponge_iron_percent * 100} unit="%" />
        </div>
      </div>
    </div>
  )
}

export default VideoBox