import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { internshipApi } from '../../api';
import { 
  Box, Button, TextField, Typography, FormControl, 
  InputLabel, Select, MenuItem, Stack, Chip
} from '@mui/material';

const InternshipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState({
    position: '',
    company: '',
    companyLogo: '',
    location: '',
    duration: '',
    stipend: '',
    deadline: '',
    status: 'Open',
    skills: [],
    description: '',
    applicationTips: [],
    applicationUrl: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newTip, setNewTip] = useState('');

  useEffect(() => {
    if (id) {
      const fetchInternship = async () => {
        try {
          const response = await internshipApi.getById(id);
          setInternship(response.data);
        } catch (error) {
          console.error('Error fetching internship:', error);
        }
      };
      fetchInternship();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternship(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !internship.skills.includes(newSkill.trim())) {
      setInternship(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setInternship(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddTip = () => {
    if (newTip.trim()) {
      setInternship(prev => ({
        ...prev,
        applicationTips: [...prev.applicationTips, newTip.trim()]
      }));
      setNewTip('');
    }
  };

  const handleRemoveTip = (index) => {
    setInternship(prev => ({
      ...prev,
      applicationTips: prev.applicationTips.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await internshipApi.update(id, internship);
      } else {
        await internshipApi.create(internship);
      }
      navigate('/internships');
    } catch (error) {
      console.error('Error saving internship:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Internship' : 'Create New Internship'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Position"
        name="position"
        value={internship.position}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Company"
        name="company"
        value={internship.company}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Company Logo URL"
        name="companyLogo"
        value={internship.companyLogo}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Location"
        name="location"
        value={internship.location}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Duration"
        name="duration"
        value={internship.duration}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Stipend"
        name="stipend"
        value={internship.stipend}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Deadline"
        name="deadline"
        value={internship.deadline}
        onChange={handleChange}
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={internship.status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="Closing Soon">Closing Soon</MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Skills</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Add Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAddSkill}>
          Add
        </Button>
      </Stack>
      
      <Box sx={{ mb: 2 }}>
        {internship.skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleRemoveSkill(skill)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={internship.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Application Tips</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Add Application Tip"
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAddTip}>
          Add
        </Button>
      </Stack>
      
      <Box sx={{ mb: 2 }}>
        {internship.applicationTips.map((tip, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ flexGrow: 1 }}>{tip}</Typography>
            <Button size="small" color="error" onClick={() => handleRemoveTip(index)}>
              Remove
            </Button>
          </Box>
        ))}
      </Box>
      
      <TextField
        fullWidth
        margin="normal"
        label="Application URL"
        name="applicationUrl"
        value={internship.applicationUrl}
        onChange={handleChange}
      />
      
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/internships')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default InternshipForm;