import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { noteApi } from '../../api';
import { 
  Box, Button, TextField, Typography, FormControl, 
  InputLabel, Select, MenuItem 
} from '@mui/material';

const NoteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    subject: '',
    semester: '',
    fileType: 'PDF',
    fileSize: 0,
    description: '',
    thumbnail: '',
    fileUrl: ''
  });

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const response = await noteApi.getById(id);
          setNote(response.data);
        } catch (error) {
          console.error('Error fetching note:', error);
        navigate('/notes');
        }
      };
      fetchNote();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await noteApi.update(id, note);
      } else {
        await noteApi.create(note);
      }
      navigate('/notes');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Note' : 'Create New Note'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={note.title}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Subject"
        name="subject"
        value={note.subject}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Semester"
        name="semester"
        value={note.semester}
        onChange={handleChange}
        required
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>File Type</InputLabel>
        <Select
          name="fileType"
          value={note.fileType}
          label="File Type"
          onChange={handleChange}
        >
          <MenuItem value="PDF">PDF</MenuItem>
          <MenuItem value="DOC">DOC</MenuItem>
          <MenuItem value="PPT">PPT</MenuItem>
          <MenuItem value="TXT">TXT</MenuItem>
          <MenuItem value="OTHER">OTHER</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        margin="normal"
        label="File Size (bytes)"
        name="fileSize"
        type="number"
        value={note.fileSize}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={note.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Thumbnail URL"
        name="thumbnail"
        value={note.thumbnail}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="File URL"
        name="fileUrl"
        value={note.fileUrl}
        onChange={handleChange}
      />
      
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/notes')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default NoteForm;