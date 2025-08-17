import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roadmapApi } from '../../api';
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Typography 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await roadmapApi.getAll();
        setRoadmaps(response.data);
      } catch (error) {
        console.error('Error fetching roadmaps:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      try {
        await roadmapApi.delete(id);
        setRoadmaps(roadmaps.filter(roadmap => roadmap._id !== id));
      } catch (error) {
        console.error('Error deleting roadmap:', error);
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Roadmaps</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => navigate('/roadmaps/new')}
        >
          Add Roadmap
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Enrolled</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roadmaps.map((roadmap) => (
              <TableRow key={roadmap._id}>
                <TableCell>{roadmap.title}</TableCell>
                <TableCell>{roadmap.category}</TableCell>
                <TableCell>{roadmap.difficulty}</TableCell>
                <TableCell>{roadmap.duration}</TableCell>
                <TableCell>{roadmap.enrolled}</TableCell>
                <TableCell>{roadmap.rating}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/roadmaps/${roadmap._id}/edit`)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(roadmap._id)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RoadmapList;