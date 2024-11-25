import React from 'react'

const Profile = () => {
  return (
    <div className=''>
      
      <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-9 w-10 "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    {/* Outer Circle (Head Shape) */}
    <circle cx="12" cy="8" r="4" fill="#E5E7EB" stroke="#4B5563" />

    {/* Shoulders */}
    <path
      d="M4 19c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1H4v-1z"
      fill="#E5E7EB"
      stroke="#4B5563"
    />
  </svg>
    </div>
  )
}

export default Profile
