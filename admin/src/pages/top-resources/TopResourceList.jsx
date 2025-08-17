import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { topResourceApi } from '../../api';
import { 
  Box, Button, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Typography 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const TopResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await topResourceApi.getAll();
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching top resources:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await topResourceApi.delete(id);
        setResources(resources.filter(resource => resource._id !== id));
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Top Resources</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => navigate('/top-resources/new')}
        >
          Add Resource
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource._id}>
                <TableCell>{resource.title}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.category}</TableCell>
                <TableCell>{resource.rating}</TableCell>
                <TableCell>{resource.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/top-resources/${resource._id}/edit`)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(resource._id)}>
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

export default TopResourceList;