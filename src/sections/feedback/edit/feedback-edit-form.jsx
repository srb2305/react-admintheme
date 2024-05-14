import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function FeedbackEditForm() {
	const { id } = useParams();
	const [ title,setTitle ] = useState('');
	const [ description,setDescription ] = useState('');
	const [ alertCode,setAlertcode ] = useState('error');
	const [ alertMessage,setAlertMessage ] = useState('');

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/feedback_get_byid/${id}`).then((responce) => {
			return responce.json()
		}).then((parseResponce) => {
			setTitle(parseResponce.data.title);
			setDescription(parseResponce.data.description);
		});
	},[]);


	const handleChange = (e) => {
		console.log(e.target.name);
		const {name, value} = e.target;
		if(name == 'title') {
			setTitle(value);
		}
		if(name == 'description') {
			setDescription(value);
		}
	}

	const formSubmit =  async (e) => {
		console.log(e);
		e.preventDefault();
		try{
			const responce = await fetch('http://127.0.0.1:8000/api/feedback_update',{
				method: 'POST',
				headers: {
					'Content-Type':'application/json',
				},
				body: JSON.stringify({
					id: id,
					title: title,
					description: description
				})
			});
			if (!responce.status) {
				setAlertcode('error');
				setAlertMessage('Something went wrong');
				throw new Error('Responce was not ok');
			} else {
				setAlertcode('success');
				setAlertMessage('Updated Successfully');
			}
		} catch (error) {
			console.log('Error adding data:', error);
		}	
	}

	return(
		<>
			<h1>Feedback Edit </h1>
			
			{alertMessage ? 
			<Alert severity={alertCode}>
		       {alertMessage}
		    </Alert>
		    : '' }

			<form onSubmit={formSubmit}>
				<Stack spacing={3} padding={2}>
		        	<TextField name="title" label="Title" value={title} onChange={handleChange}/>
		        	<TextField name="description" label="Description" value={description} onChange={handleChange}/>
		        </Stack>	
		         <Stack spacing={2} padding={2} direction="row" >
		        	<Button type="submit" variant="contained" >Update</Button>
	      			<Button variant="outlined">Cancel</Button>
	      		</Stack>
	        </form>
	      
		</>
	);
}