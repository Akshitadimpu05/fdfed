import React from 'react';
import { FaHome } from 'react-icons/fa';
import { AiFillProfile } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toTitleCase } from '../utils/Roomutils';

function LeftSideDash({ roomData }) {
  const sideDashstatus = useSelector((state) => state.sideDash.collapsed);
  const { username } = useSelector((state) => state.user.userDetails);

  return (
    <div
      className={`fixed left-0 h-[calc(100vh-72px)] bottom-0 overflow-x-hidden overflow-y-auto flex flex-col items-start justify-between border-style border-r-[0.8px] ${
        !sideDashstatus ? 'w-64' : 'w-fit'
      }`}
    >
      <div className="p-4 w-full text-base flex flex-col gap-2 items-start justify-between border-b-[0.8px] pt-7 pl-7">
        <Link to="/" className="w-full">
          <div className="flex w-[90%] rounded-b-lg rounded-r-md hover:bg-slate-100 py-2 pl-2">
            <span className="pr-5">
              <FaHome size={23} />
            </span>
            {!sideDashstatus && <span>Home</span>}
          </div>
        </Link>

        <Link to={`/profile/${username}`} className="w-full">
          <div className="flex w-[90%] rounded-b-lg rounded-r-md hover:bg-slate-100 py-2 pl-2">
            <span className="pr-5">
              <AiFillProfile size={23} />
            </span>
            {!sideDashstatus && <span>Profile</span>}
          </div>
        </Link>
      </div>

      {!sideDashstatus && (
        <div className="flex flex-col overflow-x-clip space-y-3 p-3 w-full text-sm">
          <Link to="/my-rooms" className="w-full">
            <div className="flex w-[90%] rounded-b-lg rounded-r-md hover:bg-slate-100 py-2 pl-2">
              <span className="pr-5">
                <FaHome size={23} />
              </span>
              <span>My Rooms</span>
            </div>
          </Link>

          {roomData.map((ele, index) => (
            <Link key={index} to={`/room/${ele.apartment_id}`}>
              <div className="w-full flex gap-2 group cursor-pointer">
                <div className="w-1/4 h-full flex items-center justify-center">
                  <div className="h-full flex justify-center items-center">
                    <img
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${ele.apartment_name}&radius=50`}
                      className="w-[35px] h-[35px] object-cover rounded-full"
                      alt="avatar"
                    />
                  </div>
                </div>

                <div className="w-[65%] flex flex-col gap-[2px]">
                  <span className="truncate overflow-hidden text-ellipsis group-hover:underline">
                    {toTitleCase(ele.apartment_name)}
                  </span>
                  <span className="truncate overflow-hidden text-ellipsis">
                    {ele.ownername}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!sideDashstatus && (
        <div className="p-4 w-full text-sm border-style border-t-[0.8px] font-semibold">
          © FDFED 2024
        </div>
      )}
    </div>
  );
}

export default LeftSideDash;
