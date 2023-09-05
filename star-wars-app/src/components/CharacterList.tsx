import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import { fetchCharacters } from "../api";

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const data = await fetchCharacters(currentPage, searchTerm);
      setLoading(false);
      setCharacters(data.results);
    };
    loadCharacters();
  }, [currentPage, searchTerm]);

  const getCharacterIdFromUrl = (url: string) => {
    return url.split("people/")[1].split("/")[0];
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter((character: any) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h1>Star Wars Characters</h1>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="flex-end">
              <Grid item>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {!loading ? (
              filteredCharacters.map((character: any) => (
                <Card
                  key={character.url}
                  variant="outlined"
                  sx={{ margin: "8px" }}
                >
                  <CardContent>
                    <Link
                      to={`/character/${getCharacterIdFromUrl(character.url)}`}
                    >
                      {character.name}
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous Page
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!characters.length}
                >
                  Next Page
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CharacterList;
