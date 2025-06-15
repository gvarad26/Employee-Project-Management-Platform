
 import {React,useEffect,useState} from 'react'
 import {Box,Button,Typography} from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineField from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import {useForm} from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import MyMultiSelectField from './forms/MyMultiSelectField'

 const Create = () => {

    const[projectmanager,setProjectmanager]=useState([])
    const[employees,setEmployees]=useState([])
    const[loading,setLoading]=useState(true)
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
    });

      AxiosInstance.get(`employees/`).then((res)=>{
      setEmployees(res.data)
      console.log(res.data)
      setLoading(false)
    })
    }
    useEffect(()=>{
      GetData();
    },[])
    // console.log('Hi varad')

  const navigate=useNavigate();
  const defaultValues={
    name:'',
    comments:'',
    status:'',
    start_date:null,
    end_date:null,
    employees:[]
  }

  const schema =yup
  .object({name: yup.string().required('Name is a required field'),
          projectmanager: yup.string().required('Project Manager is a required field'),
           status: yup.string().required('Status is a required field'),
           comments: yup.string(),
           employees:yup.array().min(1,'Pick atleast one option from the select field'),
           start_date: yup.date().required('Start Date is a required field'),
           end_date:yup.date().required('End Date is a required field').min(yup.ref('start_date'),'The end date cannot be before the start date'),
          })
  const {handleSubmit,control}=useForm({defaultValues, resolver: yupResolver(schema)})
  const submission=(data)=>
  {
  // if (!data.status) {
  //   alert("Please select a Status before submitting.")
  //   return
  // }

  // if (!data.start_date || !data.end_date) {
  //   alert("Please select Start Date and End Date.")
  //   return
  // }
    const StartDate =Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate =Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.post(
      `project/`,{
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
        <Box>
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
            label="Project manager"
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
        
        
          <Box sx={{display:'flex',justifyContent:'center',marginTop:'40px'}}> 
                <Button variant='contained' type='submit' sx={{width:'20%'}}>
                Submit
                </Button>
          </Box>
      </Box>
      </Box>


     </form>
    }
    </div>
   )
 }
 
 export default Create