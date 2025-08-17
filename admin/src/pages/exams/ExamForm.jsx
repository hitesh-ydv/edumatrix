import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { examApi } from '../../api';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormControlLabel,
  Stack
} from '@mui/material';

const ExamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState({
    name: '',
    examType: '',
    difficulty: 'Medium',
    description: '',
    duration: '',
    fee: '',
    nextExamDate: '',
    isPopular: false,
    preparationTips: [],
    syllabusUrl: ''
  });
  const [newTip, setNewTip] = useState('');

  useEffect(() => {
    if (id) {
      const fetchExam = async () => {
        try {
          const response = await examApi.getById(id);
          setExam(response.data);
        } catch (error) {
          console.error('Error fetching exam:', error);
        }
      };
      fetchExam();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExam(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTip = () => {
    if (newTip.trim()) {
      setExam(prev => ({
        ...prev,
        preparationTips: [...prev.preparationTips, newTip.trim()]
      }));
      setNewTip('');
    }
  };

  const handleRemoveTip = (index) => {
    setExam(prev => ({
      ...prev,
      preparationTips: prev.preparationTips.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await examApi.update(id, exam);
      } else {
        await examApi.create(exam);
      }
      navigate('/exams');
    } catch (error) {
      console.error('Error saving exam:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Exam' : 'Create New Exam'}
      </Typography>
      
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={exam.name}
        onChange={handleChange}
        required
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Exam Type</InputLabel>
        <Select
          name="examType"
          value={exam.examType}
          label="ExamType"
          onChange={handleChange}
        >
          <MenuItem value="Competitive">Competitive</MenuItem>
          <MenuItem value="Certification">Certification</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Difficulty</InputLabel>
        <Select
          name="difficulty"
          value={exam.difficulty}
          label="Difficulty"
          onChange={handleChange}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={exam.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Duration"
        name="duration"
        value={exam.duration}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Fee"
        name="fee"
        value={exam.fee}
        onChange={handleChange}
      />
      
      <TextField
        fullWidth
        margin="normal"
        label="Next Exam Date"
        name="nextExamDate"
        value={exam.nextExamDate}
        onChange={handleChange}
      />
      
      <FormControlLabel
        control={
          <Checkbox
            name="isPopular"
            checked={exam.isPopular}
            onChange={handleChange}
          />
        }
        label="Is Popular"
      />
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Preparation Tips</Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Add Preparation Tip"
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAddTip}>
          Add
        </Button>
      </Stack>
      
      <Box sx={{ mb: 2 }}>
        {exam.preparationTips.map((tip, index) => (
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
        label="Syllabus URL"
        name="syllabusUrl"
        value={exam.syllabusUrl}
        onChange={handleChange}
      />
      
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate('/exams')}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ExamForm;