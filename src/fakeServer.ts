import { store, updateProductionData, ProductionData } from './store'
import { socket } from './socket'

const initialData: ProductionData[] = [
  {
    id: 0,
    pellet_size_dist: 0.9,
    sphericity: 0.84,
    broken_pellet_percent: 0.1,
    sponge_iron_size_dist: 9.5,
    broken_sponge_iron_percent: 0.15,
    not_reduced_sponge_iron_percent: 0.1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1,
    pellet_size_dist: 0.75,
    sphericity: 0.81,
    broken_pellet_percent: 0.19,
    sponge_iron_size_dist: 9.1,
    broken_sponge_iron_percent: 0.11,
    not_reduced_sponge_iron_percent: 0.15,
    createdAt: new Date(Date.now() + 5000).toISOString(),
  },
  // ... Add more initial data objects here
]

const generateRandomData = (prevData: ProductionData): ProductionData => {
  const randomChange = (min: number, max: number) => Math.random() * (max - min) + min

  return {
    id: prevData.id + 1,
    pellet_size_dist: Math.max(0, Math.min(2, prevData.pellet_size_dist + randomChange(-0.1, 0.1))),
    sphericity: Math.max(0, Math.min(1, prevData.sphericity + randomChange(-0.05, 0.05))),
    broken_pellet_percent: Math.max(0, Math.min(1, prevData.broken_pellet_percent + randomChange(-0.02, 0.02))),
    sponge_iron_size_dist: Math.max(0, Math.min(15, prevData.sponge_iron_size_dist + randomChange(-0.5, 0.5))),
    broken_sponge_iron_percent: Math.max(0, Math.min(1, prevData.broken_sponge_iron_percent + randomChange(-0.02, 0.02))),
    not_reduced_sponge_iron_percent: Math.max(0, Math.min(1, prevData.not_reduced_sponge_iron_percent + randomChange(-0.02, 0.02))),
    createdAt: new Date().toISOString(),
  }
}

const generateNotification = () => {
  const notifications = [
    "Anomaly detected in production line A",
    "Energy efficiency improved by 5%",
    "Maintenance required for Transmitter #3",
    "Production output exceeded daily target",
    "New AI model deployed for quality control",
  ]
  return notifications[Math.floor(Math.random() * notifications.length)]
}

export const startFakeServer = () => {
  // Initialize with initial data
  initialData.forEach(data => {
    store.dispatch(updateProductionData(data))
  })

  setInterval(() => {
    const currentState = store.getState().production.data
    const newData = generateRandomData(currentState[currentState.length - 1])
    store.dispatch(updateProductionData(newData))
  }, 3000 + Math.random() * 2000) // Random interval between 3 and 5 seconds

  setInterval(() => {
    const notification = generateNotification()
    socket.emit('notification', notification)
  }, 10000)
}