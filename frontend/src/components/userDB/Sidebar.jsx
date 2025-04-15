import { FaBoxOpen, FaMoneyBill } from "react-icons/fa";
import { FaCartShopping, FaShop } from 'react-icons/fa6';
import { BsGraphUp } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom'

function SidebarItem({ icon, text, link }) {
    return (
        <Link to={link} className=' text-gray-400 hover:text-gray-300 hover:bg-teal-950 p-3 px-6 active:border-2 hover:shadow-2xl active:border-teal-700 cursor-pointer active:text-teal-50 rounded-r-xl flex gap-3'>
            <span> {icon} </span>
            <span> {text} </span>
        </Link>
    );
}

function Sidebar() {
    const { dbID } = useParams();
    return (
        <>
                <aside className="w-75 h-screen bg-gradient-to-br from-cyan-900 to-teal-800 shadow-xs shadow-blue-900 flex flex-col justify-between">
                    <div className="flex-1">
                        <div className="p-5 flex justify-start gap-5 align-middle active:bg-teal-700 cursor-pointer">
                            <img src="/Logo.png" className=" h-10" />
                            <img src="/LedgerDB.png" className="h-9 mt-1.5" />
                        </div>
                        <ul className="font-thin text-2xl pr-2 flex flex-col gap-1">
                            <SidebarItem icon={<FaBoxOpen className='mt-1' />} text='Products' link={'/db/' + dbID + '/products'} />
                            <SidebarItem icon={<FaMoneyBill className='mt-1.5' />} text='Sales' link={'/db/' + dbID + '/sales'} />
                            <SidebarItem icon={<FaCartShopping className='mt-1' />} text='Purchases' link={'/db/' + dbID + '/purchases'} />
                            <SidebarItem icon={<FaShop className='mt-1' />} text='Branches' link={'/db/' + dbID + '/branches'} />
                            <SidebarItem icon={<BsGraphUp className='mt-1' />} text='Statistics' link={'/db/' + dbID + '/stats'} />
                        </ul>
                    </div>
                    <div className="bg-teal-950 p-3 text-gray-300 flex flex-col gap-2">
                        <p className="text-xl">User Name</p>
                        <p className="text-sm">DB Name | DB Role</p>
                    </div>
                </aside>

        </>
    )
}

export default Sidebar;