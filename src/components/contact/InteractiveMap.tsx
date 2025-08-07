'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, Phone, ExternalLink, Car, Bus, Train } from 'lucide-react'

const InteractiveMap = () => {
  const [activeTransport, setActiveTransport] = useState('car')

  const campusInfo = {
    name: 'Assam Downtown University',
    address: 'Panikhaiti, Guwahati, Assam 781026',
    coordinates: '26.1158° N, 91.7086° E',
    landmark: 'Near Lokhra Chariali, Opposite to Brahmaputra River'
  }

  const officeDetails = {
    location: 'Computer Science Department',
    room: 'Room CS-201, 2nd Floor',
    building: 'Academic Block A',
    hours: 'Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM'
  }

  const transportOptions = [
    {
      id: 'car',
      icon: Car,
      title: 'By Car',
      duration: '45 mins from city center',
      instructions: [
        'Take NH-27 from Guwahati city center',
        'Head towards Lokhra via GS Road',
        'Turn right at Lokhra Chariali',
        'ADTU campus will be on your left'
      ],
      parking: 'Free parking available on campus'
    },
    {
      id: 'bus',
      icon: Bus,
      title: 'By Bus',
      duration: '1 hour from Paltan Bazaar',
      instructions: [
        'Take city bus to Lokhra from Paltan Bazaar',
        'Get off at Lokhra Chariali stop',
        'Walk 200m towards ADTU main gate',
        'Take campus shuttle to CS Department'
      ],
      parking: 'Bus stop right outside campus'
    },
    {
      id: 'train',
      icon: Train,
      title: 'By Train',
      duration: '1.5 hours total journey',
      instructions: [
        'Take train to Guwahati Railway Station',
        'Take auto-rickshaw to Lokhra (₹150-200)',
        'Or take bus from station to Lokhra',
        'Campus is 2 minutes walk from Lokhra Chariali'
      ],
      parking: 'Railway station parking available'
    }
  ]

  const quickDirections = [
    { step: 1, title: 'Enter Campus', description: 'Show ID at main gate security' },
    { step: 2, title: 'Find Block A', description: 'Academic Block A is the main building' },
    { step: 3, title: 'Go to 2nd Floor', description: 'Take elevator or stairs to 2nd floor' },
    { step: 4, title: 'Room CS-201', description: 'Jack026\'s office - last room on the right' }
  ]

  return (
    <section className="py-20 bg-bg-tertiary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
            Find Us on <span className="text-gradient">Campus</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visit <span className="text-primary-400 font-semibold">Jack026</span> and our team 
            at Assam Downtown University
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
        >
          {/* Map Placeholder - In a real app, this would be an actual map */}
          <div className="relative h-96 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cpath d="M0,0 L50,50 L100,0 L100,100 L0,100 Z" fill="%23ffffff" opacity="0.1"/%3E%3C/svg%3E')] bg-repeat opacity-30" />
            </div>
            
            {/* Map Overlay with Campus Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-6 left-6 bg-glass backdrop-blur-xl border border-white/15 rounded-2xl p-8 max-w-md z-10"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-white font-display">Our Location</h4>
                <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Jack026 Available Now
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                We're located in the heart of ADTU campus. Come visit us for face-to-face 
                discussions, project collaboration, or just to say hi!
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span>{campusInfo.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>{officeDetails.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>+91 87654 32109 (Jack026 Direct)</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.a
                  href={`https://maps.google.com/?q=${encodeURIComponent(campusInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold text-center hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </motion.a>
                <motion.a
                  href="tel:+918765432109"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-glass-strong border border-white/10 text-gray-300 rounded-lg hover:bg-glass hover:text-white hover:border-primary-500 transition-all duration-300 flex items-center justify-center"
                >
                  <Phone className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* Interactive Map Marker */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <motion.div
                  className="absolute inset-0 w-12 h-12 bg-red-500 rounded-full opacity-30"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* Campus Boundary Indicator */}
            <div className="absolute bottom-6 right-6 bg-glass backdrop-blur-xl border border-white/15 rounded-lg p-4">
              <div className="text-xs text-gray-400 mb-1">Campus Coordinates</div>
              <div className="text-sm font-mono text-white">{campusInfo.coordinates}</div>
            </div>
          </div>
        </motion.div>

        {/* Transportation Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center font-display">
            How to Reach Us
          </h3>

          {/* Transport Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-glass border border-white/10 rounded-lg p-2 flex gap-2">
              {transportOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTransport(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTransport === option.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-glass-strong'
                  }`}
                >
                  <option.icon className="w-4 h-4" />
                  {option.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Transport Content */}
          <motion.div
            key={activeTransport}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            {transportOptions.map((option) => {
              if (option.id !== activeTransport) return null
              
              return (
                <div key={option.id}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white font-display">{option.title}</h4>
                      <p className="text-primary-400 font-semibold">{option.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-4">Step-by-Step Directions</h5>
                      <ol className="space-y-3">
                        {option.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-300">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-white mb-4">Additional Info</h5>
                      <div className="bg-glass-strong border border-white/10 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Car className="w-5 h-5 text-green-500" />
                          <span className="text-gray-300">{option.parking}</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                          Estimated cost varies by transport mode. Contact Jack026 for specific guidance.
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Get Live Directions
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Campus Navigation Helper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-10"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center font-display">
            Finding Jack026's Office
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickDirections.map((direction, index) => (
              <motion.div
                key={direction.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-6 bg-glass-light border border-white/5 rounded-xl hover:bg-glass-strong transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold text-white">
                  {direction.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 font-display">
                  {direction.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {direction.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-300 mb-4">
              Lost on campus? Call <span className="text-primary-400 font-semibold">Jack026</span> directly!
            </p>
            <motion.a
              href="tel:+918765432109"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              Call for Campus Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveMap
