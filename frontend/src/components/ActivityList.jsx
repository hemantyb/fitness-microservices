import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivity = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        {activities.map((activities) => (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/activities/${activity.id}")}
            >
              <CardContent>
                <Typography variant="h6">{activities.type}</Typography>
                <Typography>Duration: {activities.duration}</Typography>
                <Typography>Calories: {activities.caloriesBurned}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ActivityList;
