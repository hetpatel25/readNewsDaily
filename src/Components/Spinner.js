import React from 'react'
import loading from './loading.gif'

const Spinner = () => {

  return (
    <div>
      <div className="text-center">
        <img src={loading} alt="" style={{ width: '90px' }} />
      </div>
    </div>
  )

}
export default Spinner
