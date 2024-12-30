import React, { useEffect, useState } from 'react'

const ModelForm = ({isOpen, onClose, mode, onSubmit, clientData}) => {

  const [rate, setRate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState(false);

  // handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value === 'Active');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientData = { name, email, job, rate: Number(rate), isactive: status}
      await onSubmit(clientData)
    } catch (error) {
      console.error("Error adding client", error);
      
    }
    onClose(e);
  }

  useEffect(() => {
    if (mode === 'edit' && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.status);
    } else {
      // Resets the field if adding a new client
      setName('');
      setEmail('');
      setJob('');
      setRate('');
      setStatus('');
    }
  }, [mode, clientData]);

  return (
    <div>
    {/* Open the modal using document.getElementById('ID').showModal() method */}

    <dialog id="my_modal_1" className="modal" open={isOpen}>
    <div className="modal-box">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Client Details'}</h3>
    
        <div className="modal-action">
        <form method="dialog" onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="Name" className="m-1 input input-bordered w-full" 
                value={name} 
                onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Email" className="m-1 input input-bordered w-full" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder="Job" className="m-1 input input-bordered w-full" 
                value={job} 
                onChange={(e) => setJob(e.target.value)}/>
                <input type="text" placeholder="Rate" className="m-1 input input-bordered w-full" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)}/>
                
                <select value={status ? 'Active' : 'Inactive'} className="m-1 select select-bordered w-full" onChange={handleStatusChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>

            </div>
            {/* if there is a button in form, it will close the modal */}
            <button className="m-1 btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Client'}</button>
        </form>
        </div>
    </div>
    </dialog>
    </div>
  )
}

export default ModelForm