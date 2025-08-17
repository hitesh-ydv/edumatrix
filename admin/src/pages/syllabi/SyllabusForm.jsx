import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { syllabusApi } from '../../api';
import { 
  Box, Button, TextField, Typography, FormControlLabel, 
  Checkbox 
} from '@mui/material';

const SyllabusForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [syllabus, setSyllabus] = useState({
    title: '',
    description: '',
    semester: '',
    academicYear: '',
    fileSize: 0,
    isOfficial: false
  });

  useEffect(() => {
    if (id) {
      const fetchSyllabus = async () => {
        try {
          const response = await syllabusApi.getById(id);
          setSyllabus(response.data);
        } catch (error) {
          console.error('Error fetching syllabus:', error);
        }
      };
      fetchSyllabus();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSyllabus(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await syllabusApi.update(id, syllabus);
      } else {
        await syllabusApi.create(syllabus);
      }
      navigate('/syllabi');
    } catch (error) {
      console.error('Error saving syllabus:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Syllabus' : 'Create New Syllabus'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={syllabus.title}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={syllabus.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Semester"
        name="semester"
        value={syllabus.semester}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Academic Year"
        name="academicYear"
        value={syllabus.academicYear}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="File Size (bytes)"
        name="fileSize"
        type="number"
        value={syllabus.fileSize}
        onChange={handleChange}
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="isOfficial"
            checked={syllabus.isOfficial}
            onChange={handleChange}
          />
        }
        label="Is Official Syllabus"
      />
      
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/syllabi')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default SyllabusForm;