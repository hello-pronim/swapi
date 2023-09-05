import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import { fetchCharacter } from "../api";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCharacter, setEditedCharacter] = useState<any | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      const data = await fetchCharacter(Number(id));
      console.log(data);
      setCharacter(data);
      setEditedCharacter(data);
    };
    loadCharacter();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Update the character data locally
    if (editedCharacter) {
      setCharacter(editedCharacter);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setEditedCharacter(character);
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedCharacter({
      ...editedCharacter,
      [name]: value,
    });
  };

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h1>Character Details</h1>
          </Grid>
          <Grid item xs={12}>
            {character && (
              <Card>
                <CardHeader title={character.name}></CardHeader>
                <Divider />
                <CardContent>
                  {!isEditing ? (
                    <>
                      <p>Height: {character.height}</p>
                      <p>Mass: {character.mass}</p>
                      <p>Gender: {character.gender}</p>
                      <p>...other details...</p>
                    </>
                  ) : (
                    <Grid container alignItems="center" spacing={4}>
                      <Grid item xs={6}>
                        <TextField
                          label="Name"
                          name="name"
                          value={editedCharacter.name}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Height"
                          name="height"
                          value={editedCharacter.height}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Mass"
                          name="mass"
                          value={editedCharacter.mass}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Gender"
                          name="gender"
                          value={editedCharacter.gender}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  )}
                </CardContent>
                <Divider />
                <CardActions>
                  {!isEditing ? (
                    <Button variant="outlined" onClick={handleEditClick}>
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button variant="outlined" onClick={handleSaveClick}>
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CharacterDetail;
