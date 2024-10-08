import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import VideoBox from '../components/VideoBox'
import AIReport from '../components/AIReport'
import { RootState } from '../store'
import { startFakeServer } from '../fakeServer'

const Dashboard: React.FC = () => {
  const productionData = useSelector((state: RootState) => state.production.data)

  useEffect(() => {
    startFakeServer()
  }, [])

  const createChartOptions = (title: string, data: number[]) => ({
    chart: {
      type: 'line',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '200px',
    },
    title: {
      text: title,
      style: { color: '#00FF00', fontSize: '14px' }
    },
    xAxis: {
      categories: productionData.map(d => new Date(d.createdAt).toLocaleTimeString()),
      labels: { style: { color: '#00FF00', fontSize: '10px' } }
    },
    yAxis: {
      title: { text: null },
      labels: { style: { color: '#00FF00', fontSize: '10px' } }
    },
    series: [{
      name: title,
      data: data,
      color: '#00FF00'
    }],
    legend: { enabled: false },
    credits: { enabled: false },
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    }
  })

  if (productionData.length === 0) {
    return <div className="text-green-400">Loading data...</div>
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4">
        <VideoBox data={productionData[productionData.length - 1]} />
      </div>
      <div className="col-span-3">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('Pellet Size Distribution', productionData.map(d => d.pellet_size_dist))} />
      </div>
      <div className="col-span-3">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('Sphericity', productionData.map(d => d.sphericity))} />
      </div>
      <div className="col-span-3">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('Broken Pellet %', productionData.map(d => d.broken_pellet_percent * 100))} />
      </div>
      <div className="col-span-1 row-span-6">
        <AIReport />
      </div>
      <div className="col-span-3">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('Sponge Iron Size Distribution', productionData.map(d => d.sponge_iron_size_dist))} />
      </div>
      <div className="col-span-3">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('Broken Sponge Iron %', productionData.map(d => d.broken_sponge_iron_percent * 100))} />
      </div>
      <div className="col-span-3">
        <HighchartsReact highcharts={Highcharts} options={createChartOptions('Not Reduced Sponge Iron %', productionData.map(d => d.not_reduced_sponge_iron_percent * 100))} />
      </div>
    </div>
  )
}

export default Dashboard