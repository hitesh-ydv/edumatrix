import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { topResourceApi } from '../../api';
import { 
  Box, Button, TextField, Typography, FormControlLabel, 
  Checkbox, Stack, Chip
} from '@mui/material';

const TopResourceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState({
    title: '',
    description: '',
    image: '',
    type: '',
    category: '',
    rating: 0,
    views: '',
    duration: '',
    tags: [],
    route: '',
    featured: false
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id) {
      const fetchResource = async () => {
        try {
          const response = await topResourceApi.getById(id);
          setResource(response.data);
        } catch (error) {
          console.error('Error fetching resource:', error);
        }
      };
      fetchResource();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResource(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !resource.tags.includes(newTag.trim())) {
      setResource(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setResource(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await topResourceApi.update(id, resource);
      } else {
        await topResourceApi.create(resource);
      }
      navigate('/top-resources');
    } catch (error) {
      console.error('Error saving resource:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Top Resource' : 'Create New Top Resource'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={resource.title}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={resource.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Image URL"
        name="image"
        value={resource.image}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Type"
        name="type"
        value={resource.type}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Category"
        name="category"
        value={resource.category}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Rating"
        name="rating"
        type="number"
        inputProps={{ min: 0, max: 5, step: 0.1 }}
        value={resource.rating}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Views"
        name="views"
        value={resource.views}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Duration"
        name="duration"
        value={resource.duration}
        onChange={handleChange}
        required
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
        {resource.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleRemoveTag(tag)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
      
      <TextField
        fullWidth
        margin="normal"
        label="Route"
        name="route"
        value={resource.route}
        onChange={handleChange}
        required
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="featured"
            checked={resource.featured}
            onChange={handleChange}
          />
        }
        label="Featured Resource"
      />
      
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/top-resources')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TopResourceForm;