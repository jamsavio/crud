import { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, mode, onSubmit, clientData }) {
    const [rate, setRate] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [status, setStatus] = useState(false);

    const handleStatusChange = (e) => {
        setStatus(e.target.value === 'Active');
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const clientData = {name, email, status, job, rate: Number(rate), isactive: status}
            await onSubmit(clientData);
            onClose(); 
        } catch (err){
            console.error("Error adding client", err);
        }
        onClose();
    }

    useEffect(() => {
        if(mode === 'edit' && clientData){
            setName(clientData.name);
            setEmail(clientData.email);
            setJob(clientData.job);
            setRate(clientData.rate);
            setStatus(clientData.isactive);
        }else{
            setName('');
            setEmail('');
            setJob('');
            setRate('');  
            setStatus(false);
        }
    }, [mode, clientData])

    return (
        <>
            <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>X</button>
                    <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Client' : 'Client Details'}</h3>

                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center my-4 gap-2">
                            Name
                            <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)}/>
                        </label>
                        <label className="input input0bordered flexx items-center my-4 gap-2">
                            Email
                            <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </label>
                        <label className="input input-bordered flex items-center my-4 gap-2">
                            Job
                            <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)}/>
                        </label>

                        <div className="flex mb-4 justify-between">
                            <label className="input input-bordered flex mr-4 items-center gap-2">
                                Rate
                                <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)}/>
                            </label> 

                            <select className="select select-bordered w-full max-w-xs" onChange={(e) => setStatus(e.target.value)}>
                                <option>Inactive</option>
                                <option>Active</option>
                            </select> 
                        </div>

                        <button type="submit" className=" btn btn-success">{mode === 'edit' ? 'Save Changes' : 'Add Client'}</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}