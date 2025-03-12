export default function NavBar({ onOpen, onSearch }) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">ClientManager</a>
                </div>
                <div className="navbar-center">
                    <div className="form-control">
                        <input type="text" placeholder="Search" onChange={handleSearchChange} className=" input input-bordered w-48 md:w-auto" />
                    </div>
                </div>
                <div className="navbar-end">
                    <a onClick={onOpen} className="btn btn-primary">Add Client</a>
                </div>
            </div>
        </>
    )
}