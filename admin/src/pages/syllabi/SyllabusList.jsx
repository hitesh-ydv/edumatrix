import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { syllabusApi } from '../../api';
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Typography 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const SyllabusList = () => {
  const [syllabi, setSyllabi] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSyllabi = async () => {
      try {
        const response = await syllabusApi.getAll();
        setSyllabi(response.data);
      } catch (error) {
        console.error('Error fetching syllabi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabi();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this syllabus?')) {
      try {
        await syllabusApi.delete(id);
        setSyllabi(syllabi.filter(syllabus => syllabus._id !== id));
      } catch (error) {
        console.error('Error deleting syllabus:', error);
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Syllabi</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => navigate('/syllabi/new')}
        >
          Add Syllabus
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Academic Year</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Official</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syllabi.map((syllabus) => (
              <TableRow key={syllabus._id}>
                <TableCell>{syllabus.title}</TableCell>
                <TableCell>{syllabus.semester}</TableCell>
                <TableCell>{syllabus.academicYear}</TableCell>
                <TableCell>{new Date(syllabus.lastUpdated).toLocaleDateString()}</TableCell>
                <TableCell>{syllabus.isOfficial ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/syllabi/${syllabus._id}/edit`)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(syllabus._id)}>
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

export default SyllabusList;