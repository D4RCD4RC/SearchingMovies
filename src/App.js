import styled from 'styled-components';
import MovieComponent from './Component/MovieComponent';
import { useState } from 'react';
import axios from 'axios';
import MovieInfoComponent from './Component/MovieInfoComponent';

export const API_KEY = 'a9118a3a';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  justify-content space-between;
  align-items: center;
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [timeoutId, setTimeoutId] = useState();
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    setMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    setSearchQuery(event.target.value);
    const timeOut = setTimeout(() => fetchData(event.target.value), 500);
    setTimeoutId(timeOut);
  };

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src='/1.png' />
          DARC Movies APP
        </AppName>
        <SearchBox>
          <SearchIcon src='/2.svg' />
          <SearchInput
            placeholder='Search Movie'
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && (
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              setSelectedMovie={setSelectedMovie}
            />
          ))
        ) : (
          <Placeholder src='/1.png' />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;
