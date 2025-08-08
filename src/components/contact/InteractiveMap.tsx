'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, Phone, ExternalLink, Car, Bus, Train } from 'lucide-react'

const InteractiveMap = () => {
  const [activeTransport, setActiveTransport] = useState('car')

  const campusInfo = {
    name: 'Assam Downtown University',
    address: 'Panikhaiti, Guwahati, Assam 781026, India',
    coordinates: '26.1158,91.7086',
    landmark: 'Near Lokhra Chariali, Opposite to Brahmaputra River'
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

        {/* REAL Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
        >
          {/* Real Interactive Google Map */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px]">
            <iframe
src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.542657!2d91.8614645!3d26.2017968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375af77400000001%3A0xfa44ca580f29ec15!2sAssam%20down%20town%20University!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Assam Downtown University Location"
              className="rounded-2xl"
            />
            
            {/* Overlay Information */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-6 left-6 max-w-sm z-10 rounded-2xl p-6"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-white">Our Location</h4>
                <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available Now
                </div>
              </div>

              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Located in the heart of ADTU campus. Click the map to get directions or use the buttons below.
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <span className="text-xs">{campusInfo.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-xs">Mon-Fri: 9 AM - 6 PM</span>
                </div>
              </div>

              <div className="flex gap-2">
                <motion.a
href={`https://www.google.com/maps/dir/23.8800036,91.3607894/${encodeURIComponent('Assam down town University, Sankar Madhab Path, Gandhi Nagar, Panikhaiti, Guwahati, Assam')}@25.0383443,90.6448208,8z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x375af77400000001:0xfa44ca580f29ec15!2m2!1d91.8614645!2d26.2017968?entry=ttu`}
target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-primary-500 text-white py-2 px-3 rounded-lg font-medium text-xs text-center hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  Directions
                </motion.a>
                <motion.a
                  href="tel:+918765432109"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center text-gray-300 hover:text-white"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Phone className="w-3 h-3" />
                </motion.a>
              </div>
            </motion.div>
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
            <div 
              className="p-2 flex gap-2 rounded-lg flex-wrap justify-center"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {transportOptions.map((option) => (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTransport(option.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeTransport === option.id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
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
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
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
                      <h5 className="text-lg font-semibold text-white mb-4">Quick Actions</h5>
                      <div className="space-y-3">
                        <motion.a
href={`https://www.google.com/maps/dir/23.8800036,91.3607894/${encodeURIComponent('Assam down town University, Sankar Madhab Path, Gandhi Nagar, Panikhaiti, Guwahati, Assam')}?travelmode=${option.id === 'car' ? 'driving' : option.id === 'bus' ? 'transit' : option.id === 'train' ? 'transit' : 'driving'}`}
target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Get Live Directions ({option.title})
                        </motion.a>
                        
                        <motion.a
href={`https://www.google.com/maps/dir/?api=1&origin=23.8800036,91.3607894&destination=${encodeURIComponent('Assam down town University, Sankar Madhab Path, Gandhi Nagar, Panikhaiti, Guwahati, Assam')}`}
target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          View on Google Maps
                        </motion.a>
                      </div>
                      
                      <div className="mt-4 p-3 rounded-lg text-sm text-gray-400"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="w-4 h-4 text-green-500" />
                          <span className="text-gray-300">{option.parking}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Quick Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.a
href={`https://www.google.com/maps/dir/?api=1&origin=23.8800036,91.3607894&destination=${encodeURIComponent('Assam down town University, Sankar Madhab Path, Gandhi Nagar, Panikhaiti, Guwahati, Assam')}`}
target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Navigation className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Get Directions</h4>
              <p className="text-gray-400 text-sm">Live navigation to campus</p>
            </motion.a>

            <motion.a
              href="tel:+918765432109"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Phone className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Call Jack026</h4>
              <p className="text-gray-400 text-sm">Direct line for assistance</p>
            </motion.a>

            <motion.a
              href="https://wa.me/918765432109"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 rounded-xl text-center hover:shadow-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-sm">WA</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">WhatsApp</h4>
              <p className="text-gray-400 text-sm">Quick chat support</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveMap
