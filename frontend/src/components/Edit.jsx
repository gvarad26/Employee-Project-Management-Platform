
 import {React,useEffect,useState} from 'react'
 import {Box,Button,Typography} from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineField from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate,useParams} from 'react-router-dom'
import MyMultiSelectField from './forms/MyMultiSelectField'


 const Edit = () => {
  const MyParam =useParams()
  const MyId =MyParam.id 

      const[projectmanager,setProjectmanager]=useState()
      const[loading,setLoading]=useState(true)
      const[employees,setEmployees]=useState()
      const hardcoded_options =[
        {id:'',name:'None'},
        {id:'Open',name:'Open'},
        {id:'In progress',name:'In progress'},
        {id:'Completed',name:'Completed'}
      ]

   const GetData =()=>
    {


      AxiosInstance.get(`projectmanager/`).then((res)=>{
        setProjectmanager(res.data)
        console.log(res.data)
        // setLoading(false)
        })
      AxiosInstance.get(`employees/`).then((res)=>{
      setEmployees(res.data)
      console.log(res.data)
       })
      
      AxiosInstance.get(`project/${MyId}`).then((res)=>{
        console.log(res.data)
      setValue('name',res.data.name)
      setValue('status',res.data.status)
      setValue('projectmanager',res.data.projectmanager)
      setValue('employees',res.data.employees)
      setValue('comments',res.data.comments)
      setValue('start_date',Dayjs(res.data.start_date))
      setValue('end_date',Dayjs(res.data.end_date))
      setLoading(false)
       })
    }
    useEffect(()=>{
      GetData();
    },[])


  const navigate=useNavigate();
  const defaultValues={
    name:'',
    comments:'',
    status:'',
    start_date:null,
    end_date:null
  }
  const {handleSubmit,setValue,control}=useForm({defaultValues})
  const submission=(data)=>
  {
  if (!data.status) {
    alert("Please select a Status before submitting.")
    return
  }

  if (!data.start_date || !data.end_date) {
    alert("Please select Start Date and End Date.")
    return
  }
    const StartDate =Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate =Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.put(
      `project/${MyId}/`,{
        name:data.name,
        projectmanager:data.projectmanager,
        status:data.status,
        employees:data.employees,
        comments:data.comments,
        start_date: StartDate,
        end_date: EndDate,

      }
    )
    .then((res)=>{
      navigate(`/`)
    })
  }
   return (
    <div>
       { loading ? <p> Loading data...</p> :
      <form onSubmit={handleSubmit(submission)}>

     
      <Box sx={{display:'flex',width:'100%',backgroundColor:'#00003f',marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px',color:'#fff'}}>
          Create Records
        </Typography>

      </Box>

      <Box sx={{display:'flex',width:'100%',boxShadow:3,padding:4,flexDirection:'column'}}>

        <Box sx={{display:'flex',justifyContent:'space-around',marginBottom:'40px'}}> 
          <MyTextField
            label="Name"
            name="name"
            control={control}
            placeholder="Provide a project name"
            width={"30%"}
            />  
            <MyDatePickerField
          
          label="Start_date"
            name="start_date"
            control={control}
            width={"30%"}
          
          />
          <MyDatePickerField
          
          label="End_date"
            name="end_date"
            control={control}
            width={"30%"}
          
          />

        </Box>

        <Box sx={{display:'flex',justifyContent:'space-around'}}> 
          <MyMultilineField
            label="Comments"
            name="comments"
            control={control}
            placeholder="Provide project comments"
            width={"22%"}
            />  


          <MySelectField
          
            label="Status"
            name="status"
            control={control}
            width={"22%"}
            options={hardcoded_options}
          
          />
          <MySelectField
          
            label="Project Manager"
            name="projectmanager"
            control={control}
            width={"22%"}
            options={projectmanager}
          
          />

             <MyMultiSelectField
                      label="Employees"
                      name="employees"
                      control={control}
                      width={"22%"}
                      options={employees}        
              />
          
          </Box>

        <Box sx={{display:'flex',justifyContent:'space-around', marginTop:'40px'}}> 
          <Button variant='contained' type='submit' sx={{width:'20%'}}>
          Submit
        </Button>

        </Box>

      </Box>
      
      </form> }
    </div>
   )
 }
 
 export default Edit