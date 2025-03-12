import axios from 'axios';
import { useState, useEffect } from 'react';

export default function TableList({ handleOpen, searchTerm }) {
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/clients');
                
                if (response.data && Array.isArray(response.data.rows)) {
                    setTableData(response.data.rows);  
                } else {
                    setTableData([]);  // Fallback in case rows is not an array or doesn't exist
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const filteredData = tableData.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.job.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if(confirmDelete){
            try{
                await axios.delete(`http://localhost:3000/api/clients/${id}`);
                setTableData((prevData) => prevData.filter(client => client.id !== id));
            }catch(err){
                setError(err.message);
            }
        }
    }

    return (
        <>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="overflow-x-auto mt-10">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    {/* ++status rate */}
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job</th>
                    <th>Rate</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>

                
                </tr>
                </thead>
                {/* ++ hover */}
                <tbody className="hover">
                {/* row 1 */}
                    {filteredData.map((client) => (
                        <tr key={client.id} className="hover">
                            <th>{client.id}</th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.job}</td>
                            <td>{client.rate}</td>
                            {/* ++button logic ++rounded-full w-20  */}
                            <td>
                                <button
                                    className={`btn rounded-full w-20 ${client.status ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                                    {client.status ? 'Active' : 'Inactive'}
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-secondary " onClick={() => handleOpen('edit', client)}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
        
                </tbody>
            </table>
            </div>
        </>
    )
}