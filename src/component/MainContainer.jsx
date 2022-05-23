import React from 'react'
import './MainContainer.css'
import CalendIcon from "@mui/icons-material/CalendarMonthRounded"
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {useState,useMemo,useEffect} from 'react'
import Select from 'react-select';
import countryList from 'react-select-country-list';
import axios from 'axios'
import {useDispatch,useSelector} from "react-redux"
import { setApiData } from '../redux/actions'

const locales = {
  'en-US':enUS ,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

function MainContainer() {

    const [value,setValue]=useState('')
    const option = useMemo(() => countryList().getData(), [])
    const dispatch=useDispatch();
    const selecData=useSelector(state=>state.data.state) 
    
    useEffect(()=>{
        if(value){   
          const fetchApi= async ()=>{ 
            await axios.get(`https://calendarific.com/api/v2/holidays?api_key=66097fbc7610f063e30690e684b3f67ebcc53629&country=${value}&year=2022`)
            .then(res=>{
            dispatch(setApiData(res.data.response.holidays))

            }).catch(err=>{
              console.log(err)
            })
          }
           fetchApi()
        }     
    },[value])
         
    return (
          <div className='calendar'>
              <div className='main'>
                  <div className='icon'><CalendIcon style={{fontSize: '40px'}}></CalendIcon><h1>Calendar</h1></div>
                <div className='selec'>
                  <h3>Select Country</h3>
                  <div className='selec2'><Select options={option}  value={value} onChange={(e)=>setValue(e.value)}/></div>
                </div>
              </div>
            <div className="cal">
              <Calendar
              localizer={localizer}
              events={ selecData && selecData.map(dat=>({
                title : dat.name,
                allday : true,
                start : new Date(dat.date.datetime.year,dat.date.datetime.month,dat.date.datetime.day),
                end : new Date(dat.date.datetime.year,dat.date.datetime.month,dat.date.datetime.day)
                }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin:"50px" }}
              /> 
            </div>
          </div>
          );

}
export default MainContainer;