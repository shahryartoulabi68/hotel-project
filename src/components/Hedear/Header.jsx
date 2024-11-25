import { MdLocationOn } from "react-icons/md"
import { HiCalendar, HiLogout, HiMinus, HiPlus, HiSearch } from "react-icons/hi"
import { useRef, useState } from "react"
import useOutsidClick from "../../Hooks/useOutsidClick"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { createSearchParams, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

function Header() {
  const [destination, setDestination] = useState("")
  const [openOption, setOpenOption] = useState(false)
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })
  const [date, setDate] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }])
  const navigate = useNavigate()
  const [openDate, setOpenDate] = useState(false)
  const handlOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "dec" ? options[name] + 1 : options[name] - 1
      };
    })
  }
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination
    })
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString()
    })
  }
  const refDate = useRef()
  useOutsidClick(refDate, "dateDropDown", () => setOpenDate(!openDate))
  return (
    <div className='header'>
      <NavLink to={"/bookmarks"}>bookmark</NavLink >
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input type="text"
            placeholder="where to go ?"
            className="headerSearchInput"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" id="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
          </div>
          {openDate && <DateRange
            ref={refDate}
            ranges={date}
            className="date"
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
          />}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOption(!openOption)}>

            {options.adult} adult &bull;
            {options.children} children &bull;
            {options.room} room
          </div>
          {openOption && <GuestOptionList options={options}
            handlOptions={handlOptions}
            setOpenOption={setOpenOption}
          />}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  )
}

export default Header
function User() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const handleLogout = () => {
    logout()
    navigate("/")
  }
  return <div>
    {isAuthenticated ? (
      <div>
        <span>{user.name}</span>
        <button onClick={handleLogout}><HiLogout className="icon" /></button>
      </div>
    ) : (
      <NavLink to={"/login"}>LOGIN</NavLink >
    )}
  </div>
}

function GuestOptionList({ options, handlOptions, setOpenOption }) {
  const optionRef = useRef()
  useOutsidClick(optionRef, "optionDropDown", () => setOpenOption(false))
  return <div className="guestOptions" ref={optionRef}>
    <GuestOptionItem handlOptions={handlOptions} type="adult" options={options} minLimit={1} />
    <GuestOptionItem handlOptions={handlOptions} type="children" options={options} minLimit={0} />
    <GuestOptionItem handlOptions={handlOptions} type="room" options={options} minLimit={1} />
  </div>
}

function GuestOptionItem({ type, options, minLimit, handlOptions }) {
  return <div className="guestOptionItem">
    <span className="optionText">{type}</span>
    <div className="optionCounter">
      <button
        className="optionCounterBtn"
        disabled={options[type] <= minLimit}
        onClick={() => handlOptions(type, "inc")}
      >
        <HiMinus />
      </button>
      <span className="optionCounterNumber">{options[type]}</span>
      <button className="optionCounterBtn" onClick={() => handlOptions(type, "dec")} >
        <HiPlus />
      </button>
    </div>
  </div>

}