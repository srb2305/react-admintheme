import {useState} from 'react';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function FeedbackAddForm() {
	// const [formData, setFormData] = useState({
	// 	title: '',
	// 	description: ''
	// });
	const [ title,setTitle ] = useState('');
	const [ description,setDescription ] = useState('');


	const [ alertCode,setAlertcode ] = useState('error');
	const [ alertMessage,setAlertMessage ] = useState('');

	const handleChange = (e) => {
		console.log(e.target.name);
		const {name, value} = e.target;
		if(name == 'title') {
			setTitle(value);
		}
		if(name == 'description') {
			setDescription(value);
		} 
		//setFormData({...formData, [name] : value });
	}

	const formSubmit =  async (e) => {
		console.log(e);
		e.preventDefault();
		try{
			const responce = await fetch('http://127.0.0.1:8000/api/feedback_add_testing',{
				method: 'POST',
				headers: {
					'Content-Type':'application/json',
				},
				body: JSON.stringify({
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
				setAlertMessage('Submitted Successfully');
				setDescription('');
				setTitle('');
			}
		} catch (error) {
			console.log('Error adding data:', error);
		}	
	}

	return(
		<>
			<h1>Feedback Add </h1>
			
			{alertMessage ? 
			<Alert severity={alertCode}>
		       {alertMessage}
		    </Alert>
		    : '' }

			<form onSubmit={formSubmit}>
				<Stack spacing={3} padding={2}>
		        	<TextField name="title" label="Title" defaultValue={title} onChange={handleChange}/> {title}
		        	<TextField name="description" label="Description" defaultValue={description} onChange={handleChange}/> {description}
		        </Stack>	
		         <Stack spacing={2} padding={2} direction="row" >
		        	<Button type="submit" variant="contained" >Save</Button>
	      			<Button variant="outlined">Cancel</Button>
	      		</Stack>
	        </form>
	      
		</>
	);
}