import React from 'react'
import { potato } from '../assets' 
import { Link } from 'react-router-dom'

const Actions = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <header className="w-full bg-lime-600 p-4 fixed top-0 z-10">
        <Link to = "/">
          <div className="flex items-center">
            <img src={potato} alt="Logo" className="w-10 h-10 rounded-full" />
            &nbsp;
            <h1 className="text-white text-xl font-mono">BlightDetect</h1>
          </div>
        </Link>
      </header> 
      <main className="container mx-auto mt-20 px-4">
        <div className="flex justify-between">
          {/* Column for Early Blight */}
          <div className="w-1/2 bg-white shadow p-6 rounded-lg mr-4">
            <h2 className="text-lg font-semibold mb-4">Early Blight</h2>
            <p className="text-gray-700">
              Early blight is a fungal disease that affects the leaves and stems of potato plants.
              It is typically characterized by dark, concentric rings on lower leaves and can lead to
              reduced yield if not managed properly.
            </p>

            <br />
            <br />
            
            <span className='font-bold text-xl'>Management</span> 
            <ol>
                <li>Practice crop rotation and avoid planting potatoes in the same soil consecutively.</li>
                <li>Use resistant potato varieties and ensure proper spacing for good air circulation.</li>
                <li>Apply fungicides as a preventive measure and remove infected plant debris promptly to reduce the spread of the fungus.</li>
            </ol>
          </div>
         
          <div className="w-1/2 bg-white shadow p-6 rounded-lg ml-4">
            <h2 className="text-2xl font-bold mb-4">Late Blight</h2>
            <p className="text-gray-700">
              Late blight is another fungal disease affecting potatoes, caused by the pathogen
              Phytophthora infestans. It manifests as water-soaked lesions on leaves that can quickly
              turn dark and spread, leading to significant crop damage if not controlled early.
              </p>
                <br />
                <br />
                <span className='font-bold text-xl'>Management</span> 
                <br />
              <ol>
                <li>Select resistant varieties.</li>
                <li>Use certified potato seed.</li>
                <li>Destroy cull potatoes.</li>
                <li>Destroy tomato and potato volunteers and susceptible weeds.</li>
            </ol>
            
          </div>
        </div>
      </main>
      </div>
  )
}

export default Actions