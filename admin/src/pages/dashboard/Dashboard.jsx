import { Box, Grid, Paper, Typography } from '@mui/material';
import { 
  School as SchoolIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Map as MapIcon,
  LibraryBooks as LibraryBooksIcon,
  Star as StarIcon
} from '@mui/icons-material';
import StatCard from '../../components/StatCard';

const Dashboard = () => {
  // In a real app, you would fetch these counts from your API
  const stats = [
    { title: 'Exams', value: 24, icon: <SchoolIcon fontSize="large" />, color: 'primary' },
    { title: 'Internships', value: 15, icon: <WorkIcon fontSize="large" />, color: 'secondary' },
    { title: 'Notes', value: 87, icon: <DescriptionIcon fontSize="large" />, color: 'success' },
    { title: 'Roadmaps', value: 12, icon: <MapIcon fontSize="large" />, color: 'warning' },
    { title: 'Syllabi', value: 36, icon: <LibraryBooksIcon fontSize="large" />, color: 'info' },
    { title: 'Top Resources', value: 42, icon: <StarIcon fontSize="large" />, color: 'error' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard 
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Typography>
          Welcome to the admin panel. Use the navigation menu to manage different resources.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;