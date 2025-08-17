import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { roadmapApi } from '../../api';
import { 
  Box, Button, TextField, Typography, FormControl, 
  InputLabel, Select, MenuItem, Stack, Chip
} from '@mui/material';

const RoadmapForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState({
    title: '',
    description: '',
    thumbnail: '',
    difficulty: 'Intermediate',
    duration: '',
    enrolled: '',
    rating: 0,
    progress: 0,
    tags: [],
    category: 'skill',
    semester: '',
    
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id) {
      const fetchRoadmap = async () => {
        try {
          const response = await roadmapApi.getById(id);
          setRoadmap(response.data);
        } catch (error) {
          console.error('Error fetching roadmap:', error);
        }
      };
      fetchRoadmap();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoadmap(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !roadmap.tags.includes(newTag.trim())) {
      setRoadmap(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setRoadmap(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await roadmapApi.update(id, roadmap);
      } else {
        await roadmapApi.create(roadmap);
      }
      navigate('/roadmaps');
    } catch (error) {
      console.error('Error saving roadmap:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Roadmap' : 'Create New Roadmap'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={roadmap.title}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={roadmap.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Thumbnail URL"
        name="thumbnail"
        value={roadmap.thumbnail}
        onChange={handleChange}
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Difficulty</InputLabel>
        <Select
          name="difficulty"
          value={roadmap.difficulty}
          label="Difficulty"
          onChange={handleChange}
          required
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        margin="normal"
        label="Duration"
        name="duration"
        value={roadmap.duration}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Enrolled"
        name="enrolled"
        value={roadmap.enrolled}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Rating"
        name="rating"
        type="number"
        inputProps={{ min: 0, max: 5, step: 0.1 }}
        value={roadmap.rating}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Progress"
        name="progress"
        type="number"
        inputProps={{ min: 0, max: 100 }}
        value={roadmap.progress}
        onChange={handleChange}
      />
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Tags</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Add Tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAddTag}>
          Add
        </Button>
      </Stack>
      
      <Box sx={{ mb: 2 }}>
        {roadmap.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={roadmap.category}
          label="Category"
          onChange={handleChange}
          required
        >
          <MenuItem value="skill">Skill</MenuItem>
          <MenuItem value="semester">Semester</MenuItem>
        </Select>
      </FormControl>
      
      {roadmap.category === 'semester' && (
        <TextField
          fullWidth
          margin="normal"
          label="Semester"
          name="semester"
          value={roadmap.semester}
          onChange={handleChange}
        />
      )}
      
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/roadmaps')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default RoadmapForm;