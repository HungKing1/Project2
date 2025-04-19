import React from 'react'

const Loading = () => {
  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
        <div style={{transform : 'scale(3)'}}>
            <div className="spinner-border" role="status">
            </div>
        </div>
    </div>
  )
}

export default Loading