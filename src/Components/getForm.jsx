import React from 'react'

function getForm() {
  return (
    <div>
        <h2 className='h2-tag'>Form Submissions</h2>
      {/* <ul>
        {formList.map((form) => (
           <div key={form.timestamp} className="form-submission">
           <div>
             <span className="form-submission-data">Name- {form.name}</span>
             <span className="form-submission-data">Email- {form.email}</span>
             <span className="form-submission-data">
               Mobile- {form.mobile}
             </span>
           </div>
           <button
             className="delete-btn"
             onClick={() => handleDelete(form.timestamp)}
           >
             <MdDelete />
           </button>
         </div>
        ))}
      </ul> */}
    </div>
  )
}

export default getForm