import React from 'react'
import { Radio } from 'lucide-react'

const Transmitters: React.FC = () => {
  const transmitters = [
    { id: 1, name: 'Transmitter A', status: 'Online', signal: 95 },
    { id: 2, name: 'Transmitter B', status: 'Online', signal: 87 },
    { id: 3, name: 'Transmitter C', status: 'Offline', signal: 0 },
    { id: 4, name: 'Transmitter D', status: 'Online', signal: 92 },
    { id: 5, name: 'Transmitter E', status: 'Online', signal: 78 },
  ]

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Radio className="mr-2" /> Transmitter Status
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Signal Strength</th>
            </tr>
          </thead>
          <tbody>
            {transmitters.map((transmitter) => (
              <tr key={transmitter.id} className="border-b border-gray-800">
                <td className="p-2">{transmitter.id}</td>
                <td className="p-2">{transmitter.name}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${transmitter.status === 'Online' ? 'bg-green-800' : 'bg-red-800'}`}>
                    {transmitter.status}
                  </span>
                </td>
                <td className="p-2">
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${transmitter.signal}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Transmitters